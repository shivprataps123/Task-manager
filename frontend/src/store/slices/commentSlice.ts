import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getCommentsAPI, createCommentAPI } from '@/features/comment/api';

interface Comment {
    id: string;
    content: string;
    taskId: string;
    userId: string;
    createdAt: string;
}

interface CommentState {
    comments: Comment[];
    loading: boolean;
    error: string | null;
}

const initialState: CommentState = {
    comments: [],
    loading: false,
    error: null,
};

export const fetchComments = createAsyncThunk(
    'comment/fetchComments',
    async (taskId: string) => {
        const response = await getCommentsAPI(taskId);
        return response.data.data;
    }
);

export const createComment = createAsyncThunk(
    'comment/createComment',
    async (commentData: Partial<Comment>) => {
        const response = await createCommentAPI(commentData);
        return response.data.data;
    }
);

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        setComments: (state, action: PayloadAction<Comment[]>) => {
            state.comments = action.payload;
            state.loading = false;
            state.error = null;
        },
        addComment: (state, action: PayloadAction<Comment>) => {
            state.comments.push(action.payload);
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
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch comments';
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.comments.push(action.payload);
            });
    },
});

export const {
    setComments,
    addComment,
    setLoading,
    setError,
    clearError,
} = commentSlice.actions;

export default commentSlice.reducer;
