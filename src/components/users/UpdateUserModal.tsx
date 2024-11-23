import ReactModal from "react-modal";
import React from "react";

interface DeleteModalProps {
  setClose: (isOpen: number) => void;
  user: any;
}
ReactModal.setAppElement("#root");

// not used

const UpdateUserModal: React.FC<DeleteModalProps> = ({ setClose, user }) => {
//   console.log(user);

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
        src={user.profilePic}
        className="w-20 h-20 rounded-full mx-auto object-cover object-center lg:w-24 lg:h-24"
        alt="profile picture"
      />

      <h1 className="text-2xl font-bold text-center mt-4 lg:text-3xl">
        {user.name}
      </h1>
      <p className="text-gray-500 text-center mt-1 lg:text-lg">
        Are you sure you want to delete this user? <br /> This action cannot be
        undone
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
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Delete
        </button>
      </div>
    </ReactModal>
  );
};

export default UpdateUserModal;
