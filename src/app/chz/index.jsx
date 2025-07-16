import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Paper,
  TableHead,
  TableCell,
  Table,
  TableRow,
  TableBody,
  Grid,
  IconButton,
  TextField,
  InputAdornment,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VerifiedIcon from "@mui/icons-material/Verified";

import { useDispatch, useSelector } from "react-redux";
import {
  setSearchName,
  setSearchTvend,
  setSearchDate,
} from "./store/filterSlice";

import { fetchDataList, deleteDataItem } from "./api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddButton from "./AddButton";
import { useNavigate } from "react-router-dom";
import { replace } from "formik";

const IndexPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchName, searchTvend, searchDate } = useSelector(
    (state) => state.filters
  );

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchDataList()
      .then((data) => setTableData(data))
      .catch((err) => console.error("API xato:", err))
      .finally(() => setLoading(false));
  }, []);
  const filteredData = tableData.filter(
    (item) =>
      String(item.doc_name || "")
        .toLowerCase()
        .includes(searchName.toLowerCase()) &&
      String(item.tnved || "")
        .toLowerCase()
        .includes(searchTvend.toLowerCase()) &&
      String(item.date || "").includes(searchDate)
  );

  const handleAction = async (action, doc) => {
    if (action === "edit") {
      navigate(`/uz/base/znak/chestny-znak/edit/${doc.tnved}`, {
        replace: true,
      });
    } else if (action === "delete") {
      try {
        await deleteDataItem(doc.id);
        setTableData(tableData.filter((item) => item.id !== doc.id));
        toast.success("Hujjat o'chirildi!");
      } catch (err) {
        toast.error("O'chirishda xatolik! " + err.message);
      }
    } else if (action === "view") {
      navigate(`/uz/base/znak/chestny-znak/view/${doc.tnved}`, {
        replace: true,
      });
    } else if (action === "verified") {
      toast.info("Tasdiqlash bajariladi!");
    }
  };

  return (
    <Stack direction="row" p={2}>
      <Paper sx={{ width: "100%", maxWidth: 1200, margin: "auto" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          p={2}
        >
          <Typography variant="h6">Hujjatlar ro‘yxati</Typography>
          <AddButton
            onClick={() => navigate("/uz/base/znak/chestny-znak/add", replace)}
          />
        </Stack>

        <Grid>
          {loading ? (
            <Stack alignItems="center" p={4}>
              <CircularProgress />
            </Stack>
          ) : (
            <Table size="small">
              <TableHead sx={{ background: "#F5F5F5" }}>
                <TableRow>
                  <TableCell>№</TableCell>
                  <TableCell>Hujjat raqami</TableCell>
                  <TableCell>TNVED Kodi</TableCell>
                  <TableCell>Sana</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Amallar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <TextField
                      placeholder="Hujjat raqami bo‘yicha qidirish"
                      size="small"
                      fullWidth
                      value={searchName}
                      onChange={(e) => dispatch(setSearchName(e.target.value))}
                      InputProps={{
                        endAdornment: searchName && (
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              onClick={() => dispatch(setSearchName(""))}
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      placeholder="TNVED kodi bo‘yicha qidirish"
                      size="small"
                      fullWidth
                      value={searchTvend}
                      onChange={(e) => dispatch(setSearchTvend(e.target.value))}
                      InputProps={{
                        endAdornment: searchTvend && (
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              onClick={() => dispatch(setSearchTvend(""))}
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      placeholder="Sanasi bo‘yicha qidirish"
                      size="small"
                      fullWidth
                      value={searchDate}
                      onChange={(e) => dispatch(setSearchDate(e.target.value))}
                      InputProps={{
                        endAdornment: searchDate && (
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              onClick={() => dispatch(setSearchDate(""))}
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>

                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Ma’lumot yo‘q
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.doc_name}</TableCell>
                      <TableCell>{item.tnved}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>
                        <Tooltip title="Ko‘rish">
                          <IconButton
                            onClick={() => handleAction("view", item)}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        {item.status === "Yangi" && (
                          <>
                            <Tooltip title="Tahrirlash">
                              <IconButton
                                onClick={() => handleAction("edit", item)}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="O‘chirish">
                              <IconButton
                                onClick={() => handleAction("delete", item)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}

                        {["Tasdiqlangan", "Jarayonda"].includes(
                          item.status
                        ) && (
                          <Tooltip title="Tasdiqlash">
                            <IconButton
                              onClick={() => handleAction("verified", item)}
                            >
                              <VerifiedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </Grid>
      </Paper>
      <ToastContainer position="top-right" autoClose={2000} />
    </Stack>
  );
};

export default IndexPage;
