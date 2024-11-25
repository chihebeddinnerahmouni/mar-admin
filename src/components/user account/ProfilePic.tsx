import { useTranslation } from "react-i18next"
import React from "react"
import axios from "axios"
import Swal from "sweetalert2"

interface ProfilePicProps {
  profilePic: string,
  setProfilePic: React.Dispatch<React.SetStateAction<string>>
}

const ProfilePic: React.FC<ProfilePicProps> = ({ profilePic, setProfilePic }) => {
  

  const { t } = useTranslation()
  const url = import.meta.env.VITE_SERVER_URL_USERS

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append("avatar", file)
    // console.log(formData)
    axios
      .put(`${url}/api/user/upload-avatar`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setProfilePic(res.data.user.profilePicture)
        Swal.fire({
          icon: "success",
          title: t(res.data.message),
          showConfirmButton: false,
          timer: 3000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // console.log(profilePic)

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <label
        htmlFor="profile-pic-upload"
        className="cursor-pointer flex flex-col items-center"
      >
        <img
          src={profilePic ? `${url}/${profilePic}` : "/anonyme.jpg"}
          className="w-[160px] h-[160px] object-cover object-center rounded-50"
          alt="profile picture"
        />
        <p className="text-main font-medium mt-4">
          {t("change_profile_picture")}
        </p>
      </label>
      <input
        id="profile-pic-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
  );
}

export default ProfilePic
