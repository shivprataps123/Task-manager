import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "@/store/slices/projectSlice";
import CreateProjectModal from "../components/CreateProjectModal";

export default function ProjectPage() {
    const dispatch = useDispatch();
    const { projects, loading, error } = useSelector((state) => state.project);
    const { currentTeam } = useSelector((state) => state.team);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (currentTeam?.team?.id) {
            dispatch(fetchProjects(currentTeam.team.id));
        } else {
            dispatch(fetchProjects());
        }
    }, [dispatch, currentTeam]);

    if (loading) {
        return (
            <div className="p-6 max-w-4xl">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 max-w-4xl">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600">Error: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Projects</h1>
                    <p className="text-sm text-gray-500">
                        Manage your projects
                    </p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                    + New Project
                </button>
            </div>

            <div className="bg-white border rounded-xl">
                <div className="px-4 py-3 border-b text-sm font-semibold text-gray-700">
                    Projects ({projects.length})
                </div>

                <div className="divide-y">
                    {projects.length === 0 ? (
                        <div className="px-4 py-8 text-center text-gray-500">
                            No projects yet. Create your first project!
                        </div>
                    ) : (
                        projects.map((project) => (
                            <div
                                key={project.id}
                                className="px-4 py-3 hover:bg-gray-50"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {project.name}
                                        </p>
                                        {project.description && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                {project.description}
                                            </p>
                                        )}
                                    </div>
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                        {new Date(project.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <CreateProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
