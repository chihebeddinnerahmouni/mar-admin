import ReactModal from 'react-modal';
import React from 'react';
import axios from 'axios';
import LoadingButton from '../ui/LoadingButton';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';



interface DeleteModalProps {
    setClose: (isOpen: number) => void;
    user: any;
}
ReactModal.setAppElement("#root"); 
    

const DeleteModal: React.FC<DeleteModalProps> = ({ setClose, user }) => {
    

    // console.log(user);
  const url = import.meta.env.VITE_SERVER_URL_USERS;
  const [loading, setLoading] = React.useState(false);
  const { t } = useTranslation();

  // console.log(user);

  const block = async (e: any) => {
    e.stopPropagation();
    setLoading(true);
    // axios.delete(url  + "/admin/user/users?block=true&suspend=false")
    axios
      .post(url + `/admin/user/block/${user.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        }
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: t("greate"),
          showConfirmButton: false,
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.message === "Network Error") {
          Swal.fire({
            icon: "error",
            title: t("network_error"),
            text: t("please_try_again"),
            customClass: {
              confirmButton: "custom-confirm-button",
            },
          }).then(() => {
            window.location.reload();
          });
        }
      });

   }


    return (
      <ReactModal
        isOpen={true}
        onRequestClose={() => setClose(0)}
        className={" bg-white rounded-lg p-4 shadow-hardShadow lg:p-6"}
        overlayClassName={
          "fixed bg-black bg-opacity-10 backdrop-blur-[7px] inset-0 flex items-center justify-center"
        }
      >
        <img
          src={user.profilePicture ? url + "/" + user.profilePicture : "/anonyme.jpg"}
          className="w-20 h-20 rounded-full mx-auto object-cover object-center lg:w-24 lg:h-24"
          alt="profile picture"
        />

        <h1 className="text-2xl font-bold text-center mt-4 lg:text-3xl">{user.name}</h1>
        <p className="text-gray-500 text-center mt-1 lg:text-lg">
          {t("are_you_sure_you_want_to")} <span className='text-red-500 font-semibold'>{t("block")}</span> <span className='font-semibold'>{user.name + " " + user.surname}</span>
        </p>

        <div className="buttons flex w-full mt-7 gap-2">
          <button
            className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              setClose(0);
            }}
          >
            {t("cancel")}
          </button>
          <button
            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={block}
            disabled={loading}
          >
           {loading ? <LoadingButton /> : t("block")}
          </button>
        </div>
      </ReactModal>
    );
};

export default DeleteModal
