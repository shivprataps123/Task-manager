import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getActivitiesAPI } from '@/features/activity/api';

interface Activity {
    id: string;
    action: string;
    userId: string;
    projectId?: string;
    taskId?: string;
    createdAt: string;
}

interface ActivityState {
    activities: Activity[];
    loading: boolean;
    error: string | null;
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    } | null;
}

const initialState: ActivityState = {
    activities: [],
    loading: false,
    error: null,
    pagination: null,
};

export const fetchActivities = createAsyncThunk(
    'activity/fetchActivities',
    async ({ teamId, page, limit }: { teamId?: string; page?: number; limit?: number } = {}) => {
        const response = await getActivitiesAPI(teamId, page, limit);
        return response.data.data;
    }
);

const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        setActivities: (state, action: PayloadAction<{ activities: Activity[]; pagination: { total: number; page: number; limit: number; totalPages: number } }>) => {
            state.activities = action.payload.activities;
            state.pagination = action.payload.pagination;
            state.loading = false;
            state.error = null;
        },
        addActivity: (state, action: PayloadAction<Activity>) => {
            state.activities.unshift(action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchActivities.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchActivities.fulfilled, (state, action) => {
                state.loading = false;
                state.activities = action.payload.activities;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchActivities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch activities';
            });
    },
});

export const {
    setActivities,
    addActivity,
    setLoading,
    setError,
    clearError,
} = activitySlice.actions;

export default activitySlice.reducer;
