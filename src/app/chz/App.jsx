import { Routes, Route } from "react-router-dom";
import IndexPage from "./index";
import FormikTable from "./formik";
import AddPage from "./addDocument/addDocument";
export default function App() {
  return (
    <Routes>
      <Route path="/uz/base/znak/chestny-znak" element={<IndexPage />} />
      <Route
        path="/uz/base/znak/chestny-znak/edit/:id"
        element={<FormikTable isView={false} />}
      />
      <Route path="/uz/base/znak/chestny-znak/add" element={<AddPage />} />
      <Route
        path="/uz/base/znak/chestny-znak/view/:id"
        element={<FormikTable isView={true} />}
      />
    </Routes>
  );
}
