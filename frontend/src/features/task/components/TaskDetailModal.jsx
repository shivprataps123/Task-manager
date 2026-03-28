import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentsSection from "./CommentsSection";
import { updateTask, deleteTask } from "@/store/slices/taskSlice";
import { fetchComments } from "@/store/slices/commentSlice";

export default function TaskDetailModal({ task, onClose, onUpdate }) {
    const dispatch = useDispatch();
    const { comments, loading: commentsLoading } = useSelector((state) => state.comment);
    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "todo",
    });
    const [loading, setLoading] = useState(false);

    // 🔥 sync when task changes
    useEffect(() => {
        if (task) {
            setForm({
                title: task.title,
                description: task.description,
                status: task.status,
            });
            dispatch(fetchComments(task.id));
        }
    }, [task, dispatch]);

    if (!task) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await dispatch(updateTask({ id: task.id, data: form })).unwrap();
            onClose();
        } catch (error) {
            console.error("Failed to update task:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await dispatch(deleteTask(task.id)).unwrap();
                onClose();
            } catch (error) {
                console.error("Failed to delete task:", error);
            }
        }
    };

    const handleAddComment = (comment) => {
        // Comment is already added to Redux store via createComment thunk
        // No need to manually update state
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

            <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg relative h-[500px] overflow-x-scroll">

                {/* CLOSE */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
                >
                    ✕
                </button>

                <h2 className="text-lg font-semibold mb-4">
                    Edit Task
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        value={form.title}
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        }
                        className="w-full border px-3 py-2 rounded-lg"
                        required
                    />

                    <textarea
                        value={form.description}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                        className="w-full border px-3 py-2 rounded-lg"
                    />

                    <select
                        value={form.status}
                        onChange={(e) =>
                            setForm({ ...form, status: e.target.value })
                        }
                        className="w-full border px-3 py-2 rounded-lg"
                    >
                        <option value="todo">Todo</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="text-red-600 hover:text-red-700"
                        >
                            Delete Task
                        </button>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="text-gray-600"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>

                </form>
                <CommentsSection
                    comments={comments}
                    onAddComment={handleAddComment}
                    taskId={task.id}
                    loading={commentsLoading}
                />
            </div>
        </div>

    );
}
