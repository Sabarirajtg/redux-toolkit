import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  quote: null,
};

const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setQuote: (state, action) => {
      state.quote = action.payload;
    },
    resetState: () => initialState,
  },
});

const fetchRandomQuote = createAsyncThunk(
  "quotes/fetchRandomQuote",
  async (_, { dispatch }) => {
    try {
      dispatch(quotesSlice.actions.setLoading(true));
      dispatch(quotesSlice.actions.setError(null));

      const response = await axios.get("https://api.quotable.io/random");
      console.log(response);
      dispatch(quotesSlice.actions.setQuote(response.data));
    } catch (error) {
      dispatch(quotesSlice.actions.setError(error.message));
    } finally {
      dispatch(quotesSlice.actions.setLoading(false));
    }
  }
);

export { fetchRandomQuote };
export const { resetState } = quotesSlice.actions;
export default quotesSlice.reducer;
