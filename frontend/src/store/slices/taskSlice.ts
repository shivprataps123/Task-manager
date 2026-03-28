import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getTasksAPI, createTaskAPI, updateTaskAPI, deleteTaskAPI, assignTaskAPI } from '@/features/task/api';

interface Task {
    id: string;
    title: string;
    description?: string;
    status: string;
    priority?: string;
    projectId?: string;
    assigneeId?: string;
}

interface TaskState {
    tasks: Task[];
    currentTask: Task | null;
    loading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    currentTask: null,
    loading: false,
    error: null,
};

export const fetchTasks = createAsyncThunk(
    'task/fetchTasks',
    async () => {
        const response = await getTasksAPI();
        return response.data.data;
    }
);

export const createTask = createAsyncThunk(
    'task/createTask',
    async (taskData: Partial<Task>) => {
        const response = await createTaskAPI(taskData);
        return response.data.data;
    }
);

export const updateTask = createAsyncThunk(
    'task/updateTask',
    async ({ id, data }: { id: string; data: Partial<Task> }) => {
        const response = await updateTaskAPI(id, data);
        return response.data.data;
    }
);

export const deleteTask = createAsyncThunk(
    'task/deleteTask',
    async (id: string) => {
        await deleteTaskAPI(id);
        return id;
    }
);

export const assignTask = createAsyncThunk(
    'task/assignTask',
    async ({ id, data }: { id: string; data: { assigneeId: string } }) => {
        const response = await assignTaskAPI(id, data);
        return response.data.data;
    }
);

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
            state.loading = false;
            state.error = null;
        },
        setCurrentTask: (state, action: PayloadAction<Task | null>) => {
            state.currentTask = action.payload;
        },
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        updateTaskAction: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
            if (state.currentTask?.id === action.payload.id) {
                state.currentTask = action.payload;
            }
        },
        removeTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
            if (state.currentTask?.id === action.payload) {
                state.currentTask = null;
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
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch tasks';
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
                if (state.currentTask?.id === action.payload.id) {
                    state.currentTask = action.payload;
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
                if (state.currentTask?.id === action.payload) {
                    state.currentTask = null;
                }
            })
            .addCase(assignTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
                if (state.currentTask?.id === action.payload.id) {
                    state.currentTask = action.payload;
                }
            });
    },
});

export const {
    setTasks,
    setCurrentTask,
    addTask,
    updateTaskAction,
    removeTask,
    setLoading,
    setError,
    clearError,
} = taskSlice.actions;

export default taskSlice.reducer;
