import DeleteCategoryQst from '../../components/help/DeleteCategoryQst';
import { useMediaQuery } from '@mui/material';
import AddQuestionCat from '../../components/help/AddQuestionCat';
import { useState } from 'react';
import { FaTrash } from "react-icons/fa";
import { useTranslation } from 'react-i18next';


const CatQsts = ({ helpCat, selectedCat, handleCategoryClick }: any) => {
  const isMobile = useMediaQuery('(max-width: 648px)');
  const [isAddQstOpen, setIsAddQstOpen] = useState(false);
  const [isDeleteCatOpen, setIsDeleteCatOpen] = useState(false);
  const [deleteCatObject, setDeleteCatObject] = useState<any>({});
  const { i18n } = useTranslation();

  return (
    <div className="container flex w-full items-start justify-between">
      <div className="overflow-auto whitespace-nowrap flex mb-4 gap-3 max-w-[260px] md:max-w-[400px] lg:max-w-[600px]">
        {helpCat.map((cat: any) => (
          <div
            key={cat.id}
            className={`py-2 cursor-pointer flex ${
              selectedCat === cat.id
                ? "text-black font-bold"
                : "text-writingGrey"
            }`}
            onClick={() => handleCategoryClick(cat.id)}
          >
            <span>{i18n.language === "en" ? cat.name : cat.arabic_name}</span>
            <button
              className={`mx-3 ${
                selectedCat === cat.id
                  ? "text-red-500"
                  : "text-writingGrey"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setIsDeleteCatOpen(true);
                setDeleteCatObject(cat);
              }}
            >
              <FaTrash className="text-sm" />
            </button>
          </div>
        ))}
      </div>
      {isDeleteCatOpen && (
        <DeleteCategoryQst
          setClose={setIsDeleteCatOpen}
          cat={deleteCatObject}
        />
      )}
      <button
        className="bg-main text-white px-4 py-2 rounded"
        onClick={() => {
          setIsAddQstOpen(true);
        }}
      >
        {isMobile ? "+" : "Add Category"}
      </button>
      {isAddQstOpen && <AddQuestionCat setClose={setIsAddQstOpen} />}
    </div>
  );
};

export default CatQsts;


// import { useMediaQuery } from '@mui/material';
// import AddQuestionCat from '../../components/help/AddQuestionCat';
// import { useState } from 'react';


// const CatQsts = ({ helpCat, selectedCat, handleCategoryClick }: any) => {


//     const isMobile = useMediaQuery('(max-width: 648px)');
//     const [isAddQstOpen, setIsAddQstOpen] = useState(false);


//   return (
//     <div className="container flex w-full items-start justify-between">
//       <div className="overflow-auto whitespace-nowrap mb-4 max-w-[260px] md:max-w-[400px] lg:max-w-[600px]">
//         {helpCat.map((cat: any) => (
//           <div
//             key={cat.id}
//             className={`inline-block px-4 py-2 cursor-pointer ${
//               selectedCat === cat.id
//                 ? "text-black border-b-2 border-black"
//                 : "text-writingGrey"
//             }`}
//             onClick={() => handleCategoryClick(cat.id)}
//           >
//             {cat.name}
//           </div>
//         ))}
//       </div>
//       <button
//         className="bg-main text-white px-4 py-2 rounded"
//         onClick={() => setIsAddQstOpen(true)}
//       >
//         {isMobile ? "+" : "Add Category"}
//       </button>
//       {isAddQstOpen && <AddQuestionCat setClose={setIsAddQstOpen}/>}
//     </div>
//   );
// };

// export default CatQsts
