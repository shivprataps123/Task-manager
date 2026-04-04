import { useDraggable } from "@dnd-kit/core";

export default function TaskCard({ task, onClick }) {
    const { attributes, listeners, setNodeRef, transform } =
        useDraggable({
            id: task.id,
        });

    const style = transform
        ? {
            transform: `translate(${transform.x}px, ${transform.y}px)`,
        }
        : undefined;
    const COLORS = [
        "#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6",
        "#EC4899", "#06B6D4", "#84CC16", "#F97316", "#6366F1"
    ];

    const getColor = (index) => COLORS[index % COLORS.length];
    const initial = (task.assignedTo?.name?.[0] || task.assignedTo?.email?.[0] || "?").toUpperCase();
    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={() => onClick(task)}
            className="bg-white p-3 rounded-b-xl shadow-sm border border-gray-200 cursor-pointer hover:shadow transition"
        >
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold">{task.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                        {task.description}
                    </p>
                    <div
                        className="relative group"
                    >
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white"
                            style={{ backgroundColor: getColor(Math.floor(Math.random() * COLORS.length)) }}
                        >
                            {initial}
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-50">
                            {task.assignedTo?.name || task.assignedTo?.email}
                        </div>
                    </div>

                    {console.log(task)}
                </div>

                {/* Drag Handle */}
                <div
                    {...listeners}
                    {...attributes}
                    className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
                    onClick={(e) => e.stopPropagation()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="9" cy="5" r="1" />
                        <circle cx="9" cy="12" r="1" />
                        <circle cx="9" cy="19" r="1" />
                        <circle cx="15" cy="5" r="1" />
                        <circle cx="15" cy="12" r="1" />
                        <circle cx="15" cy="19" r="1" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
