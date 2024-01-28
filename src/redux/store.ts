import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import profileSlice from '@/redux/slices/profileSlice';
import usersSlice from '@/redux/slices/usersSlice';

const rootReducer = combineReducers({
  users: usersSlice,
  user: profileSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['language'], // whitelist: ['language']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//const middleware = (getDefaultMiddleware: () => any) => getDefaultMiddleware();

const middleware = (
  getDefaultMiddleware: (arg0: { serializableCheck: boolean }) => any
) =>
  getDefaultMiddleware({
    serializableCheck: false,
  });

const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch();

export const persistor = persistStore(store);

export default store;
