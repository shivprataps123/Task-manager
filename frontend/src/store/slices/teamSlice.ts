import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getTeamsAPI } from '@/features/team/api';

interface Team {
    id: string;
    name: string;
    description?: string;
}

interface TeamState {
    teams: Team[];
    currentTeam: Team | null;
    loading: boolean;
    error: string | null;
}

const initialState: TeamState = {
    teams: [],
    currentTeam: null,
    loading: false,
    error: null,
};

export const fetchTeams = createAsyncThunk(
    'team/fetchTeams',
    async () => {
        const response = await getTeamsAPI();
        return response.data.data;
    }
);

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        setTeams: (state, action: PayloadAction<Team[]>) => {
            state.teams = action.payload;
            state.loading = false;
            state.error = null;
        },
        setCurrentTeam: (state, action: PayloadAction<Team | null>) => {
            state.currentTeam = action.payload;
        },
        addTeam: (state, action: PayloadAction<Team>) => {
            state.teams.push(action.payload);
        },
        updateTeam: (state, action: PayloadAction<Team>) => {
            const index = state.teams.findIndex(team => team.id === action.payload.id);
            if (index !== -1) {
                state.teams[index] = action.payload;
            }
            if (state.currentTeam?.id === action.payload.id) {
                state.currentTeam = action.payload;
            }
        },
        removeTeam: (state, action: PayloadAction<string>) => {
            state.teams = state.teams.filter(team => team.id !== action.payload);
            if (state.currentTeam?.id === action.payload) {
                state.currentTeam = null;
            }
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
            .addCase(fetchTeams.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTeams.fulfilled, (state, action) => {
                state.loading = false;
                state.teams = action.payload;
            })
            .addCase(fetchTeams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch teams';
            });
    },
});

export const {
    setTeams,
    setCurrentTeam,
    addTeam,
    updateTeam,
    removeTeam,
    setLoading,
    setError,
    clearError,
} = teamSlice.actions;

export default teamSlice.reducer;
