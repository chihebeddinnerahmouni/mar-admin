import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { IoSearchSharp } from "react-icons/io5";
import CheckIcon from "@mui/icons-material/Check";
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
import AcceptSelected from "./Acceptselected";
import DeleteSelected from "./DeleteSelected";


interface Data {
  id: number;
  profilePic: string;
  name: string;
  phone: string;
    email: string;
    documents: number
    
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
    label: "Profile Picture",
  },
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  { id: "phone", numeric: false, disablePadding: false, label: "Phone" },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "documents", numeric: false, disablePadding: false, label: "Documents" },
];

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: "red",
              },
              "&.MuiCheckbox-indeterminate": {
                color: "red",
              },
            }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all users",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
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
  const { numSelected, searchQuery, setSearchQuery, selected } = props;

  const [deleteAllModal, setDeleteAllModal] = React.useState(false);
  const [acceptAllModal, setAcceptAllModal] = React.useState(false);
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
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Submitions
        </Typography>
      )}
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

      {numSelected > 0 ? (
        <>
           {acceptAllModal && (
            <AcceptSelected
              setClose={() => setAcceptAllModal(false)}
              selected={selected}
            />
          )}
          {deleteAllModal && (
            <DeleteSelected
              setClose={() => setDeleteAllModal(false)}
              selected={selected}
            />
          )}
          <Tooltip title="Delete">
            <>
              <IconButton onClick={() => setAcceptAllModal(true)}>
                <CheckIcon className="text-green-500" />
              </IconButton>
              <IconButton onClick={() => setDeleteAllModal(true)}>
                <DeleteIcon className="text-main hover:text-mainHover" />
              </IconButton>
            </>
          </Tooltip>
        </>
      ) : null}
    </Toolbar>
  );
}

// Main Table component
export default function EnhancedTable({ rows }: any) {
  const order = "asc";
    const orderBy = "name";
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState("");


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
              {rows.map((user: any, index: number) => {
                const isItemSelected = selected.includes(user.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, user.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={user.id}
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
                    <TableCell padding="checkbox">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "red",
                          },
                        }}
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <img
                        src={user.image}
                        alt={`${user.name}'s profile`}
                        className="w-[40px] h-[40px] rounded-full"
                      />
                    </TableCell>
                    <TableCell className="text-nowrap">{user.name}</TableCell>
                    <TableCell className="text-nowrap">{user.phone}</TableCell>
                    <TableCell className="text-nowrap">{user.email}</TableCell>
                    <TableCell className="text-nowrap" align="center">
                      {user.documents.length}
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
                              `documents/check-document/${user.id}`,
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
