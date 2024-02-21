"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import path from "path";
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";

interface Props {
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string,
}

export async function updateUser ({
    userId,
    username,
    name,
    bio,
    image,
    path,
} : Props
) : Promise<void> {
    connectToDB();

    try {
        await User.findOneAndUpdate(
            {id: userId},
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            { upsert: true }
        );
    
        if(path === '/profile/edit'){
            revalidatePath(path);
        }
    } catch (error : any) {
        console.log(`fail to create/update the user: ${error.message}`)
    }

}

export async function fetchUser (userId : string){
    connectToDB();

    try {
        return await User.findOne({id: userId});
    } catch (error: any) {
        console.log(`error fetching user data: ${error.message}`)
    }
}

export async function fetchAllUsers ({
    userId, 
    searchString = "", 
    pageNumber = 1, 
    pageSize = 20, 
    sortBy = "desc"
} : {
    userId : string,
    searchString? : string,
    pageNumber? : number,
    pageSize? : number,
    sortBy? : SortOrder,
}) {
    connectToDB();
    try {
        //calculate skip amount
        const skipAmount = (pageNumber - 1) * pageSize;

        const regex = new RegExp(searchString, "i");

        const query : FilterQuery<typeof User> = {
            id: {$ne: userId},
        }

        if(searchString.trim() !== " "){
            query.$or = [
                {username : { $regex : regex }},
                {name : { $regex : regex }}
            ]
        }

        const sortOptions = { createdAt : sortBy}

        const userQuery = User.find(query)
        .sort(sortOptions)
        .skip(skipAmount)
        .limit(pageSize);

        const totalUserCount = await User.countDocuments(query);

        const users = await userQuery.exec();

        const isNext = totalUserCount > users.length + skipAmount ;

        return { users, isNext };

    } catch (error: any) {
        throw new Error(`failed to fetch users ${error.message}`)
    }
}

export async function fetchUserPost (userId : string) {
    connectToDB();

    try {
        const threads = await User.findOne({id: userId})
        .populate ({
            path: "threads",
            model: Thread,
            populate: {
                path: "children",
                model: Thread,
                populate: {
                    path: "author",
                    model: User,
                    select: "name image id",
                }
            }
        })
        .exec();

        return threads;

    } catch (error: any) {
        console.log(`error fetching user's thread data: ${error.message}`)
    }
}

export async function getActivity (userId : string){
    connectToDB();
    try {
        const userThreads = await Thread.find({author: userId});

        const threadChildrenIds = userThreads.reduce((acc, userThread) => {
            return acc.concat(userThread.children);
        },[]);

        const replies = await Thread.find({
            _id: {$in: threadChildrenIds},
            author: {$ne: userId}
        }).populate({
            path: 'author',
            model: User,
            select: "name image _id"
        })

        return replies;

    } catch (error:any) {
        throw new Error(`failed to fetch user activity ${error.message}`)
    }
}