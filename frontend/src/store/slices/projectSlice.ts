import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getProjectsAPI, createProjectAPI } from '@/features/project/api';

interface Project {
    id: string;
    name: string;
    description?: string;
}

interface ProjectState {
    projects: Project[];
    currentProject: Project | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProjectState = {
    projects: [],
    currentProject: null,
    loading: false,
    error: null,
};

export const fetchProjects = createAsyncThunk(
    'project/fetchProjects',
    async () => {
        const response = await getProjectsAPI();
        return response.data.data;
    }
);

export const createProject = createAsyncThunk(
    'project/createProject',
    async (projectData: Partial<Project>) => {
        const response = await createProjectAPI(projectData);
        return response.data.data;
    }
);

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<Project[]>) => {
            state.projects = action.payload;
            state.loading = false;
            state.error = null;
        },
        setCurrentProject: (state, action: PayloadAction<Project | null>) => {
            state.currentProject = action.payload;
        },
        addProject: (state, action: PayloadAction<Project>) => {
            state.projects.push(action.payload);
        },
        updateProject: (state, action: PayloadAction<Project>) => {
            const index = state.projects.findIndex(project => project.id === action.payload.id);
            if (index !== -1) {
                state.projects[index] = action.payload;
            }
            if (state.currentProject?.id === action.payload.id) {
                state.currentProject = action.payload;
            }
        },
        removeProject: (state, action: PayloadAction<string>) => {
            state.projects = state.projects.filter(project => project.id !== action.payload);
            if (state.currentProject?.id === action.payload) {
                state.currentProject = null;
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
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch projects';
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.projects.push(action.payload);
            });
    },
});

export const {
    setProjects,
    setCurrentProject,
    addProject,
    updateProject,
    removeProject,
    setLoading,
    setError,
    clearError,
} = projectSlice.actions;

export default projectSlice.reducer;
