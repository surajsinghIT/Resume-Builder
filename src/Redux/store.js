// Redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage for web
import resumeReducer from "./slice/userSlice"; // Adjust the path as needed

// Persist configuration
const persistConfig = {
  key: "resume", // Storage key name
  storage,
  whitelist: ["resumeForDashboard", "downloadPdfCount"], // Only persist these fields
  // This ensures resumeData and currentEditingResumeId are NOT persisted (fresh on each session)
};

// Create a persisted reducer
const persistedResumeReducer = persistReducer(persistConfig, resumeReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: {
    resume: persistedResumeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);