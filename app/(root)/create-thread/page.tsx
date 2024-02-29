import PostThread from '@/components/forms/PostThread';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';

const page = async() => {
    // const user = await currentUser();
    // if (!user) return null; // to avoid typescript warnings

    // const userInfo = await fetchUser(user.id);

  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start md:p-10  p-5'>
       <h1 className='head-text'>Create Thread</h1>
      <p className='mt-3 text-base-regular text-light-2'>
        Create a new thred.
      </p>
      {/* <PostThread userId={userInfo._id.toString()} />  */}
    </main>
  )
}

export default page