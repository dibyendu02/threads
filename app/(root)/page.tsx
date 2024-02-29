import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const result = await fetchPosts(1, 10);

  //console.log(result.posts);
  const user = await currentUser();

  // Set a timeout for the currentUser function
  // const userPromise = new Promise((resolve, reject) => {
  //   const timeout = setTimeout(() => {
  //     reject(new Error('Timeout while fetching current user'));
  //   }, 5000); // Adjust the timeout duration as needed (in milliseconds)

  //   currentUser().then(user => {
  //     clearTimeout(timeout);
  //     resolve(user);
  //   }).catch(err => {
  //     clearTimeout(timeout);
  //     reject(err);
  //   });
  // });

  // const user = await userPromise;

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-10 flex flex-col gap-10">
        

        {result.posts.length === 0 ? (
          <div>
            <h2>No posts found</h2>
          </div>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id || " "}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                areatedAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
