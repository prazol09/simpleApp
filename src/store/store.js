import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import registerReducer from './registerSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
  },
});
