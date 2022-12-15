import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  username_status: '',
  full_name: '',
  full_name_status: '',
  email: '',
  email_status: '',
  password: '',
  pw1: '', // first password
  pw2: '', // confirm password
  passwords_status: '',
  reg_status: '',
};

export const registerSlice = createSlice({
  name: 'register', // name of the slice
  initialState,
  reducers: {
    handleUsername: (state, username) => {
      state.username = username.payload;
    },
    usernameStatus: (state, username_status) => {
      state.username_status = username_status.payload;
    },
    handlePassword: (state, password) => {
      state.password = password.payload;
    },
    handlePw1: (state, pw1) => {
      state.pw1 = pw1.payload;
    },
    handlePw2: (state, pw2) => {
      state.pw2 = pw2.payload;
    },
    handleFullName: (state, full_name) => {
      state.full_name = full_name.payload;
    },
    fullNameStatus: (state, full_name_status) => {
      state.full_name_status = full_name_status.payload;
    },
    handleEmail: (state, email) => {
      state.email = email.payload;
    },
    emailStatus: (state, email_status) => {
      state.email_status = email_status.payload;
    },
    passwordsStatus: (state, passwords_status) => {
      state.passwords_status = passwords_status.payload;
    },
    register: (state) => {
      console.log(state.username);
      console.log(state.full_name);
      console.log(state.email);
      console.log(state.password);
    },
    regStatus: (state, reg_status) => {
      state.reg_status = reg_status.payload;
      console.log(`state updated!!: ${state.reg_status}`);
    },
  },
});

export const {
  handleUsername,
  usernameStatus,
  handleFullName,
  fullNameStatus,
  handleEmail,
  emailStatus,
  handlePassword,
  handlePw1,
  handlePw2,
  passwordsStatus,
  register,
  regStatus,
} = registerSlice.actions;

export default registerSlice.reducer;
