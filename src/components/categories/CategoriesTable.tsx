import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import {
  IoTrashSharp, IoAddCircleOutline
} from "react-icons/io5";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";


const CategoriesTable = ({ categories, refetch }: { categories: any , refetch: any}) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const url = import.meta.env.VITE_SERVER_URL_CATEGORY;
  const { t } = useTranslation();

  const handleDeleteClick = (category: any) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  return (
    <>
      {isDeleteOpen && (
        <DeleteCategoryModal
          setClose={() => setIsDeleteOpen(false)}
          category={selectedCategory}
          refetch={refetch}
        />
      )}
      {isFormVisible && (
        <AddCategoryModal
          setClose={() => setIsFormVisible(false)}
          refetch={refetch}
        />
      )}
      <TableContainer component={Paper} className="rounded-lg">
        <Table>
          <TableHead sx={{ fontSize: "bold" }}>
            <TableRow>
              <TableCell
                className="text-nowrap"
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                {t("image")}
              </TableCell>
              <TableCell
                className="text-nowrap"
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                {t("english_name")}
              </TableCell>
              <TableCell
                className="text-nowrap"
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                {t("arabic_name")}
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                <IconButton
                  size="medium"
                  sx={{ color: "red" }}
                  onClick={() => setIsFormVisible(!isFormVisible)}
                >
                  <IoAddCircleOutline />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category: any) => (
              <TableRow key={category.id}>
                <TableCell
                  align="center"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <LazyLoadImage
                    src={url + "/" + category.image}
                    alt={`${category.image}'s profile`}
                    effect="blur"
                    className="w-[40px] h-[40px] rounded-full object-cover object-center"
                  />
                </TableCell>
                <TableCell align="center">{category.name}</TableCell>
                <TableCell align="center">{category.arabic_name}</TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    sx={{ color: "red" }}
                    onClick={() => handleDeleteClick(category)}
                  >
                    <IoTrashSharp />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CategoriesTable;