import ReactModal from "react-modal";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteModalProps {
  setClose: (isOpen: number) => void;
  selected: readonly number[];
}
ReactModal.setAppElement("#root");

const DeleteSelectedListings: React.FC<DeleteModalProps> = ({
  setClose,
  selected,
}) => {
  // console.log(selected);

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={() => setClose(0)}
      className={" bg-white rounded-lg p-4 shadow-hardShadow lg:p-6"}
      overlayClassName={
        "fixed bg-black bg-opacity-10 backdrop-blur-[7px] inset-0 flex items-center justify-center mt-[60px] px-4 md:px-20 lg:mt-[80px]"
      }
    >
      <p className="text-gray-500 text-center mt-1 lg:text-lg">
        Do you want to <strong className="text-red-400">accept</strong> all the
        selected <strong>{selected.length}</strong> listings ?
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
          className="w-full bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-1"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <span>Delete</span>
          <DeleteIcon />
        </button>
      </div>
    </ReactModal>
  );
};

export default DeleteSelectedListings;
