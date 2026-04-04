import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import KanbanBoard from "../features/task/components/KanbanBoard";
import AddTaskModal from "../features/task/components/AddTaskModal";
import TaskDetailModal from "../features/task/components/TaskDetailModal";
import { fetchTasks, updateTask, updateTaskAction } from "@/store/slices/taskSlice";
import { fetchTeamMembers } from "@/store/slices/teamMemberSlice";
import { fetchProjects } from "@/store/slices/projectSlice";

const COLORS = [
    "#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6",
    "#EC4899", "#06B6D4", "#84CC16", "#F97316", "#6366F1"
];

const getColor = (index) => COLORS[index % COLORS.length];

function AvatarStack({ members }) {
    const visibleCount = 4;
    const extraCount = members.length - visibleCount;

    return (
        <div className="flex items-center -space-x-3">
            {members.slice(0, visibleCount).map((member, index) => {
                const initial = (member.user?.name?.[0] || member.user?.email?.[0] || "?").toUpperCase();
                return (
                    <div
                        key={member.id}
                        className="relative group"
                    >
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white"
                            style={{ backgroundColor: getColor(index) }}
                        >
                            {initial}
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-50">
                            {member.user?.name || member.user?.email} - {member.role}
                        </div>
                    </div>
                );
            })}
            {extraCount > 0 && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white bg-gray-500">
                    +{extraCount}
                </div>
            )}
        </div>
    );
}

export default function Dashboard() {
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state) => state.task);
    const { currentTeam } = useSelector((state) => state.team);
    const { members } = useSelector((state) => state.teamMember);
    const { projects } = useSelector((state) => state.project);
    const [collapsed, setCollapsed] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedProjectId, setSelectedProjectId] = useState("");

    useEffect(() => {
        if (currentTeam?.team?.id) {
            dispatch(fetchTeamMembers(currentTeam.team.id));
            dispatch(fetchProjects(currentTeam.team.id));
        }
    }, [dispatch, currentTeam]);

    useEffect(() => {
        if (currentTeam?.team?.id) {
            if (selectedProjectId) {
                dispatch(fetchTasks({ teamId: currentTeam.team.id, projectId: selectedProjectId }));
            } else {
                dispatch(fetchTasks({ teamId: currentTeam.team.id }));
            }
        } else {
            dispatch(fetchTasks({}));
        }
    }, [dispatch, currentTeam, selectedProjectId]);

    const handleAddTask = (task) => {
        // Task is already added to Redux store via createTask thunk
        // No need to manually update state
    };

    const handleUpdateTask = (updatedTask) => {
        dispatch(updateTask({ id: updatedTask.id, data: updatedTask }));
        // if (currentTeam?.team?.id) {
        //     if (selectedProjectId) {
        //         dispatch(fetchTasks({ teamId: currentTeam.team.id, projectId: selectedProjectId }));
        //     } else {
        //         dispatch(fetchTasks({ teamId: currentTeam.team.id }));
        //     }
        // }
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
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold">Tasks</h1>
                        {members.length > 0 && <AvatarStack members={members} />}
                        <select
                            value={selectedProjectId}
                            onChange={(e) => setSelectedProjectId(e.target.value)}
                            className="border px-3 py-1.5 rounded-lg text-sm ml-4"
                        >
                            <option value="">All Projects</option>
                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <AddTaskModal onAddTask={handleAddTask} />
                </div>
                <KanbanBoard
                    tasks={Array.isArray(tasks?.tasks) ? tasks.tasks : []}
                    setTasks={(updatedTasks) => {
                        // Handle task updates from drag and drop
                        if (Array.isArray(updatedTasks)) {
                            updatedTasks.forEach(task => {
                                const originalTask = tasks?.tasks?.find(t => t.id === task.id);
                                if (originalTask && originalTask.status !== task.status) {
                                    // Update Redux state immediately for real-time UI update
                                    dispatch(updateTaskAction(task));
                                    // Also update backend
                                    handleTaskStatusChange(task.id, task.status);
                                }
                            });
                        }
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
