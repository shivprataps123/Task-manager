import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTeamMember } from "@/store/slices/teamMemberSlice";

export default function CreateTeamMemberModal({ onMemberAdded }) {
    const dispatch = useDispatch();
    const { currentTeam } = useSelector((state) => state.team);
    const { loading } = useSelector((state) => state.teamMember);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("member");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email.trim()) {
            setError("Email is required");
            return;
        }

        if (!currentTeam?.team?.id) {
            setError("No team selected");
            return;
        }

        try {
            await dispatch(addTeamMember({
                teamId: currentTeam.team.id,
                data: { email: email.trim(), role }
            })).unwrap();

            setEmail("");
            setRole("member");
            setOpen(false);

            if (onMemberAdded) {
                onMemberAdded();
            }
        } catch (err) {
            console.log("Failed to add member:", err);
            setError(err.message || "Failed to add member");
        }
    };

    const handleClose = () => {
        setOpen(false);
        setEmail("");
        setRole("member");
        setError("");
    };

    return (
        <>
            {/* BUTTON */}
            <button
                onClick={() => setOpen(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
                + Add Member
            </button>

            {/* MODAL */}
            {open && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">
                            Add Team Member
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter member's email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Role
                                </label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    disabled={loading}
                                >
                                    <option value="member">Member</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                                    disabled={loading}
                                >
                                    {loading ? "Adding..." : "Add Member"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
