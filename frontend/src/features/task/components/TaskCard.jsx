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
