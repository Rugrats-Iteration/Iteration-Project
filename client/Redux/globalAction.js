import fetcher from "../lib/fetcher.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

const globalAsyncThunk = createAsyncThunk(
  "fetcher",
  async (payload, thunkAPI) => {
    const { url, ...rest } = payload;

    console.log(payload, "what the heck lmao");

    try {
      const response = await fetcher(
        payload.url,
        Object.keys(rest).length < 1 ? undefined : rest
      );
      return response;
    } catch (error) {
      console.log(error, "welp that went wrong");
    }
  }
);

export default globalAsyncThunk;
