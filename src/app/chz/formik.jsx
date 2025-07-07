import React from "react";
import {
  Card,
  Grid,
  Stack,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Formik, Field, FieldArray, Form } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { data } from "react-router-dom";

const initialRow = {
  search: "",
  category: "",
  brand: "",
  model: "",
  productType: "",
  target: "",
  size: "",
  sizeType: "",
  color: "",
  manualColor: "",
  technical: "",
  modelType: "",
  showFilters: false,
  inherited: false,
};

export default function FormikTable() {
  const [apiData, setApiData] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(
        "/api/v2/znaks/api-actions?type=GET_DATA_VIA_TNVED&tnved=6108310000"
      )
      .then((res) => {
        setApiData(res.data[0]);
        console.log(data);
      })
      .catch((err) => console.error("API xato:", err));
  }, []);

  const getOptions = (key) => {
    if (!apiData) return [];

    switch (key) {
      case "category":
        return apiData.data.category.map((c) => c.cat_name);
      case "color":
        return apiData.data.color.filter((c) => c !== "Boshqa");
      case "technical":
        return apiData.data.technical_regulations;
      case "model":
        return apiData.data.model_list.map((m) => m.name);
      case "modelType":
        return apiData.data.model_var_list.map((m) => m.name);
      case "size":
        return apiData.data.size_list.map((s) => s.name);
      case "sizeType":
        return apiData.data.size_type;
      case "brand":
        return apiData.data.brend;
      case "target":
        return apiData.data.gender;
      default:
        return [];
    }
  };

  if (!apiData) return <Typography>Yuklanmoqda...</Typography>;

  return (
    <Formik
      initialValues={{ rows: [initialRow] }}
      onSubmit={(values) => {
        console.log("Yakuniy:", values);
      }}
    >
      {({ values, setFieldValue }) => {
        const completedRows = values.rows.filter(
          (row) =>
            row.search.trim() &&
            (row.color || row.manualColor.trim()) &&
            row.category &&
            row.brand &&
            row.productType.trim() &&
            row.target &&
            row.modelType &&
            row.technical &&
            row.sizeType &&
            row.size
        );

        return (
          <Form>
            <FieldArray name="rows">
              {({ push, remove }) => (
                <>
                  {values.rows.map((row, index) => (
                    <Card
                      key={index}
                      sx={{ mb: 2, p: 2, maxWidth: 1200, mx: "auto", mt: 4 }}
                    >
                      <Typography variant="h6" mb={1} fontWeight="bold">
                        TNVED Qidirish
                      </Typography>

                      <Grid container spacing={2} alignItems="center">
                        <Grid item display="flex" gap={2} alignItems="center">
                          {!row.inherited && (
                            <Field name={`rows[${index}].search`}>
                              {({ field, form }) => (
                                <TextField
                                  {...field}
                                  label="TNVED"
                                  size="small"
                                  sx={{
                                    width: 200,
                                    margin: "0",
                                    WebkitAppearance: "none",
                                    MozAppearance: "textfield",
                                    "& input[type=number]::-webkit-outer-spin-button":
                                      {
                                        WebkitAppearance: "none",
                                        margin: 0,
                                      },
                                    "& input[type=number]::-webkit-inner-spin-button":
                                      {
                                        WebkitAppearance: "none",
                                        margin: 0,
                                      },
                                  }}
                                  type="number"
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    form.setFieldValue(
                                      `rows[${index}].search`,
                                      val
                                    );
                                    form.setFieldValue(
                                      `rows[${index}].showFilters`,
                                      val.trim() !== ""
                                    );
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        {field.value ? (
                                          <IconButton
                                            size="small"
                                            onClick={() => {
                                              form.setFieldValue(
                                                `rows[${index}].search`,
                                                ""
                                              );
                                              form.setFieldValue(
                                                `rows[${index}].showFilters`,
                                                false
                                              );
                                            }}
                                          >
                                            <CloseIcon fontSize="small" />
                                          </IconButton>
                                        ) : (
                                          <SearchIcon fontSize="small" />
                                        )}
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              )}
                            </Field>
                          )}
                        </Grid>
                      </Grid>

                      {row.showFilters && (
                        <>
                          <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item xs="auto">
                              <TextField
                                size="small"
                                label="Tovar nomi"
                                value={row.productType}
                                onChange={(e) =>
                                  setFieldValue(
                                    `rows[${index}].productType`,
                                    e.target.value
                                  )
                                }
                                sx={{ width: 200 }}
                              />
                            </Grid>
                            {[
                              ["category", "Kategoriyasi"],
                              ["brand", "Brend"],
                              ["target", "Target"],
                              ["modelType", "Tip modeli"],
                              ["technical", "Texnik reglament"],
                              ["sizeType", "Tip razmeri"],
                              ["size", "Razmer"],
                            ].map(([key, label]) => (
                              <Grid item xs="auto" key={key}>
                                <FormControl size="small" sx={{ width: 200 }}>
                                  <InputLabel>{label}</InputLabel>
                                  <Select
                                    label={label}
                                    value={row[key]}
                                    onChange={(e) => {
                                      setFieldValue(
                                        `rows[${index}].${key}`,
                                        e.target.value
                                      );
                                    }}
                                  >
                                    {getOptions(key).map((o) => (
                                      <MenuItem key={o} value={o}>
                                        {o}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            ))}

                            <Grid item xs="auto">
                              {!row.manualColor.trim() && (
                                <FormControl size="small" sx={{ width: 200 }}>
                                  <InputLabel>Rang</InputLabel>
                                  <Select
                                    label="Rang"
                                    value={row.color}
                                    onChange={(e) => {
                                      setFieldValue(
                                        `rows[${index}].color`,
                                        e.target.value
                                      );
                                      if (e.target.value) {
                                        setFieldValue(
                                          `rows[${index}].manualColor`,
                                          ""
                                        );
                                      }
                                    }}
                                  >
                                    {getOptions("color").map((o) => (
                                      <MenuItem key={o} value={o}>
                                        {o}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              )}
                            </Grid>

                            <Grid item xs="auto">
                              {!row.color && (
                                <TextField
                                  size="small"
                                  label="Rangni qo‘lda kiriting"
                                  value={row.manualColor}
                                  onChange={(e) => {
                                    setFieldValue(
                                      `rows[${index}].manualColor`,
                                      e.target.value
                                    );
                                    if (e.target.value.trim()) {
                                      setFieldValue(`rows[${index}].color`, "");
                                    }
                                  }}
                                  sx={{ width: 200 }}
                                />
                              )}
                            </Grid>
                          </Grid>

                          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                            <Button
                              color="success"
                              variant="outlined"
                              onClick={() => {
                                if (!row.color && !row.manualColor.trim()) {
                                  toast.error(
                                    "Rangni tanlang yoki qo‘lda kiriting!"
                                  );
                                  return;
                                }
                                push({
                                  ...initialRow,
                                  search: row.search,
                                  showFilters: true,
                                  inherited: true,
                                });
                              }}
                            >
                              Qo‘shish
                            </Button>

                            {values.rows.length > 1 && row.inherited && (
                              <Button
                                onClick={() => {
                                  remove(index);
                                  toast.success("O‘chirildi!");
                                }}
                                color="error"
                                variant="outlined"
                              >
                                O‘chirish
                              </Button>
                            )}
                          </Stack>
                        </>
                      )}
                    </Card>
                  ))}
                  <Card sx={{ maxWidth: 1230, mx: "auto", mb: 4 }}>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead sx={{ bgcolor: "#e0e0e0" }}>
                          <TableRow>
                            <TableCell>Tovar nomi</TableCell>
                            <TableCell>Kategoriyasi</TableCell>
                            <TableCell>Rangi</TableCell>
                            <TableCell>Brendi</TableCell>
                            <TableCell>Target</TableCell>
                            <TableCell>Tip modeli</TableCell>
                            <TableCell>Texnik reglament</TableCell>
                            <TableCell>Tip razmeri</TableCell>
                            <TableCell>Razmer</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {completedRows.length > 0 ? (
                            completedRows.map((r, i) => (
                              <TableRow key={i}>
                                <TableCell
                                  sx={{ width: 70, wordBreak: "break-word" }}
                                >
                                  {r.productType}
                                </TableCell>
                                <TableCell>{r.category}</TableCell>
                                <TableCell>
                                  {r.manualColor.trim()
                                    ? r.manualColor
                                    : r.color}
                                </TableCell>
                                <TableCell>{r.brand}</TableCell>
                                <TableCell>{r.target}</TableCell>
                                <TableCell>{r.modelType}</TableCell>
                                <TableCell
                                  sx={{ width: 200, wordBreak: "break-word" }}
                                >
                                  {r.technical}
                                </TableCell>
                                <TableCell>{r.sizeType}</TableCell>
                                <TableCell>{r.size}</TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={10} align="center">
                                Hozircha ma‘lumot yo‘q
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Card>
                </>
              )}
            </FieldArray>
            <ToastContainer position="top-right" autoClose={2000} />
          </Form>
        );
      }}
    </Formik>
  );
}
