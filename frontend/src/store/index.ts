import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import teamReducer from './slices/teamSlice';
import taskReducer from './slices/taskSlice';
import projectReducer from './slices/projectSlice';
import activityReducer from './slices/activitySlice';
import commentReducer from './slices/commentSlice';
import teamMemberReducer from './slices/teamMemberSlice';
import teamInviteReducer from './slices/teamInviteSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        team: teamReducer,
        task: taskReducer,
        project: projectReducer,
        activity: activityReducer,
        comment: commentReducer,
        teamMember: teamMemberReducer,
        teamInvite: teamInviteReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
