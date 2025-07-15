import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../BackButton";
import SaveButton from "../SaveButton";
export default function AddPage() {
  const navigate = useNavigate();

  const [docId, setDocId] = useState("");
  const [tnved, setTnved] = useState("");
  const [date, setDate] = useState(null);

  const handleSave = async () => {
    if (!docId || !tnved || !date) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    const payload = {
      doc_name: docId,
      tnved: tnved,
      date: dayjs(date).format("YYYY-MM-DD"),
      status: "Yangi",
    };

    console.log("Yuborilayotgan payload:", payload);

    try {
      const res = await axios.post(
        "https://6866a09589803950dbb36624.mockapi.io/data",
        payload
      );
      console.log("Yaratilgan:", res.data);

      toast.success("Yangi hujjat qo‘shildi!");
      navigate("uz/base/znak/chestny-znak", { replace: true });
    } catch (error) {
      console.error("POST xatolik:", error);
      toast.error("API ga yuborishda xatolik!");
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 6, px: 2 }}>
      <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Yangi hujjat qo‘shish
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Hujjat raqami"
              value={docId}
              onChange={(e) => setDocId(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="TNVED"
              value={tnved}
              onChange={(e) => setTnved(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Sana"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <BackButton onClick={() => navigate("/uz/base/znak/chestny-znak")} />
          <SaveButton onClick={handleSave} />
        </Box>
      </Card>
      <ToastContainer position="top-right" autoClose={2000} />
    </Box>
  );
}
