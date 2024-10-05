import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import authReducer from './authSlice'; // Import your auth reducer
// import chatReducer from './chatsSlice'
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Specify which reducers you want to persist
  // Optionally, you can blacklist certain reducers
  // blacklist: ['someReducer'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    // chat:chatReducer
    // Add other reducers here as needed
  },
  // Add middleware, enhancers, etc. as needed
});

export const persistor = persistStore(store);

export default store;
