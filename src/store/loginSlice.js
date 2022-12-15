import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: 0,
  users: [],
  usernameWarning: '',
  username: '',
  password: '',
  passwordWarning: '',
};

export const loginSlice = createSlice({
  name: 'login', // name of the slice
  initialState,
  reducers: {
    handleLogin: (state, isLoggedIn) => {
      state.isLoggedIn = isLoggedIn.payload;
    },
    handleUsername: (state, username) => {
      state.username = username.payload;
    },
    handlePassword: (state, password) => {
      state.password = password.payload;
    },
    handleUsers: (state, userArr) => {
      state.users = userArr.payload;
    },
    handleUsernameWarning: (state, usernameWarning) => {
      // val.payload.length < 3
      //   ? (state.usernameWarning = 'username too short')
      //   : (state.usernameWarning = '');
      state.usernameWarning = usernameWarning.payload;
    },
    handlePasswordWarning: (state, passwordWarning) => {
      state.passwordWarning = passwordWarning.payload;
    },
    logIn: (state) => {
      state.isLoggedIn = 1;
      console.log('user is logged in yo');
    },
    logOut: (state) => {
      state.isLoggedIn = 0;
      console.log('user is logged out yo');
    },
  },
});

export const {
  handleUsername,
  handlePassword,
  handleUsernameWarning,
  handlePasswordWarning,
  handleUsers,
  handleLogin,
  logIn,
  logOut,
} = loginSlice.actions;

export default loginSlice.reducer;
