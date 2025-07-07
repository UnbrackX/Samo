import React from "react";
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
} from "@mui/material";
import AddButton from "./AddButton";
import { Icon } from "@iconify/react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchName,
  setSearchTvend,
  setSearchDate,
} from "./store/filterSlice";

const IndexPage = () => {
  const dispatch = useDispatch();
  const { searchName, searchTvend, searchDate } = useSelector(
    (state) => state.filters
  );

  const items = [
    {
      id: 1,
      name: "Mato",
      Tvend: "6108310000",
      Date: "2025/07/06",
      status: "Faol",
    },
    {
      id: 2,
      name: "Ip",
      Tvend: "6108310001",
      Date: "2025/07/07",
      status: "Faol",
    },
    {
      id: 3,
      name: "Kimyim",
      Tvend: "6108310002",
      Date: "2025/07/08",
      status: "Faol",
    },
  ];

  const filteredItems = items.filter((item) => {
    const nameMatch = item.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const tvendMatch = item.Tvend.toLowerCase().includes(
      searchTvend.toLowerCase()
    );
    const dateMatch = item.Date.toLowerCase().includes(
      searchDate.toLowerCase()
    );
    return nameMatch && tvendMatch && dateMatch;
  });

  return (
    <Stack direction="row" p={2}>
      <Paper sx={{ width: "100%", maxWidth: 1200, margin: "auto" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          p={2}
        >
          <Typography variant="h6">Mahsulotlar ro'yxati</Typography>
          <AddButton />
        </Stack>

        <Grid item xs={12}>
          <Table size="small">
            <TableHead sx={{ background: "#F5F5F5" }}>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell sx={{ width: "200px" }}>Hujjat raqami</TableCell>
                <TableCell sx={{ width: "200px" }}>TNVED Kodi</TableCell>
                <TableCell sx={{ width: "200px" }}>Sana</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amallar</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <TextField
                    placeholder="Nomi bo'yicha qidirish"
                    size="small"
                    variant="outlined"
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
                    placeholder="TNVED kodi bo'yicha qidirish"
                    size="small"
                    variant="outlined"
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
                    placeholder="Sanasi bo'yicha qidirish"
                    size="small"
                    variant="outlined"
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
            </TableBody>

            <TableBody>
              {filteredItems.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.Tvend}</TableCell>
                  <TableCell>{item.Date}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <Icon icon="material-symbols:edit" width={18} />
                    </IconButton>
                    <IconButton color="warning">
                      <Icon icon="ph:eye" width={18} />
                    </IconButton>
                    <IconButton color="error">
                      <Icon icon="ph:trash" width={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Paper>
    </Stack>
  );
};

export default IndexPage;
