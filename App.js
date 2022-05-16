import React from 'react'

import AsyncStorage from '@react-native-community/async-storage'
import { AppearanceProvider } from 'react-native-appearance';

import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import rootReducer from './reducers/rootReducer'

import Tab from './components/Tab'

const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
  whitelist: ['moon','preference']
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistedStore = persistStore(store);

export default function App() {
  return (
      <AppearanceProvider>
        <Provider store={store}>
          <PersistGate persistor={persistedStore} loading={null}>
            <Tab/>
          </PersistGate>
        </Provider>
      </AppearanceProvider>
    )
}
