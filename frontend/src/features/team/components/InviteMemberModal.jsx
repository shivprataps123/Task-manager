import { useState } from "react";
import { inviteMemberAPI } from "../api";

export default function InviteMemberModal({ onAddMember, teamId }) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await inviteMemberAPI({
                email,
                teamId,
            });

            alert("Invite sent");

            setEmail("");
            setOpen(false);

        } catch (err) {
            alert(err.response?.data?.error || "Error");
        }
    };

    return (
        <>
            {/* BUTTON */}
            <button
                onClick={() => setOpen(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
                + Invite Member
            </button>

            {/* MODAL */}
            {open && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

                    <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">

                        <h2 className="text-lg font-semibold mb-4">
                            Invite Member
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <input
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border px-3 py-2 rounded-lg"
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="text-gray-600"
                                >
                                    Cancel
                                </button>

                                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
                                    Send Invite
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            )}
        </>
    );
}