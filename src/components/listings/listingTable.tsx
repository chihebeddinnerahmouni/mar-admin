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

interface Data {
  id: number;
  profilePic: string;
  name: string;
  phone: string;
  email: string;
  ownerName: string;
}

type Order = "asc" | "desc";

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
    label: "Image",
  },
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  { id: "phone", numeric: false, disablePadding: false, label: "Phone" },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  {
    id: "ownerName",
    numeric: false,
    disablePadding: false,
    label: "Owner Name",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: "bold" }}
            className="text-nowrap"
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selected: readonly number[];
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, searchQuery, setSearchQuery } = props;

    const { i18n } = useTranslation();
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },

        numSelected > 0 && {
          bgcolor: "rgba(255, 0, 0, 0.1)",
        },
      ]}
    >
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Listings
        </Typography>
      <div className="search relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users by name"
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
  const order = "asc";
  const orderBy = "name";
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState("");
  const url = import.meta.env.VITE_SERVER_URL_LISTING;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: any) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

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
          numSelected={selected.length}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selected={selected}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                .filter((row: any) =>
                  row.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Pagination
                .map((row: any, index: number) => {
                  const isItemSelected = selected.includes(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{
                        cursor: "pointer",
                        bgcolor: isItemSelected
                          ? "rgba(255, 0, 0, 0.1)"
                          : "inherit",
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
                      >
                        <img
                          // src={row.image}
                          src={url + "/" + row.Images[0].url}
                          alt={`${row.name}'s profile`}
                          className="w-[40px] h-[40px] rounded-full object-cover"
                        />
                      </TableCell>
                      <TableCell className="text-nowrap">
                        {row.title.slice(0, 40) + "..."}
                      </TableCell>
                      <TableCell className="text-nowrap">
                        {row.user.phoneNumber}
                      </TableCell>
                      <TableCell className="text-nowrap">
                        {row.user.email}
                      </TableCell>
                      <TableCell className="text-nowrap" align="center">
                        {row.user.name + " " + row.user.surname}
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
                                `listings/check-details/${row.id}`,
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
