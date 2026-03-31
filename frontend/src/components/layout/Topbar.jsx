import { useState } from "react";
import { Menu, User, Mail, LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Topbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const user = useSelector((state) => state?.auth?.user);
    const navigate = useNavigate();

    const getInitial = () => {
        if (user?.user?.name) {
            return user?.user?.email.charAt(0).toUpperCase();
        }
        return "U";
    };

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/login');
    };

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
            <div className="flex items-center gap-3 relative">
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-indigo-700 transition"
                >
                    {getInitial()}
                </button>

                {/* DROPDOWN */}
                {showDropdown && (
                    <div className="absolute right-0 top-12 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <div className="p-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center text-lg">
                                    {getInitial()}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {user?.user?.name || "User"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {user?.user?.email || "No email"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-2">
                            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                                <User size={16} />
                                <span className="text-sm">Profile</span>
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                                <Mail size={16} />
                                <span className="text-sm">{user?.user?.email || "No email"}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                                <LogOut size={16} />
                                <span className="text-sm">Logout</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}