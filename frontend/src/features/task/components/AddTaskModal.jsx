import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "@/store/slices/taskSlice";
import { fetchProjects } from "@/store/slices/projectSlice";
import { fetchTasks } from "@/store/slices/taskSlice";

export default function AddTaskModal({ onAddTask }) {
    const dispatch = useDispatch();
    const { projects } = useSelector((state) => state.project);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { currentTeam } = useSelector((state) => state.team);

    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "todo",
        projectId: "",
    });

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await dispatch(createTask(form)).unwrap();
            setForm({ title: "", description: "", status: "todo", projectId: "" });
            setOpen(false);
            dispatch(fetchTasks(currentTeam.team.id));
        } catch (error) {
            console.error("Failed to create task:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* 🔥 BUTTON */}
            <button
                onClick={() => setOpen(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
                + Add Task
            </button>

            {/* 🔥 MODAL */}
            {open && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

                    <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">

                        <h2 className="text-lg font-semibold mb-4">
                            Create Task
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <input
                                placeholder="Title"
                                value={form.title}
                                onChange={(e) =>
                                    setForm({ ...form, title: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded-lg"
                                required
                            />

                            <textarea
                                placeholder="Description"
                                value={form.description}
                                onChange={(e) =>
                                    setForm({ ...form, description: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded-lg"
                            />

                            <select
                                value={form.projectId}
                                onChange={(e) =>
                                    setForm({ ...form, projectId: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded-lg"
                                required
                            >
                                <option value="">Select Project</option>
                                {projects.map((project) => (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                            </select>

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

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="px-4 py-2 text-gray-600"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                                >
                                    {loading ? "Creating..." : "Create"}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
