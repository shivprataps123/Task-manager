import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "@/store/slices/taskSlice";
import TaskCard from "../components/TaskCard";
import TaskDetailModal from "../components/TaskDetailModal";

export default function MyTasksPage() {
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state) => state.task);
    const { currentTeam } = useSelector((state) => state.team);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        if (currentTeam?.team?.id) {
            dispatch(fetchTasks(currentTeam.team.id));
        } else {
            dispatch(fetchTasks());
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
            <div className="mb-6">
                <h1 className="text-2xl font-bold">My Tasks</h1>
                <p className="text-sm text-gray-500">
                    View and manage your tasks
                </p>
            </div>

            <div className="bg-white border rounded-xl">
                <div className="px-4 py-3 border-b text-sm font-semibold text-gray-700">
                    Tasks ({tasks?.tasks?.length})
                </div>

                <div className="divide-y rounded-b-lg">
                    {tasks?.tasks?.length === 0 ? (
                        <div className="px-4 py-8 text-center text-gray-500">
                            No tasks yet
                        </div>
                    ) : (
                        tasks?.tasks?.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onClick={() => setSelectedTask(task)}
                            />
                        ))
                    )}
                </div>
            </div>

            <TaskDetailModal
                task={selectedTask}
                onClose={() => setSelectedTask(null)}
                onUpdate={() => { }}
            />
        </div>
    );
}
