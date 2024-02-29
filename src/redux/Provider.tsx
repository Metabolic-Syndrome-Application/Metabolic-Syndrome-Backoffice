'use client';

import Loading from '@/app/loading';
import store, { persistor } from '@/redux/store';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// let persistor = persistStore(store);

function ReduxProvider({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>

  );
}

export default ReduxProvider;
