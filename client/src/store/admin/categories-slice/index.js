import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categoryList: [],
  isLoading: false,
};

// ===== Thunks =====
export const fetchAllCategories = createAsyncThunk(
  "adminCategories/fetchAll",
  async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/categories/get`);
    return res.data;
  }
);

export const addCategory = createAsyncThunk(
  "adminCategories/add",
  async (payload) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/categories/add`, payload);
    return res.data;
  }
);

export const editCategory = createAsyncThunk(
  "adminCategories/edit",
  async ({ id, payload }) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/categories/edit/${id}`, payload);
    return res.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "adminCategories/delete",
  async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/categories/delete/${id}`);
    return res.data;
  }
);

const adminCategoriesSlice = createSlice({
  name: "adminCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = action.payload.data;
      })
      .addCase(fetchAllCategories.rejected, (state) => {
        state.isLoading = false;
        state.categoryList = [];
      });
  },
});

export default adminCategoriesSlice.reducer;