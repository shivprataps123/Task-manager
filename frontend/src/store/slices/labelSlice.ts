import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createLabelAPI, getLabelsAPI, updateLabelAPI, deleteLabelAPI, addLabelToTaskAPI, removeLabelFromTaskAPI } from '@/features/label/api';

interface Label {
    id: string;
    name: string;
    color: string;
    projectId: string;
}

interface LabelState {
    labels: Label[];
    loading: boolean;
    error: string | null;
}

const initialState: LabelState = {
    labels: [],
    loading: false,
    error: null,
};

export const fetchLabels = createAsyncThunk(
    'label/fetchLabels',
    async (projectId: string) => {
        const response = await getLabelsAPI(projectId);
        return response.data.data;
    }
);

export const createLabel = createAsyncThunk(
    'label/createLabel',
    async (labelData: Partial<Label>) => {
        const response = await createLabelAPI(labelData);
        return response.data.data;
    }
);

export const updateLabel = createAsyncThunk(
    'label/updateLabel',
    async ({ id, data }: { id: string; data: Partial<Label> }) => {
        const response = await updateLabelAPI(id, data);
        return response.data.data;
    }
);

export const deleteLabel = createAsyncThunk(
    'label/deleteLabel',
    async (id: string) => {
        await deleteLabelAPI(id);
        return id;
    }
);

export const addLabelToTask = createAsyncThunk(
    'label/addLabelToTask',
    async ({ taskId, labelId }: { taskId: string; labelId: string }) => {
        const response = await addLabelToTaskAPI(taskId, labelId);
        return response.data.data;
    }
);

export const removeLabelFromTask = createAsyncThunk(
    'label/removeLabelFromTask',
    async ({ taskId, labelId }: { taskId: string; labelId: string }) => {
        await removeLabelFromTaskAPI(taskId, labelId);
        return { taskId, labelId };
    }
);

const labelSlice = createSlice({
    name: 'label',
    initialState,
    reducers: {
        setLabels: (state, action: PayloadAction<Label[]>) => {
            state.labels = action.payload;
            state.loading = false;
            state.error = null;
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
            .addCase(fetchLabels.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLabels.fulfilled, (state, action) => {
                state.loading = false;
                state.labels = action.payload;
            })
            .addCase(fetchLabels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch labels';
            })
            .addCase(createLabel.fulfilled, (state, action) => {
                state.labels.push(action.payload);
            })
            .addCase(updateLabel.fulfilled, (state, action) => {
                const index = state.labels.findIndex(label => label.id === action.payload.id);
                if (index !== -1) {
                    state.labels[index] = action.payload;
                }
            })
            .addCase(deleteLabel.fulfilled, (state, action) => {
                state.labels = state.labels.filter(label => label.id !== action.payload);
            });
    },
});

export const {
    setLabels,
    setLoading,
    setError,
    clearError,
} = labelSlice.actions;

export default labelSlice.reducer;
