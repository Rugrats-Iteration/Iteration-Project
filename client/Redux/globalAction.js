import fetcher from "../lib/fetcher.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

const globalAsyncThunk = createAsyncThunk(
  "fetcher",
  async (payload, thunkAPI) => {
    const { url, ...rest } = payload;
    const response = await fetcher(
      payload.url,
      rest === JSON.stringify({}) ? undefined : rest
    );
    return response;
  }
);

export default globalAsyncThunk;
