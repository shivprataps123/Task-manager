import { Menu } from "lucide-react";

export default function Topbar() {
    return (
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">

            {/* LEFT */}
            <div className="flex items-center gap-3">
                <button className="md:hidden">
                    <Menu size={20} />
                </button>

                <input
                    placeholder="Search..."
                    className="hidden md:block bg-gray-100 px-3 py-2 rounded-lg text-sm focus:outline-none"
                />
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm">
                    S
                </div>
            </div>
        </div>
    );
}