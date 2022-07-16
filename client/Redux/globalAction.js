import fetcher from "../lib/fetcher.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

const globalAsyncThunk = createAsyncThunk(
  "fetcher",
  async (payload, thunkAPI) => {
    const response = await fetcher(payload.url, payload);
    console.log(response, "signup response");
    return response;
  }
);

export default globalAsyncThunk;
