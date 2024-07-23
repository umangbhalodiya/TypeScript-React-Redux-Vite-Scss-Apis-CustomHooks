import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";

// Structure of the user object
interface User {
  username?: string;
  password?: string;
}

// Structure of the initial state
export interface InitialState {
  user: User;
  isLoggedIn: boolean;
  loading: boolean;
}

// Structure of the API response
interface ApiResponse {
  token: string;
  user_id: number;
}

interface ApiError {
  message: string;
}

// RequestBody represents the structure of the request body
interface RequestBody {
  username: string;
  password: string;
}

// Initial state
const initialState: InitialState = {
  user: { username: "", password: "" },
  isLoggedIn: false,
  loading: false,
};

export const login = createAsyncThunk<
  ApiResponse,
  RequestBody,
  { rejectValue: ApiError }
>("/authSlice/login", async (body: RequestBody, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`api/login/`, body);
    return response.data;
  } catch (e: any) {
    return rejectWithValue(e.response.data);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUserStates: (state, action: PayloadAction<Partial<InitialState>>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
        console.log("action.payload", action.payload);
        // Update the user state based on the response
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setUserStates } = authSlice.actions;
export default authSlice.reducer;
