import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchName: "",
  searchTvend: "",
  searchDate: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchName(state, action) {
      state.searchName = action.payload;
    },
    setSearchTvend(state, action) {
      state.searchTvend = action.payload;
    },
    setSearchDate(state, action) {
      state.searchDate = action.payload;
    },
    clearFilters(state) {
      state.searchName = "";
      state.searchTvend = "";
      state.searchDate = "";
    },
  },
});

export const { setSearchName, setSearchTvend, setSearchDate, clearFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
