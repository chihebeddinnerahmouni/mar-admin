import DeleteCategoryQst from '../../components/help/DeleteCategoryQst';
import { useMediaQuery } from '@mui/material';
import AddQuestionCat from '../../components/help/AddQuestionCat';
import { useState, useRef, useEffect } from 'react';
import { FaTrash } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import ButtonFunc from '../../components/ui/buttons/Button';


const CatQsts = ({ helpCat, selectedCat, handleCategoryClick }: any) => {
  const isMobile = useMediaQuery('(max-width: 648px)');
  const [isAddQstOpen, setIsAddQstOpen] = useState(false);
  const [isDeleteCatOpen, setIsDeleteCatOpen] = useState(false);
  const [deleteCatObject, setDeleteCatObject] = useState<any>({});
  const { i18n, t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
   let isDown = false;
   let startX: number;
   let scrollLeft: number;



  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const handleMouseDown = (e: MouseEvent) => {
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      };

      const handleMouseLeave = () => {
        isDown = false;
      };

      const handleMouseUp = () => {
        isDown = false;
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 3;
        container.scrollLeft = scrollLeft - walk;
      };

      container.addEventListener("mousedown", handleMouseDown);
      container.addEventListener("mouseleave", handleMouseLeave);
      container.addEventListener("mouseup", handleMouseUp);
      container.addEventListener("mousemove", handleMouseMove);

      return () => {
        container.removeEventListener("mousedown", handleMouseDown);
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.removeEventListener("mouseup", handleMouseUp);
        container.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <div
      className="container flex justify-between w-full items-center mb-4 unselectableCss"
      ref={containerRef}
    >
      <div className="overflow-auto whitespace-nowrap flex gap-3 max-w-[260px] md:max-w-[400px] lg:max-w-[600px]">
        {helpCat.map((cat: any) => (
          <CatComponent
            cat={cat}
            selectedCat={selectedCat}
            handleCategoryClick={handleCategoryClick}
            setIsDeleteCatOpen={setIsDeleteCatOpen}
            setDeleteCatObject={setDeleteCatObject}
            i18n={i18n}
          />
        ))}
      </div>
      <div className="">
        <ButtonFunc
          onClick={() => {
            setIsAddQstOpen(true);
          }}
          color="green"
          text={isMobile ? "+" : t("add_category")}
        />
      </div>

      {isDeleteCatOpen && (
        <DeleteCategoryQst
          setClose={() => setIsDeleteCatOpen(false)}
          cat={deleteCatObject}
        />
      )}
      {isAddQstOpen && (
        <AddQuestionCat setClose={() => setIsAddQstOpen(false)} />
      )}
    </div>
  );
};

export default CatQsts;


const CatComponent = ({
  cat,
  selectedCat,
  handleCategoryClick,
  setIsDeleteCatOpen,
  setDeleteCatObject,
  i18n,
}:{
  cat: any,
  selectedCat: number,
  handleCategoryClick: (id: number) => void,
  setIsDeleteCatOpen: (value: boolean) => void,
  setDeleteCatObject: (value: any) => void,
  i18n: any
}) => {

  return (
    <div
      key={cat.id}
      className={`py-2 cursor-pointer flex items-center justify-between ${
        selectedCat === cat.id ? "text-black font-bold" : "text-writingGrey"
      }`}
      onClick={() => handleCategoryClick(cat.id)}
    >
      <span>{i18n.language === "en" ? cat.name : cat.arabic_name}</span>
      <button
        className={`mx-3 ${
          selectedCat === cat.id ? "text-red-500" : "text-writingGrey"
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
  );
}