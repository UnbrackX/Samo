import React, { useEffect, useState } from "react";
import {
  Card,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@mui/material";
import { Formik, Form, FieldArray } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { replace, useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// Custom components
import SaveButton from "./SaveButton";
import BackButton from "./BackButton";
import InputPage from "./input";
import AddButton from "./AddButton";
import ComplectButton from "./CoplectButton";

// API functions
import {
  fetchDsadadList,
  getDocumentByTnved,
  saveOrUpdateDocument,
} from "./api/api";

export default function FormikTable({ isView = false }) {
  const [apiData, setApiData] = useState(null);
  const [initialRow, setInitialRow] = useState(null);
  const navigate = useNavigate();
  const { id: tnved } = useParams();

  useEffect(() => {
    fetchDsadadList()
      .then((res) => setApiData(res[0]))
      .catch((err) => console.error("API error:", err));
  }, []);

  useEffect(() => {
    const loadData = async () => {
      let row = {
        search: tnved || "",
        category: "",
        brand: "",
        productType: "",
        target: "",
        size: "",
        sizeType: "",
        color: "",
        manualColor: "",
        technical: "",
        modelType: "",
      };

      if (tnved) {
        try {
          const existing = await getDocumentByTnved(tnved);
          if (existing.length > 0) {
            const doc = existing[0];
            row = {
              search: doc.tnved || "",
              category: doc.category || "",
              brand: doc.brand || "",
              productType: doc.productType || "",
              target: doc.target || "",
              size: doc.size || "",
              sizeType: doc.sizeType || "",
              color: doc.color || "",
              manualColor: "",
              technical: doc.technical || "",
              modelType: doc.modelType || "",
            };
          }
        } catch (err) {
          console.error("TNVED olishda xato:", err);
        }
      }

      setInitialRow(row);
    };

    loadData();
  }, [tnved]);

  const getOptions = (key) => {
    if (!apiData) return [];
    switch (key) {
      case "category":
        return apiData.data.category.map((c) => c.cat_name);
      case "color":
        return apiData.data.color.filter((c) => c !== "Boshqa");
      case "technical":
        return apiData.data.technical_regulations;
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

  return (
    initialRow && (
      <Formik
        initialValues={{ rows: [initialRow] }}
        enableReinitialize
        onSubmit={async (values) => {
          const promises = values.rows.map(async (row) => {
            if (
              !row.search.trim() ||
              !(row.color || row.manualColor.trim()) ||
              !row.category ||
              !row.brand ||
              !row.productType.trim() ||
              !row.target ||
              !row.modelType ||
              !row.technical ||
              !row.sizeType ||
              !row.size
            ) {
              throw new Error("Barcha qatorlarni to‘liq to‘ldiring!");
            }

            return saveOrUpdateDocument({
              tnved: row.search,
              productType: row.productType,
              category: row.category,
              color: row.manualColor.trim() ? row.manualColor : row.color,
              brand: row.brand,
              target: row.target,
              modelType: row.modelType,
              technical: row.technical,
              sizeType: row.sizeType,
              size: row.size,
            });
          });

          try {
            await Promise.all(promises);
            toast.success("Hamma qatorlar saqlandi!");
            navigate("uz/base/znak/chestny-znak", replace);
          } catch (err) {
            toast.error("Xatolik: " + err.message);
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Card
              sx={{
                maxWidth: 1200,
                mx: "auto",
                my: 4,
                p: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <BackButton
                onClick={() =>
                  navigate("/uz/base/znak/chestny-znak", { replace: true })
                }
              />

              {!isView && (
                <Grid display="flex" gap="10px">
                  <SaveButton
                    onClick={() =>
                      document.querySelector("form").requestSubmit()
                    }
                  />
                  <ComplectButton />
                </Grid>
              )}
            </Card>

            <FieldArray
              name="rows"
              render={(arrayHelpers) => (
                <>
                  {values.rows.map((row, index) => (
                    <Card
                      key={index}
                      sx={{
                        maxWidth: 1200,
                        mx: "auto",
                        mb: 4,
                        p: 2,
                      }}
                    >
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <InputPage
                            id={`tnved-${index}`}
                            label="TNVED"
                            type="number"
                            value={row.search}
                            disabled={true}
                            onChange={(e) =>
                              setFieldValue(
                                `rows[${index}].search`,
                                e.target.value.trim()
                              )
                            }
                          />
                        </Grid>

                        <Grid item>
                          <InputPage
                            id={`productType-${index}`}
                            label="Tovar nomi"
                            value={row.productType}
                            disabled={isView}
                            onChange={(e) =>
                              setFieldValue(
                                `rows[${index}].productType`,
                                e.target.value
                              )
                            }
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
                          <Grid key={key} item>
                            <FormControl size="small" sx={{ width: 200 }}>
                              <InputLabel>{label}</InputLabel>
                              <Select
                                label={label}
                                value={row[key]}
                                disabled={isView}
                                onChange={(e) =>
                                  setFieldValue(
                                    `rows[${index}].${key}`,
                                    e.target.value
                                  )
                                }
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

                        <Grid item>
                          {!row.manualColor && (
                            <FormControl size="small" sx={{ width: 200 }}>
                              <InputLabel>Rang</InputLabel>
                              <Select
                                label="Rang"
                                value={row.color}
                                disabled={isView}
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

                        <Grid item>
                          {!row.color && (
                            <InputPage
                              id={`manualColor-${index}`}
                              label="Qo‘lda Rang"
                              value={row.manualColor}
                              disabled={isView}
                              onChange={(e) => {
                                setFieldValue(
                                  `rows[${index}].manualColor`,
                                  e.target.value
                                );
                                if (e.target.value.trim()) {
                                  setFieldValue(`rows[${index}].color`, "");
                                }
                              }}
                            />
                          )}
                        </Grid>

                        {!isView && index !== 0 && (
                          <Grid item>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              O‘chirish
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    </Card>
                  ))}

                  {/* Add Row */}
                  {!isView && (
                    <Card
                      sx={{
                        maxWidth: 1200,
                        mx: "auto",
                        mb: 4,
                        p: 2,
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      <AddButton
                        onClick={() =>
                          arrayHelpers.push({
                            search: values.rows[0].search,
                            category: "",
                            brand: "",
                            productType: "",
                            target: "",
                            size: "",
                            sizeType: "",
                            color: "",
                            manualColor: "",
                            technical: "",
                            modelType: "",
                          })
                        }
                      />
                    </Card>
                  )}

                  <Card sx={{ maxWidth: 1230, mx: "auto", mb: 4 }}>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>TNVED</TableCell>
                            <TableCell>Tovar nomi</TableCell>
                            <TableCell>Kategoriya</TableCell>
                            <TableCell>Brend</TableCell>
                            <TableCell>Target</TableCell>
                            <TableCell>Tip modeli</TableCell>
                            <TableCell>Texnik reglament</TableCell>
                            <TableCell>Tip razmeri</TableCell>
                            <TableCell>Razmer</TableCell>
                            <TableCell>Rang</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {values.rows.map((row, idx) => (
                            <TableRow key={idx}>
                              <TableCell>{row.search || "-"}</TableCell>
                              <TableCell>{row.productType || "-"}</TableCell>
                              <TableCell>{row.category || "-"}</TableCell>
                              <TableCell>{row.brand || "-"}</TableCell>
                              <TableCell>{row.target || "-"}</TableCell>
                              <TableCell>{row.modelType || "-"}</TableCell>
                              <TableCell>{row.technical || "-"}</TableCell>
                              <TableCell>{row.sizeType || "-"}</TableCell>
                              <TableCell>{row.size || "-"}</TableCell>
                              <TableCell>
                                {row.color || row.manualColor || "-"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Card>
                </>
              )}
            />

            <ToastContainer position="top-right" autoClose={2000} />
          </Form>
        )}
      </Formik>
    )
  );
}
