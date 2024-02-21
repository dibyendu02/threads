import { fetchUserPost } from "@/lib/actions/user.actions"
import ThreadCard from "../cards/ThreadCard";
import { redirect } from "next/navigation";

interface Props {
    currentUserId: string,
    accountId: string,
    accountType: string,
}
const ThreadsTab = async({currentUserId, accountId, accountType}: Props) => {
    const result = await fetchUserPost(accountId);

    //console.log(result)

    if(!result) redirect("/");
  return (
    <div className="mt-10 flex flex-col gap-10">
        
        {result.threads.map((thread: any) => (
            <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={currentUserId || " "}
            parentId={thread.parentId}
            content={thread.text}
            author={
                accountType === "User" ?
                {name: result.name, image: result.image, id: result.id} :
                {name: thread.author.name, image: thread.author.image, id: thread.author.id}

            }
            community={thread.community}
            areatedAt={thread.createdAt}
            comments={thread.children}
          />
        ))}
    </div>
  )
}

export default ThreadsTab