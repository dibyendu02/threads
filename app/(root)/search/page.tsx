import UserCard from "@/components/cards/UserCard";
import { fetchAllUsers, fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const page = async () => {
  // const user = await currentUser();
  // if (!user) return null;

  // const userInfo = await fetchUser(user.id);
  // if (!userInfo?.onboarded) redirect("/onboarding");

  // const results = await fetchAllUsers({
  //   userId: user.id,
  //   searchString: "",
  //   pageNumber: 1,
  //   pageSize: 20
  // });

  //console.log(results.users);

  return (
    <section>
      <h3 className="head-text mb-10">Search</h3>

      {/* implement search bar */}


      {/* <div className="flex flex-col gap-6">
        {results.users.map((result) => (
            <UserCard
              name={result.name}
              username={result.username}
              image={result.image}
              bio={result.bio}
              id={result.id}
              accountType="User"
            />
        ))}
      </div> */}
      
    </section>
  );
};

export default page;
