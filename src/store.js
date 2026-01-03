// ...existing code...
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
// ...existing code...