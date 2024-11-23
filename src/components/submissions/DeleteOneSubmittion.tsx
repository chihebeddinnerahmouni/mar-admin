// import ReactModal from "react-modal";
// import React from "react";
// import DeleteIcon from "@mui/icons-material/Delete";
// import LoadingButton from "../ui/LoadingButton";
// import axios from "axios";


// interface DeleteModalProps {
//   setClose: (isOpen: number) => void;
//   user: any;
// }
// ReactModal.setAppElement("#root");

// const DeleteOneSubmittion: React.FC<DeleteModalProps> = ({
//   setClose,
//   user,
// }) => {
//   // console.log(user);

//   return (
//     <ReactModal
//       isOpen={true}
//       onRequestClose={() => setClose(0)}
//       className={" bg-white rounded-lg p-4 shadow-hardShadow lg:p-6"}
//       overlayClassName={
//         "fixed bg-black bg-opacity-10 backdrop-blur-[7px] inset-0 flex items-center justify-center mt-[60px] lg:mt-[80px]"
//       }
//     >
//       <h1 className="text-2xl font-bold text-center lg:text-3xl">
//         Refuse Submission
//       </h1>
//       <p className="text-gray-500 text-center mt-5 lg:text-lg">
//         Do you want to <strong className="text-red-400">delete</strong> the
//         submission of <strong>{user.name}</strong>
//       </p>

//       <div className="buttons flex w-full mt-3 gap-2">
//         <button
//           className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
//           onClick={(e) => {
//             e.stopPropagation();
//             setClose(0);
//           }}
//         >
//           Cancel
//         </button>
//         <button
//           className="w-full bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-center"
//           onClick={(e) => {
//             e.stopPropagation();
//           }}
//         >
//           <DeleteIcon />
//           <span>Delete</span>
//         </button>
//       </div>
//     </ReactModal>
//   );
// };

// export default DeleteOneSubmittion;



import ReactModal from "react-modal";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import LoadingButton from "../ui/LoadingButton";

interface DeleteModalProps {
  setClose: (isOpen: number) => void;
  user: any;
}
ReactModal.setAppElement("#root");

const DeleteOneSubmittion: React.FC<DeleteModalProps> = ({
  setClose,
  user,
}) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const mainColor = "#FF385C";
  const url = import.meta.env.VITE_SERVER_URL_LISTING;

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setLoading(true);
   axios
     .put(
       `${url}/api/submit/user-submissions/${user.id}/refuse`,
       {
         reason: reason,
       },
       {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
         },
       }
     )
     .then(() => {
       //  console.log(res.data);
       setLoading(false);
       setClose(0);
       window.location.reload();
     })
     .catch(() => {
       //  console.log(err);
       setLoading(false);
     });
  };


  console.log(user);


  return (
    <ReactModal
      isOpen={true}
      onRequestClose={() => setClose(0)}
      className={" bg-white rounded-lg p-4 shadow-hardShadow lg:p-6"}
      overlayClassName={
        "fixed bg-black bg-opacity-10 backdrop-blur-[7px] inset-0 flex items-center justify-center mt-[60px] lg:mt-[80px]"
      }
    >
      <h1 className="text-2xl font-bold text-center lg:text-3xl">
        Refuse Submission
      </h1>
      <p className="text-gray-500 text-center mt-5 lg:text-lg">
        Do you want to <strong className="text-red-400">Refuse</strong> this
        submission ?
      </p>

      <TextField
        label="Reason for deletion"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "grey",
            },
            "&:hover fieldset": {
              borderColor: "grey",
            },
            "&.Mui-focused fieldset": {
              borderColor: mainColor,
            },
          },
          "& .MuiInputLabel-root": {
            color: "gray",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: mainColor,
          },
        }}
      />

      <div className="buttons flex w-full mt-3 gap-2">
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
          className="w-full bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-center"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? (
            <LoadingButton />
          ) : (
            <>
              <span>Delete</span>
              <DeleteIcon />
            </>
          )}
        </button>
      </div>
    </ReactModal>
  );
};

export default DeleteOneSubmittion;