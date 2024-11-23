import { useTranslation } from 'react-i18next';
import React from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => {

  const { i18n } = useTranslation();

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > 3) {
      if (currentPage === 1) {
        startPage = 1;
        endPage = 3;
      } else if (currentPage === totalPages) {
        startPage = totalPages - 2;
        endPage = totalPages;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`w-[35px] h-[35px] rounded-[5px] flex items-center justify-center mx-1 ${i === currentPage ? 'border border-main hover:shadow-hoverShadow' : ' hover:shadow-hoverShadow'}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };





  return (
    <div className="flex justify-center items-center w-full">
      {currentPage !== 1 && (
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className=" w-[40px] h-[35px] mx-1 flex items-center justify-center rounded-[5px] gap-1 hover:bg-emptyInput"
        >
          {i18n.language === "en" ? <FaAngleLeft /> : <FaAngleRight />}{" "}
          {/* {t("previous")} */}
        </button>
      )}
      {renderPageNumbers()}
      {currentPage !== totalPages && totalPages ? (
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="w-[40px] h-[35px] mx-1 flex items-center justify-center rounded-[5px] gap-1 hover:bg-emptyInput"
        >
          {/* {t("next")}{" "} */}
          {i18n.language === "en" ? <FaAngleRight /> : <FaAngleLeft />}
        </button>
      ): null}
    </div>
  );
};

export default Pagination;
