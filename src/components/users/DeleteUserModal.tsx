import ReactModal from 'react-modal';
import React from 'react';
import axios from 'axios';
import LoadingButton from '../ui/LoadingButton';



interface DeleteModalProps {
    setClose: (isOpen: number) => void;
    user: any;
}
ReactModal.setAppElement("#root"); 
    

const DeleteModal: React.FC<DeleteModalProps> = ({ setClose, user }) => {
    

    // console.log(user);
  const url = import.meta.env.VITE_SERVER_URL_USERS;
  const [loading, setLoading] = React.useState(false);

  const block = async (e: any) => {
    e.stopPropagation();
    setLoading(true);
    axios.delete(url + "/" + "/admin/user/users?block=true&suspend=false")
    .then((res) => {
      console.log(res.data);
      // setClose(0);
    })
    .catch((err) => {
      console.log(err);
    })

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
          Are you sure you want to <span className='text-red-500 font-semibold'>Block</span> this user? <br /> This action cannot
          be undone
        </p>

        <div className="buttons flex w-full mt-7 gap-2">
          <button
            className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              setClose(0);
            }}
          >
            Cancel
          </button>
          <button
            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={block}
          >
           {loading ? <LoadingButton /> : "Block"}
          </button>
        </div>
      </ReactModal>
    );
};

export default DeleteModal
