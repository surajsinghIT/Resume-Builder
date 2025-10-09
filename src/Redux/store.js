// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './slice/userSlice';

// export const store = configureStore({
//   reducer: {
//     counter: userReducer,
//   },
// });



import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import resumeReducer from './slice/userSlice';

const persistConfig = {
  key: 'resume',
  storage,
  whitelist: ['resumeData'] // only persist resumeData
};

const persistedReducer = persistReducer(persistConfig, resumeReducer);

export const store = configureStore({
  reducer: {
    resume: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);