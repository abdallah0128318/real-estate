import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from '../state_slices/userSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist'

// Here I will combine all state slice reducers into a single reducer using 'combineReducers()' function 
const rootReducer = combineReducers({user: userReducer})

// Storage is loacalStorage by default
const persistConfig = {
  key: "root",
  storage,
  version: 1,
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create redux store using persistedReducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware)=> [...getDefaultMiddleware({serializableCheck: false})]
})

// Create a persistor to manage or control the persistence layer
export const persistor = persistStore(store)