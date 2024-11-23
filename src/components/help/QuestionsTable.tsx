import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import AddQst from "./AddQst";

const TableOfQuestions = ({
  categoryId,
  helpCat,
}: {
  categoryId: number;
  helpCat: any[];
}) => {
  // const questions = getQuestionsByCategory(categoryId);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  );
  const [questions, setQuestions] = useState<any[]>([]);
  const [isAddQstOpen, setIsAddQstOpen] = useState(false);
  const url = import.meta.env.VITE_SERVER_URL_HELP;

  useEffect(() => {
    setQuestions([]);
    axios
      .get(url + `/categories/${categoryId}/questions`)
      .then((res) => {
        // console.log(res.data);
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryId]);

  const handleRowClick = (id: number) => {
    setSelectedQuestionId(selectedQuestionId === id ? null : id);
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this question?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${url}/questions/${id}`)
          .then(() => {
            // console.log(res.data);
                    Swal.fire(
                      "Success",
                      "The question has been deleted!",
                      "success"
                    );
                   window.location.reload();
          })
          .catch((err) => {
            console.error(err);
          })
      }
    });
  };


  return (
    <div className="overflow-x-auto">
      {isAddQstOpen && (
        <AddQst setClose={setIsAddQstOpen} categoriesArray={helpCat} />
      )}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 border-b">Question</th>
            <th className="py-2 px-4 border-b">
              <button
                className="text-main text-[18px]"
                onClick={() => setIsAddQstOpen(true)}
              >
                +
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <React.Fragment key={question.id}>
              <tr
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(question.id)}
              >
                <td className="border px-4 py-2 truncate max-w-xs">
                  {question.question}
                </td>
                <td className="px-4 mt-2.5 flex space-x-2 justify-center">
                  <button
                    className="text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(question.id);
                    }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
              {selectedQuestionId === question.id && (
                <tr className="bg-red-100 bg-opacity-50">
                  <td colSpan={2} className="border px-4 py-2 ">
                    <div
                      dangerouslySetInnerHTML={{ __html: question.answer }}
                    />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableOfQuestions;
