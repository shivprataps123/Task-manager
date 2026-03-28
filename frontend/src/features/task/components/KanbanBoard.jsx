import {
    DndContext,
    closestCorners,
    useDroppable,
} from "@dnd-kit/core";

import TaskCard from "./TaskCard";

export default function KanbanBoard({ tasks = [], setTasks, onTaskClick }) {

    const columns = {
        todo: [],
        "in-progress": [],
        done: [],
    };

    if (tasks && Array.isArray(tasks)) {
        tasks.forEach((task) => {
            columns[task.status]?.push(task);
        });
    }

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        const taskId = active.id;
        const newStatus = over.id;

        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId
                    ? { ...task, status: newStatus }
                    : task
            )
        );
    };

    return (
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <div className="grid md:grid-cols-3 gap-6">

                <Column
                    id="todo"
                    title="Todo"
                    tasks={columns.todo}
                    onTaskClick={onTaskClick}
                />

                <Column
                    id="in-progress"
                    title="In Progress"
                    tasks={columns["in-progress"]}
                    onTaskClick={onTaskClick}
                />

                <Column
                    id="done"
                    title="Done"
                    tasks={columns.done}
                    onTaskClick={onTaskClick}
                />

            </div>
        </DndContext>
    );
}

/* 🔥 DROPPABLE COLUMN */
function Column({ id, title, tasks, onTaskClick }) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div ref={setNodeRef} className="bg-gray-100 p-4 rounded-xl min-h-[300px]">
            <h2 className="text-sm font-semibold mb-4">
                {title} ({tasks?.length})
            </h2>

            <div className="space-y-3">
                {tasks?.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onClick={onTaskClick}
                    />
                ))}
            </div>
        </div>
    );
}
