import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  brandList: [],
  isLoading: false,
};

export const fetchAllBrands = createAsyncThunk("adminBrands/fetchAll", async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/brands/get`);
  return res.data;
});

export const addBrand = createAsyncThunk("adminBrands/add", async (payload) => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/brands/add`, payload);
  return res.data;
});

export const editBrand = createAsyncThunk("adminBrands/edit", async ({ id, payload }) => {
  const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/brands/edit/${id}`, payload);
  return res.data;
});

export const deleteBrand = createAsyncThunk("adminBrands/delete", async (id) => {
  const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/brands/delete/${id}`);
  return res.data;
});

const adminBrandsSlice = createSlice({
  name: "adminBrands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brandList = action.payload.data;
      })
      .addCase(fetchAllBrands.rejected, (state) => {
        state.isLoading = false;
        state.brandList = [];
      });
  },
});

export default adminBrandsSlice.reducer;