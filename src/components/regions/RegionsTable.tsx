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
import { IoTrashSharp, IoAddCircleOutline } from "react-icons/io5";
// import DeleteCategoryModal from "./DeleteCategoryModal";
import { useState } from "react";
// import AddCategoryModal from "./AddCategoryModal";
import { useTranslation } from "react-i18next";
import AddRegionModal from "./AddRegionModal";
import DeleteRegionModal from "./DeleteRegionModal";


const RegionsTable = ({ regions }: any) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleDeleteClick = (category: any) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  return (
    <>
          {isFormVisible && <AddRegionModal setClose={setIsFormVisible} />}
          {isDeleteOpen && (
            <DeleteRegionModal
              setClose={setIsDeleteOpen}
              region={selectedCategory}
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
            {regions.map((category: any) => (
              <TableRow key={category.id}>
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

export default RegionsTable;
