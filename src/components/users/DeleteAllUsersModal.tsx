import ReactModal from "react-modal";
import React from "react";

interface DeleteModalProps {
  setClose: (isOpen: boolean) => void;
  selected: number[];
}
ReactModal.setAppElement("#root");

// not used

const DeleteAllUsersModal: React.FC<DeleteModalProps> = ({
  setClose,
  selected,
}) => {
  //   console.log(selected);

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={() => setClose(false)}
      className={" bg-white rounded-lg p-4 shadow-hardShadow lg:p-6"}
      overlayClassName={
        "fixed bg-black bg-opacity-10 backdrop-blur-[7px] inset-0 flex items-center justify-center p-4"
      }
    >
      <p className="text-gray-500 text-center mt-1 lg:text-lg">
        Are you sure you want to delete {selected.length} selected user(s)? <br />
        This action cannot be undone.`
      </p>

      <div className="buttons flex w-full mt-7 gap-2">
        <button
          className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
            setClose(false);
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

export default DeleteAllUsersModal;
