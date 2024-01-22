import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PATIENT } from "src/components/Constant/constant";
import service from "src/services/service";

export const doAuth = createAsyncThunk(
  "auth/doAuth",
  async (credentials) => {

    try {
      const fetchedusers = await service.get("users");

      if (Array.isArray(fetchedusers)) {
        const authenticatedUser = fetchedusers.find((user) => {
          // if (loginType === PATIENT) {
          //   return (
          //     user.username === credentials.username &&
          //     user.email === credentials.email &&
          //     user.dob === credentials.dob &&
          //     user.contact === credentials.contact
          //   );
          // }

          return (
            user.password === credentials.password &&
            user.email === credentials.email
          );
        });
  
        if (authenticatedUser) {
          return authenticatedUser;
        } else {
          return null;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  selectors: {
    getUserRole: (state) => (state.user ? state.user.userrole : null),
    isAuthenticated: (state) => state.isAuthenticated,
    getUserData: (state) => state.user,
  },
  extraReducers: (builder) => {
    builder.addCase(doAuth.fulfilled, (state, { payload }) => {
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        error: null,
        isAuthenticated: true,
        user: payload,
      };
    });
    builder.addCase(doAuth.rejected, (state, { payload }) => ({
      ...state,
      error: payload,
      isAuthenticated: false,
      user: null,
    }));
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const authSelector = authSlice.selectors;
