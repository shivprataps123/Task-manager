import { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "@/store/slices/commentSlice";

export default function CommentsSection({ comments, onAddComment, taskId, loading }) {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!text.trim()) return;

        setSubmitting(true);

        try {
            await dispatch(createComment({
                content: text,
                taskId,
            })).unwrap();
            setText("");
        } catch (error) {
            console.error("Failed to create comment:", error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Comments
                </h3>
                <div className="flex justify-center items-center h-20">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-6">

            <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Comments
            </h3>

            {/* LIST */}
            <div className="space-y-3 max-h-40 overflow-y-auto pr-1">
                {comments.length === 0 && (
                    <p className="text-xs text-gray-400">
                        No comments yet
                    </p>
                )}

                {comments.map((c) => (
                    <div
                        key={c.id}
                        className="bg-gray-100 p-3 rounded-lg"
                    >
                        <p className="text-xs text-gray-500">
                            {c.user?.email || "Unknown user"}
                        </p>

                        <p className="text-sm text-gray-800 mt-1">
                            {c.content}
                        </p>
                    </div>
                ))}
            </div>

            {/* ADD COMMENT */}
            <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 border px-3 py-2 rounded-lg text-sm"
                    disabled={submitting}
                />

                <button
                    type="submit"
                    disabled={submitting || !text.trim()}
                    className="bg-indigo-600 text-white px-3 rounded-lg text-sm disabled:opacity-50"
                >
                    {submitting ? "Sending..." : "Send"}
                </button>
            </form>

        </div>
    );
}
