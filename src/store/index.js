import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk'
// import AsyncStorage from '@react-native-async-storage/async-storage';

import reducer from './rootReducer'

const persistConfig = {
  key: 'root',
  storage
}
const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer, applyMiddleware(thunk))
const persistor = persistStore(store)

export {
  store,
  persistor
}

/*
REDUX-THUNK:
1. To pass the realtime updates data from action to reducer.
2. To call the API from the action
*/