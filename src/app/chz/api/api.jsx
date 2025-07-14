import axios from "axios";

// === data resource ===
export const dataApiClient = axios.create({
  baseURL: "https://6866a09589803950dbb36624.mockapi.io/data",
  withCredentials: false,
});

export const fetchDataList = async () => {
  const res = await dataApiClient.get("/");
  return res.data;
};

export const fetchDataItemById = async (id) => {
  const res = await dataApiClient.get(`/${id}`);
  return res.data;
};

export const createDataItem = async (payload) => {
  const res = await dataApiClient.post("/", payload);
  return res.data;
};

export const updateDataItem = async (id, payload) => {
  const res = await dataApiClient.put(`/${id}`, payload);
  return res.data;
};

export const deleteDataItem = async (id) => {
  const res = await dataApiClient.delete(`/${id}`);
  return res.data;
};

// === dsadad resource ===
export const dsadadApiClient = axios.create({
  baseURL: "https://6866a09589803950dbb36624.mockapi.io/dsadad",
  withCredentials: false,
});

export const fetchDsadadList = async () => {
  const res = await dsadadApiClient.get("/");
  return res.data;
};

export const fetchDsadadItemById = async (id) => {
  const response = await dsadadApiClient.get("/");
  const items = response.data[0]?.data?.items || [];
  return items.find((i) => i.id === id);
};

export const createDsadadItem = async (payload) => {
  const res = await dsadadApiClient.post("/", payload);
  return res.data;
};

export const updateDsadadItem = async (id, payload) => {
  const res = await dsadadApiClient.put(`/${id}`, payload);
  return res.data;
};

export const deleteDsadadItem = async (id) => {
  const res = await dsadadApiClient.delete(`/${id}`);
  return res.data;
};

// SAVE DACUMENT
export const saveDocumentApiClient = axios.create({
  baseURL: "https://6870e5f07ca4d06b34b88ced.mockapi.io",
  withCredentials: false,
});

export const getDocumentByTnved = async (tnved) => {
  const res = await saveDocumentApiClient.get(`/save_document?tnved=${tnved}`);
  return res.data;
};

export const createSaveDocument = async (payload) => {
  console.log("Yuborilmoqda:", payload);
  const res = await saveDocumentApiClient.post("/save_document", payload);
  console.log("Server javobi:", res.data);
  return res.data;
};

export const updateSaveDocument = async (id, payload) => {
  console.log("Yangilanmoqda:", payload);
  const res = await saveDocumentApiClient.put(`/save_document/${id}`, payload);
  console.log("Yangilandi:", res.data);
  return res.data;
};

export const saveOrUpdateDocument = async (payload) => {
  const existing = await getDocumentByTnved(payload.tnved);
  if (existing.length > 0) {
    return updateSaveDocument(existing[0].id, payload);
  } else {
    return createSaveDocument(payload);
  }
};
