import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import postSlice from './postSlice';
import socketSlice from "./socketSlice";
import chatSlice from "./chatSlice";
import rtnSlice from "./rtnSlice";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['socketio'],  // Exclude the socket slice from being persisted
};

const rootReducer = combineReducers({
    auth: authSlice,
    post: postSlice,
    socketio: socketSlice,
    chat: chatSlice,
    realTimeNotification: rtnSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                ignoredPaths: ['socketio.socket'],  // Ignore the socket path for serializability checks
            },
        }),
});

export default store;
