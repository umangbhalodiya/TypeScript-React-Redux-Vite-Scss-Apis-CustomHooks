import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";

export interface ArticleTypes {
  articles: Array<object>;
  loading: boolean;
}

const initialState: ArticleTypes = {
  articles: [],
  loading: false,
};

export interface Article {
  id: number;
  title: string;
  created_at: string;
  prompt: string;
  short_description: string;
  content: string;
  image_url: string;
}
// Define the response type as an array of articles
type ApiResponse = Article[];

interface ApiError {
  message: string;
}

export const fetchArticles = createAsyncThunk<
  ApiResponse,
  void,
  { rejectValue: ApiError }
>("/articalSlice/fetchArticles", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`api`);
    return response.data;
  } catch (e: any) {
    return rejectWithValue(e.response.data);
  }
});

export const articalSlice = createSlice({
  name: "articles",
  initialState: initialState,
  reducers: {
    setArticleStates: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, (state) => {
        if (state.articles?.length === 0) state.loading = true;
      })
      .addCase(
        fetchArticles.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.articles = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchArticles.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setArticleStates } = articalSlice.actions;
export default articalSlice.reducer;
