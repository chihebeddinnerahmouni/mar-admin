import React from "react"

interface ProfilePicProps {
  profilePic: string,
}

const ProfilePic: React.FC<ProfilePicProps> = ({ profilePic }) => {
  

  const url = import.meta.env.VITE_SERVER_URL_USERS

  return (
    <div className="w-full flex flex-col justify-center items-center">

        <img
          src={profilePic ? `${url}/${profilePic}` : "/anonyme.jpg"}
          className="w-[160px] h-[160px] object-cover object-center rounded-50"
          alt="profile picture"
        />
       
    </div>
  );
}

export default ProfilePic
