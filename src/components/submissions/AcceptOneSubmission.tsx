import ReactModal from "react-modal";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import axios from "axios";
import LoadingButton from "../ui/LoadingButton";




interface DeleteModalProps {
  setClose: (isOpen: number) => void;
  user: any;
}
ReactModal.setAppElement("#root");

const AcceptOneSubmission: React.FC<DeleteModalProps> = ({
  setClose,
  user,
}) => {

  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  console.log(user.id);

  const submit = () => { 
    setLoading(true);
    axios
      .put(
        `${url}/api/submit/user-submissions/${user.id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setClose(0);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }


  return (
    <ReactModal
      isOpen={true}
      onRequestClose={() => setClose(0)}
      className={" bg-white rounded-lg p-4 shadow-hardShadow lg:p-6"}
      overlayClassName={
        "fixed bg-black bg-opacity-10 backdrop-blur-[7px] inset-0 flex items-center justify-center mt-[60px] lg:mt-[80px]"
      }
    >
      <h1 className="text-2xl font-bold text-center mb-5 lg:text-3xl">
        Accept Submission
      </h1>
      <p className="text-gray-500 text-center lg:text-lg">
        Do you want to <strong className="text-green-400">accept</strong> this
        submission?
      </p>

      <div className="buttons flex w-full mt-4 gap-2">
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
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-1"
          onClick={submit}
        >
          {loading ? (
            <LoadingButton />
          ) : (
            <>
              <span>Accept</span>
              <CheckIcon />
            </>
          )}
        </button>
      </div>
    </ReactModal>
  );
};

export default AcceptOneSubmission;
