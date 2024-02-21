import Image from "next/image"

interface ProfileHeaderProps {
    accountId : string,
    authUserId : string,
    name : string,
    username : string,
    imageUrl : string,
    bio : string,
}

const ProfileHeader = ({
    accountId,
    authUserId,
    name,
    username,
    imageUrl,
    bio} : ProfileHeaderProps) => {
  return (
    <div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-5">
            <Image src={imageUrl} alt="profile_image" width={60} height={60} className="rounded-full" />
            <div>
              <h4 className="text-heading3-bold text-light-1">{name}</h4>
              <p className="text-gray-1">@{username} </p>
            </div>
          </div>
          <p className="text-light-2">{bio}</p>
        </div>
    </div>
  )
}

export default ProfileHeader