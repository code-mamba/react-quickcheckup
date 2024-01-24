import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "src/services/service";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const fetchallusers = await service.get("users");

    return fetchallusers;
  } catch (e) {
    console.log(e);
  }
});

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId) => {
    try {
      const user = await service.get("users", userId);

      return user;

    } catch (e) {
      console.log(e);
    }
  }
);
export const addUser = createAsyncThunk("users.addUser", async (data) => {
  try {
    const user = await service.post("users", data);
    return user;
  } catch (e) {
    console.log(e);
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: null,
    selectedUser: null,
    error: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  selectors: {
    getUsers: (state) => state.users,
    getUser: (state) => state.selectedUser,
    getDoctors: (state) =>
      state.users
        ? state.users.filter((user) => user.userrole === "Doctor")
        : null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => ({
      ...state,
      error: null,
      users: payload,
    }));
    builder.addCase(fetchUsers.rejected, (state, { payload }) => ({
      ...state,
      error: payload,
      users: null,
    }));
    builder.addCase(fetchUserById.fulfilled, (state, { payload }) => ({
      ...state,
      error: null,
      selectedUser: payload,
    }));
    builder.addCase(fetchUserById.rejected, (state, { payload }) => ({
      ...state,
      error: payload,
      selectedUser: null,
    }));
    builder.addCase(addUser.fulfilled, (state, { payload }) => ({
      ...state,
      error: null,
      selectedUser: payload,
    }));
    builder.addCase(addUser.rejected, (state, { error }) => ({
      ...state,
      error: error.message,
      selectedUser: null,
    }));
  },
});

export const { setUsers, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
export const userSelector = userSlice.selectors;
