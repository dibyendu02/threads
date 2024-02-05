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