import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { IoSearchSharp } from "react-icons/io5";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  TablePagination,
  Box,
  Paper,
  TableContainer,
  Table,
  TableBody,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";


interface Data {
  id: number;
  profilePic: string;
  name: string;
  phone: string;
  email: string;
  business_type: string;
  boat_type: string;
  city: string;
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
  { id: "name", numeric: false, disablePadding: false, label: "name" },
  { id: "phone", numeric: false, disablePadding: false, label: "phone" },
  { id: "email", numeric: false, disablePadding: false, label: "email" },
  {
    id: "business_type",
    numeric: false,
    disablePadding: false,
    label: "business_type",
  },
  {
    id: "boat_type",
    numeric: false,
    disablePadding: false,
    label: "boat_type",
  },
  { id: "city", numeric: false, disablePadding: false, label: "city" },
];


function EnhancedTableHead() {


  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding="normal"
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

interface EnhancedTableToolbarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { searchQuery, setSearchQuery } = props;
  const { i18n, t } = useTranslation();

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }
      ]}
    >
      
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
        {t("documents")}
        </Typography>
      <div className="search relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("search_by_name")}
          className={`p-2 w-[130px] border rounded-40 outline-main font-semibold bg-emptyInput md:w-[200px] ${
            i18n.language === "ar" ? "pr-7" : "pl-7"
          }`}
        />
        <IoSearchSharp
          className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 text-[18px] ${
            i18n.language === "ar" ? "right-2" : "left-2"
          }`}
        />
      </div>
    </Toolbar>
  );
}

// Main Table component
export default function EnhancedTable({ rows }: {rows: any[]}) {

  // const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState("");
  const url = import.meta.env.VITE_SERVER_URL_USERS;
  const { i18n, t } = useTranslation();



  const filteredRows = rows.filter((row: any) =>
    row.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


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
        <EnhancedTableToolbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead/>
            <TableBody>
              {filteredRows.map((row: any, index: number) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
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
                      id={labelId}
                      scope="row"
                      align="center"
                      padding="normal"
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <LazyLoadImage
                        alt={`${row.name}'s profile`}
                        src={row.user.profilePicture ? url + "/" + row.user.profilePicture : "/anonyme.jpg"}
                        effect="blur"
                        className="w-[40px] h-[40px] rounded-full object-cover object-center"
                      />
                    </TableCell>
                    <TableCell
                      className="text-nowrap"
                      align="center"
                      padding="normal"
                    >
                      {row.user.name + " " + row.user.surname}
                    </TableCell>
                    <TableCell
                      align="center"
                      padding="normal"
                      className="text-nowrap"
                    >
                      {row.user.phoneNumber}
                    </TableCell>
                    <TableCell
                      align="center"
                      padding="normal"
                      className="text-nowrap"
                    >
                      {row.user.email}
                    </TableCell>
                    <TableCell
                      className="text-nowrap"
                      align="center"
                      padding="normal"
                    >
                      {t(row.submission.business_type)}
                    </TableCell>
                    <TableCell align="center" className="text-nowrap">
                      {
                        i18n.language === "en"
                        ? row.submission.boat_type.en
                        : row.submission.boat_type.ar
                      }
                    </TableCell>
                    <TableCell className="text-nowrap" align="center">
                      {
                        i18n.language === "en"
                        ? row.submission.city.en
                        : row.submission.city.ar
                      }
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
                            window.open(
                              `documents/check-document/${row.submission.id}`,
                              "_blank"
                            );
                          }}
                        >
                          <RemoveRedEyeIcon className="text-green-500 hover:text-green-700" />
                        </IconButton>
                      </Box>
                    </TableCell>
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
