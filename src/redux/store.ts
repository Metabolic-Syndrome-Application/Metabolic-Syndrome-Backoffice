// !fix redux-persist failed to create sync storage. falling back to noop storage
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import dailyChallengesSlice from '@/redux/slices/dailyChallengesSlice';
import doctorSlice from '@/redux/slices/doctorSlice';
import patientsSlice from '@/redux/slices/patientsSlice';
import plansSlice from '@/redux/slices/plansSlice';
import profileSlice from '@/redux/slices/profileSlice';
import quizsSlice from '@/redux/slices/quizsSlice';
import recordHealthsSlice from '@/redux/slices/recordHealthsSlice';
import usersSlice from '@/redux/slices/usersSlice';

const createNoopStorage = () => {
  return {
    getItem(_key: unknown) {
      return Promise.resolve(null);
    },
    setItem(_key: unknown, value: unknown) {
      return Promise.resolve(value);
    },
    removeItem(_key: unknown) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage: storage,
  //blacklist: ['language'], // whitelist: ['language']
};

const rootReducer = combineReducers({
  users: usersSlice,
  user: profileSlice,
  plan: plansSlice,
  quiz: quizsSlice,
  daily: dailyChallengesSlice,
  record: recordHealthsSlice,
  patients: patientsSlice,
  doctors: doctorSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const middleware = (
//   getDefaultMiddleware: (arg0: { serializableCheck: boolean }) => any
// ) =>
//   getDefaultMiddleware({
//     serializableCheck: false,
//   });

const store = configureStore({
  reducer: persistedReducer,
  middleware: (MiddlewareArray) =>
    MiddlewareArray({
      serializableCheck: false,
      thunk: true,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch();

export default store;
