import React, {useCallback} from "react";
import CategoriesTable from "../components/categories/CategoriesTable";
import LoadingLine from "../components/ui/LoadingLine";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import {axios_error_handler} from "../functions/axios_error_handler";



interface Category {
  id: number;
  enName: string;
  arName: string;
  image?: string;
}


const Categories: React.FC = () => {

  const { t } = useTranslation();
  
  const fetshData = useCallback(async () => {
    const url = import.meta.env.VITE_SERVER_URL_CATEGORY as string;
    const res = await axios.get(url + "/categories");
    return res.data;
  }, []);
  
  const { data, isLoading, error } = useQuery<Category[]>({
    queryKey: ["getCategories"],
    queryFn: fetshData,
  });


  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    )
  }

  if (error) {
    axios_error_handler(error, t);
    return null;
  }

  return (
    <div className={`md:p-8 mx-auto p-4 md:px-[40px] lg:max-w-[700px]`}>
      <div className="">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text">
          {t("categories_management")}
        </h1>
        <p className="text-sm md:text-base text-gray-600 mb-8">
          {t("categories_management_description")}
        </p>
        <CategoriesTable categories={data} />
      </div>
    </div>
  );
};

export default Categories;

// const initialCategories: Category[] = [
//   { id: 1, enName: "engine", arName: "محرك", image: "hirbae.jpg" },
//   { id: 2, enName: "sail", arName: "شراع", image: "hirbae.jpg" },
//   { id: 3, enName: "motor", arName: "موتور", image: "hirbae.jpg" },
//   { id: 4, enName: "yacht", arName: "يخت", image: "hirbae.jpg" },
// ];