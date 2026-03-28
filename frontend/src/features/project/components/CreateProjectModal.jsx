import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "@/store/slices/projectSlice";

export default function CreateProjectModal({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const { currentTeam } = useSelector((state) => state.team);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        description: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentTeam?.team?.id) {
            alert("Please select a team first before creating a project.");
            return;
        }

        setLoading(true);

        try {
            await dispatch(createProject({
                ...form,
                teamId: currentTeam?.team?.id
            })).unwrap();
            setForm({ name: "", description: "" });
            onClose();
        } catch (error) {
            console.error("Failed to create project:", error);
            alert("Failed to create project: " + (error.message || "Unknown error"));
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Create Project</h2>

                {!currentTeam ? (
                    <div className="text-center py-4">
                        <p className="text-gray-500 mb-4">Please select a team first before creating a project.</p>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="text-sm text-gray-500 mb-2">
                            Creating project for team: <span className="font-medium">{currentTeam.name}</span>
                        </div>

                        <input
                            placeholder="Project Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full border px-3 py-2 rounded-lg"
                            required
                        />

                        <textarea
                            placeholder="Description (optional)"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full border px-3 py-2 rounded-lg"
                            rows={3}
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={onClose}
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
                )}
            </div>
        </div>
    );
}
