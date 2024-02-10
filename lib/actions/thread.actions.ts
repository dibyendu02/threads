"use server"

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Props {
    text: string,
    author: string,
    communityId: string,
    path: string,
}

export async function createThread (
    {
        text, author, communityId, path
    } : Props
){
    connectToDB();

    try {
        const createdThread = await Thread.create({
            text,
            author,
            community: null, // Assign communityId if provided, or leave it null for personal account
          });

        await User.findByIdAndUpdate(author, {
            $push: {threads: createdThread._id}
        })

        revalidatePath(path);

    } catch (error: any) {
        throw new Error(`error fetching user data: ${error.message}`);
    }
}

export async function fetchPosts ( pageNumber: number, PerPagePost: number){
    connectToDB();

    //calculate skip amount
    const skipAmount = (pageNumber - 1) * PerPagePost;

    //fetch posts that have no parents
    const postQuery = Thread.find({ parentId: { $in: [null, undefined]}})
    .sort({createdAt: 'desc'})
    .skip(skipAmount)
    .limit(PerPagePost)
    .populate({ path: 'author', model: User})
    .populate({ path: 'children', 
        populate: {
            path: 'author',
            model: User,
            select: "_id name parentId image"
        }

    })

    const totalPostCount = await Thread.countDocuments({parentId: { $in: [null, undefined]}})

    const posts = await postQuery.exec();

    const isNext = totalPostCount > posts.length + skipAmount ;

    return { posts, isNext };

}

export async function fetchThread (id : string) {
    connectToDB();
    try {
        //populate by community
        const thread = await Thread.findById(id)
        .populate({
            path: 'author',
            model: User,
            select: "_id id image name"
        })
        .populate({
            path: "children", // Populate the children field
            populate: [
              {
                path: "author", // Populate the author field within children
                model: User,
                select: "_id id name parentId image", // Select only _id and username fields of the author
              },
              {
                path: "children", // Populate the children field within children
                model: Thread, // The model of the nested children (assuming it's the same "Thread" model)
                populate: {
                  path: "author", // Populate the author field within nested children
                  model: User,
                  select: "_id id name parentId image", // Select only _id and username fields of the author
                },
              },
            ],
        })
        .exec();        

        return thread;
    } catch (error: any) {
        console.error("Error while fetching thread:", error);
        throw new Error(`failed to fetch thread: ${error.message}`)
    }
}

export async function addCommentToThread(
    userId: string,
    threadId: string,
    commentText: string,
    pathname: string
){
    connectToDB();

    try {
        const originalThread = await fetchThread(threadId);

        //create new thread
        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId,
        });

        //save new thread
        const savedCommentThread = await commentThread.save();

        //update original
        originalThread.children.push(savedCommentThread._id);

        //save it
        await originalThread.save();

        revalidatePath(pathname);
    } catch (error: any) {
        throw new Error(`failed to add comment: ${error.message}`)
    }

    

}