import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import KanbanBoard from "../features/task/components/KanbanBoard";
import AddTaskModal from "../features/task/components/AddTaskModal";
import TaskDetailModal from "../features/task/components/TaskDetailModal";
import { fetchTasks, updateTask } from "@/store/slices/taskSlice";

export default function Dashboard() {
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state) => state.task);
    const [collapsed, setCollapsed] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleAddTask = (task) => {
        // Task is already added to Redux store via createTask thunk
        // No need to manually update state
    };

    const handleUpdateTask = (updatedTask) => {
        dispatch(updateTask({ id: updatedTask.id, data: updatedTask }));
    };

    const handleTaskStatusChange = (taskId, newStatus) => {
        dispatch(updateTask({ id: taskId, data: { status: newStatus } }));
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600">Error: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div >

            {/* <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} /> */}

            {/* <div
                className={`flex-1 flex flex-col transition-all duration-300
        ${collapsed ? "md:ml-20" : "md:ml-64"}`}
            > */}
            {/* <Topbar /> */}

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Tasks</h1>

                    <AddTaskModal onAddTask={handleAddTask} />
                </div>
                <KanbanBoard
                    tasks={tasks}
                    setTasks={(updatedTasks) => {
                        // Handle task updates from drag and drop
                        updatedTasks.forEach(task => {
                            const originalTask = tasks.find(t => t.id === task.id);
                            if (originalTask && originalTask.status !== task.status) {
                                handleTaskStatusChange(task.id, task.status);
                            }
                        });
                    }}
                    onTaskClick={setSelectedTask}
                />
                <TaskDetailModal
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                    onUpdate={handleUpdateTask}
                />
            </div>
            {/* </div> */}
        </div>
    );
}
