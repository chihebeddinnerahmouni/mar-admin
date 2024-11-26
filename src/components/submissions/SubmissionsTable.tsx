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

interface Data {
  id: number;
    profilePic: string;
    buis_type: string;
    category: string;
    city: string
  name: string;
  phone: string;
  email: string;
  boatType: string;
}


interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "profilePic",
    numeric: false,
    disablePadding: true,
    label: "profile_picture",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: true,
    label: "phone",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "email",
  },
  {
    id: "buis_type",
    numeric: false,
    disablePadding: false,
    label: "buis_type",
  },
  { id: "boatType", numeric: false, disablePadding: false, label: "boat_type" },
  { id: "city", numeric: false, disablePadding: false, label: "city" },
];


interface EnhancedTableProps {

}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
  } = props;

  const { t } = useTranslation();

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
export default function EnhancedTable({rows}: any) {


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { i18n, t } = useTranslation();
  const [deleteModalUserId, setDeleteModalUserId] = React.useState<
    number | null
        >(0);
    const [acceptModalUserId, setAcceptModalUserId] = React.useState<
        number | null
    >(0);
    const url = import.meta.env.VITE_SERVER_URL_USERS;

    

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
              {rows.map((user: any) => {
           return (
             <TableRow
               hover
               role="checkbox"
               tabIndex={-1}
               key={user.id}
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
               <TableCell
                 component="th"
                 //  id={labelId}
                 scope="row"
                 padding="normal"
                 align="center"
               >
                 <img
                   src={
                     user.user.profilePicture
                       ? url + "/" + user.user.profilePicture
                       : "/anonyme.jpg"
                   }
                   alt={`${user.name}'s profile`}
                   className="w-[40px] h-[40px] rounded-full object-cover object-center mx-auto"
                 />
               </TableCell>
               <TableCell
                 className="text-nowrap"
                 align="center"
                 padding="normal"
               >
                 {t(user.user.phoneNumber)}
               </TableCell>
               <TableCell
                 className="text-nowrap"
                 align="center"
                 padding="normal"
               >
                 {t(user.user.email)}
               </TableCell>
               <TableCell
                 className="text-nowrap"
                 align="center"
                 padding="normal"
               >
                 {t(user.business_type)}
               </TableCell>
               <TableCell align="center" className="text-nowrap">
                 {i18n.language === "en" ? user.boat_type.name : user.boat_type}
               </TableCell>
               <TableCell className="text-nowrap" align="center">
                 {/* {user.city} */}
                 {i18n.language === "en"
                   ? user.city.name
                   : user.city.arabic_name}
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
                       setAcceptModalUserId(user.id);
                     }}
                   >
                     <CheckIcon className="text-green-500 hover:text-green-700" />
                   </IconButton>
                   <IconButton
                     onClick={(event) => {
                       event.stopPropagation();
                       setDeleteModalUserId(user.id);
                     }}
                   >
                     <DeleteIcon className="text-main hover:text-mainHover" />
                   </IconButton>
                 </Box>
               </TableCell>
               {deleteModalUserId === user.id && (
                 <DeleteOneSubmittion
                   setClose={() => setDeleteModalUserId(null)}
                   user={user}
                 />
               )}
               {acceptModalUserId === user.id && (
                 <AcceptOneSubmission
                   setClose={() => setAcceptModalUserId(null)}
                   user={user}
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