import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getMembersAPI, addMemberAPI } from '@/features/team/api';

interface TeamMember {
    id: string;
    userId: string;
    teamId: string;
    role: string;
    user: {
        id: string;
        email: string;
    };
}

interface TeamMemberState {
    members: TeamMember[];
    loading: boolean;
    error: string | null;
}

const initialState: TeamMemberState = {
    members: [],
    loading: false,
    error: null,
};

export const fetchTeamMembers = createAsyncThunk(
    'teamMember/fetchTeamMembers',
    async (teamId: string) => {
        const response = await getMembersAPI(teamId);
        return response.data.data;
    }
);

export const addTeamMember = createAsyncThunk(
    'teamMember/addTeamMember',
    async ({ teamId, data }: { teamId: string; data: { email: string; role: string } }) => {
        const response = await addMemberAPI(teamId, data);
        return response.data.data;
    }
);

const teamMemberSlice = createSlice({
    name: 'teamMember',
    initialState,
    reducers: {
        setMembers: (state, action: PayloadAction<TeamMember[]>) => {
            state.members = action.payload;
            state.loading = false;
            state.error = null;
        },
        addMember: (state, action: PayloadAction<TeamMember>) => {
            state.members.push(action.payload);
        },
        removeMember: (state, action: PayloadAction<string>) => {
            state.members = state.members.filter(member => member.id !== action.payload);
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
            .addCase(fetchTeamMembers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTeamMembers.fulfilled, (state, action) => {
                state.loading = false;
                state.members = action.payload;
            })
            .addCase(fetchTeamMembers.rejected, (state, action) => {
                state.loading = false;
                state.members = [];
                state.error = action.error.message || 'Failed to fetch team members';
            })
            .addCase(addTeamMember.fulfilled, (state, action) => {
                state.members.push(action.payload);
            });
    },
});

export const {
    setMembers,
    addMember,
    removeMember,
    setLoading,
    setError,
    clearError,
} = teamMemberSlice.actions;

export default teamMemberSlice.reducer;
