import UserCard from "@/components/cards/UserCard";
import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const activities = await getActivity(userInfo._id);

  //console.log(userInfo._id)

  return (
    <section>
      <h3 className="head-text mb-10">Activity</h3>
      
      <section className="mt-10 flex flex-col gap-6">
        {activities.length > 0 ? (
          <>
            {activities.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`} >
                <article className="activity-card">
                  <Image
                  src={activity.author.image}
                  alt="profile image"
                  height={20}
                  width={20}
                  className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {activity.author.name}
                    </span>{" "}
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>) : <p className="!text-base-regular text-light-3">No activity yet</p>
        }
      </section>
    </section>
  )
}

export default page