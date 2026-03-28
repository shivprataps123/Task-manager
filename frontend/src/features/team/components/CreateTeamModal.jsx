import { useState } from "react";
import axios from "@/lib/axios";

export default function CreateTeamModal({ onCreated }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("/team", { name });

            onCreated(res.data.data); // new team

            setName("");
            setOpen(false);

        } catch (err) {
            alert(err.response?.data?.error || "Error");
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
                + Create Team
            </button>

            {open && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md">

                        <h2 className="text-lg font-semibold mb-4">
                            Create Team
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <input
                                placeholder="Team name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border px-3 py-2 rounded-lg"
                            />

                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
                                Create
                            </button>

                        </form>

                    </div>
                </div>
            )}
        </>
    );
}