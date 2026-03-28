import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createInviteAPI, joinTeamAPI } from '@/features/teamInvite/api';

interface TeamInvite {
    id: string;
    email: string;
    teamId: string;
    inviteCode: string;
    status: string;
}

interface TeamInviteState {
    invites: TeamInvite[];
    loading: boolean;
    error: string | null;
}

const initialState: TeamInviteState = {
    invites: [],
    loading: false,
    error: null,
};

export const createInvite = createAsyncThunk(
    'teamInvite/createInvite',
    async (data: { email: string; teamId: string }) => {
        const response = await createInviteAPI(data);
        return response.data.data;
    }
);

export const joinTeam = createAsyncThunk(
    'teamInvite/joinTeam',
    async (data: { inviteCode: string }) => {
        const response = await joinTeamAPI(data);
        return response.data.data;
    }
);

const teamInviteSlice = createSlice({
    name: 'teamInvite',
    initialState,
    reducers: {
        setInvites: (state, action: PayloadAction<TeamInvite[]>) => {
            state.invites = action.payload;
            state.loading = false;
            state.error = null;
        },
        addInvite: (state, action: PayloadAction<TeamInvite>) => {
            state.invites.push(action.payload);
        },
        removeInvite: (state, action: PayloadAction<string>) => {
            state.invites = state.invites.filter(invite => invite.id !== action.payload);
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
            .addCase(createInvite.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createInvite.fulfilled, (state, action) => {
                state.loading = false;
                state.invites.push(action.payload);
            })
            .addCase(createInvite.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create invite';
            })
            .addCase(joinTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(joinTeam.fulfilled, (state) => {
                state.loading = false;
                // Handle successful join
            })
            .addCase(joinTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to join team';
            });
    },
});

export const {
    setInvites,
    addInvite,
    removeInvite,
    setLoading,
    setError,
    clearError,
} = teamInviteSlice.actions;

export default teamInviteSlice.reducer;
