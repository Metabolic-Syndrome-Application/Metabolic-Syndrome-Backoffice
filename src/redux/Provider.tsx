'use client';

import store, { persistor } from '@/redux/store';
import { Loader } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

// let persistor = persistStore(store);

function ReduxProvider({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>

  );
}

export default ReduxProvider;
