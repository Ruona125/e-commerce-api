// store.js

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import checkTokenExpirationMiddleware from '../middleware/checkTokenExpiration';
import cartReducer from "./cartSlice"
const middleware = [
    ...getDefaultMiddleware(),
    checkTokenExpirationMiddleware, // Add your middleware
  ];

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, authReducer, cartReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    cart: cartReducer
  },
  middleware:  (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false
  }),
});

export const persistor = persistStore(store);