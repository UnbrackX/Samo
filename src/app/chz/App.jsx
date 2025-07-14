// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./index";
import FormikTable from "./formik";
import AddPage from "./addDocument/addDocument";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/edit/:id" element={<FormikTable />} />
      <Route path="/chz" element={<FormikTable isEdit={true} />} />
      <Route path="/add" element={<AddPage />}></Route>
      <Route path="/view/:id" element={<FormikTable />} />
    </Routes>
  );
}
