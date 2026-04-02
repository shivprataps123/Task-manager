import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLabels, createLabel, deleteLabel } from "@/store/slices/labelSlice";
import { fetchProjects } from "@/store/slices/projectSlice";
import { X, Plus, Trash2 } from "lucide-react";

export default function LabelManager({ projectId = null, onClose = null }) {
    const dispatch = useDispatch();
    const { labels, loading } = useSelector((state) => state.label);
    const { projects } = useSelector((state) => state.project);
    const [newLabelName, setNewLabelName] = useState("");
    const [newLabelColor, setNewLabelColor] = useState("#3B82F6");
    const [selectedProjectId, setSelectedProjectId] = useState(projectId);

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    useEffect(() => {
        if (selectedProjectId) {
            dispatch(fetchLabels(selectedProjectId));
        }
    }, [dispatch, selectedProjectId]);
    console.log(projectId)

    const handleCreateLabel = () => {
        if (newLabelName.trim() && selectedProjectId) {
            dispatch(createLabel({
                name: newLabelName.trim(),
                color: newLabelColor,
                projectId: selectedProjectId
            }));
            setNewLabelName("");
        }
    };

    const handleDeleteLabel = (labelId) => {
        dispatch(deleteLabel(labelId));
    };

    const content = (
        <>
            {onClose && (
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Manage Labels</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>
            )}

            {/* Project Selector */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Project
                </label>
                <select
                    value={selectedProjectId || ""}
                    onChange={(e) => setSelectedProjectId(e.target.value || null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">Choose a project...</option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Create New Label */}
            <div className="mb-4">
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        value={newLabelName}
                        onChange={(e) => setNewLabelName(e.target.value)}
                        placeholder="Label name"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="color"
                        value={newLabelColor}
                        onChange={(e) => setNewLabelColor(e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer"
                    />
                    <button
                        onClick={handleCreateLabel}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                    >
                        <Plus size={16} />
                        Add
                    </button>
                </div>
            </div>

            {/* Labels List */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-20">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500"></div>
                    </div>
                ) : labels.length === 0 ? (
                    <div className="text-center text-gray-500 py-4">
                        No labels yet
                    </div>
                ) : (
                    labels.map((label) => (
                        <div
                            key={label.id}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                        >
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-4 h-4 rounded"
                                    style={{ backgroundColor: label.color }}
                                />
                                <span className="text-sm">{label.name}</span>
                            </div>
                            <button
                                onClick={() => handleDeleteLabel(label.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </>
    );

    // If onClose is provided, render as modal
    if (onClose) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl w-full max-w-md p-6">
                    {content}
                </div>
            </div>
        );
    }

    // Otherwise, render inline (for Settings page)
    return content;
}
