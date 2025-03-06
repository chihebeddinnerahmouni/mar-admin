import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import {
  TablePagination,
  Box,
  Paper,
  TableContainer,
  Table,
  TableBody,
} from "@mui/material";
// import { useTranslation } from "react-i18next";
import AcceptOneSubmission from "./AcceptOneSubmission";
import DeleteOneSubmittion from "./DeleteOneSubmittion";
import { useTranslation } from "react-i18next";
interface City {
  en: string;
  ar: string;
}

interface BoatType {
  en: string;
  ar: string;
}

interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: string;
  profilePicture: string | null;
  dateOfBirth: string | null;
  address: string | null;
  isAuthorized: string;
  role: string;
  lastLogin: string | null;
  isVerified: boolean;
  preferences: string | null;
  block: boolean;
  suspend: boolean;
  contact: boolean;
  createdAt: string;
  description: string | null;
  languageSpoken: string | null;
  updatedAt: string;
}

interface Data {
  id: number;
  user_id: number;
  admin_contacted: boolean;
  boat_type: BoatType;
  business_management: string;
  business_type: string;
  city: City;
  status: string;
  created_at: string; // ISO date string (can be converted to Date if needed)
  updated_at: string; // ISO date string (can be converted to Date if needed)
  user_response: string | null;
  user: User;
}


interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}



interface EnhancedTableProps {
  
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
  } = props;
  
  const { t } = useTranslation();
  
  const headCells: readonly HeadCell[] = [
    {
      id: "boat_type",
      numeric: false,
      disablePadding: false,
      label: t("boat_type"),
    },
    {
      id: "business_type",
      numeric: false,
      disablePadding: false,
      label: t("business_type"),
    },
    {
      id: "city",
      numeric: false,
      disablePadding: false,
      label: t("city"),
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: t("status"),
    },
    {
      id: "created_at",
      numeric: false,
      disablePadding: false,
      label: t("created_at"),
    },
  ];
  
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sx={{ fontWeight: "bold" }}
            className="text-nowrap"
          >
            {t(headCell.label)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


// Main Table component
export default function EnhancedTable({rows}: {rows: Data[]}) {


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { i18n, t } = useTranslation();
  const [deleteModalUserId, setDeleteModalUserId] = React.useState<
    number | null
        >(0);
    const [acceptModalUserId, setAcceptModalUserId] = React.useState<
        number | null
    >(0);

    

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    };
  
  
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
            />
            <TableBody>
              {rows.map((submittion) => {
           return (
             <TableRow
               hover
               role="checkbox"
               tabIndex={-1}
               key={submittion.id}
               sx={{
                 cursor: "pointer",
                 bgcolor: "inherit",
                 "&.Mui-selected": {
                   bgcolor: "rgba(255, 0, 0, 0.1) !important",
                 },
                 "&.Mui-selected:hover": {
                   bgcolor: "rgba(139, 0, 0, 0.1) !important",
                 },
               }}
             >
               <TableCell align="center" className="text-nowrap">
                 {i18n.language === "en" ? submittion.boat_type.en : submittion.boat_type.ar}
               </TableCell>
               <TableCell className="text-nowrap" align="center">
                 {t(submittion.business_type)}
               </TableCell>
               <TableCell className="text-nowrap" align="center">
                  {i18n.language === "en"
                    ? submittion.city.en
                   : submittion.city.ar}
               </TableCell>
               <TableCell className="text-nowrap" align="center">
                 {t(submittion.status.toLocaleLowerCase())}
               </TableCell>
               <TableCell className="text-nowrap" align="center">
                 {new Date(submittion.created_at).toLocaleString(i18n.language)}
               </TableCell>

               <TableCell align="right">
                 <Box
                   sx={{
                     display: "flex",
                     justifyContent: "flex-end",
                     alignItems: "center",
                   }}
                 >
                   <IconButton
                     onClick={(event) => {
                       event.stopPropagation();
                       setAcceptModalUserId(submittion.id);
                     }}
                   >
                     <CheckIcon className="text-green-500 hover:text-green-700" />
                   </IconButton>
                   <IconButton
                     onClick={(event) => {
                       event.stopPropagation();
                       setDeleteModalUserId(submittion.id);
                     }}
                   >
                     <DeleteIcon className="text-main hover:text-mainHover" />
                   </IconButton>
                 </Box>
               </TableCell>
               {deleteModalUserId === submittion.id && (
                 <DeleteOneSubmittion
                   setClose={() => setDeleteModalUserId(null)}
                   user={submittion}
                 />
               )}
               {acceptModalUserId === submittion.id && (
                 <AcceptOneSubmission
                   setClose={() => setAcceptModalUserId(null)}
                   user={submittion}
                 />
               )}
             </TableRow>
           );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}