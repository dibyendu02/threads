"use client"
import Image from "next/image"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation";

interface Props {
    name: string,
    username: string,
    image: string,
    bio: string,
    id: string,
    accountType: string,
}

const UserCard = ({name, username, image, bio, id, accountType}: Props) => {
  const router = useRouter();
  return (
    <div className="user-card">
      <div className="user-card_avatar">
        <Image src={image} alt="profile_img" width={48} height={48} className="rounded-full" />
        <div className="flex-1 text-ellipsis">
            <h3 className="text-base-semibold text-light-1">{name}</h3>
            <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div> 
      <div>
        <Button className="user-card_btn" onClick={() => {router.push(`/profile/${id}`)}}>
          View
        </Button>
      </div>    
    </div>
  )
}

export default UserCard