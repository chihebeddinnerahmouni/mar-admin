import { useState } from "react";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";

const CommentComp = ({ comment }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasOverflow = comment.review_content.length > 200;
  const urlUser = import.meta.env.VITE_SERVER_URL_USERS;

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your comment has been deleted.", "success");
        // Add your delete logic here
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="top flex items-center justify-between w-full">
        <div className="right flex items-center gap-3">
          <img
            src={
              comment.user.image
                ? `${urlUser}/${comment.user.image}`
                : "/anonyme.jpg"
            }
            className="w-[40px] h-[40px] object-cover object-center rounded-50"
            alt="profilePic"
          />
          <div className="flex flex-col justify-center h-full">
            <h1 className="font-bold text-writingMainDark">
              M.{comment.user.name}
            </h1>
            <p className="text-writingGrey text-sm">{comment.user.createdAt}</p>
          </div>
        </div>

        <button className=" mx-2" onClick={handleDelete}>
          <MdDelete className="text-red-500 text-[20px]" />
        </button>
      </div>

      <p className={`text-writingMainDark`}>
        {isExpanded
          ? comment.review_content
          : `${comment.review_content.substring(0, 200)}...`}
      </p>
      {hasOverflow && (
        <button
          className="mt-[-10px] text-sm text-gray-400"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default CommentComp;
