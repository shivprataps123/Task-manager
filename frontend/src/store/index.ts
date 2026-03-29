import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import storageImport from 'redux-persist/lib/storage';

const storage = storageImport?.default || storageImport;
// reducers
import authReducer from './slices/authSlice';
import teamReducer from './slices/teamSlice';
import taskReducer from './slices/taskSlice';
import projectReducer from './slices/projectSlice';
import activityReducer from './slices/activitySlice';
import commentReducer from './slices/commentSlice';
import teamMemberReducer from './slices/teamMemberSlice';
import teamInviteReducer from './slices/teamInviteSlice';
import labelReducer from './slices/labelSlice';

// 1. Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    team: teamReducer,
    task: taskReducer,
    project: projectReducer,
    activity: activityReducer,
    comment: commentReducer,
    teamMember: teamMemberReducer,
    teamInvite: teamInviteReducer,
    label: labelReducer,
});
// 2. Persist config (whitelist only auth)
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // only auth will be persisted
};

// 3. Wrap root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Create store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // required for redux-persist
        }),
});

// 5. Create persistor
export const persistor = persistStore(store);

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;