import { useState, useEffect, useRef } from "react";
import { Menu, User, Mail, LogOut, Search, X, Folder, Users, Tag, CheckSquare } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Topbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchResults, setSearchResults] = useState({
        tasks: [],
        projects: [],
        members: [],
        labels: []
    });
    const searchRef = useRef(null);
    const user = useSelector((state) => state?.auth?.user);
    const tasks = useSelector((state) => state?.task?.tasks || []);
    const projects = useSelector((state) => state?.project?.projects || []);
    const teamMembers = useSelector((state) => state?.teamMember?.members || []);
    const labels = useSelector((state) => state?.label?.labels || []);
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
    // Search functionality
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults({ tasks: [], projects: [], members: [], labels: [] });
            setShowSearchResults(false);
            return;
        }

        const query = searchQuery.toLowerCase();

        // Search tasks
        const filteredTasks = tasks?.tasks?.filter(task =>
            task.title?.toLowerCase().includes(query) ||
            task.description?.toLowerCase().includes(query)
        ).slice(0, 5);

        // Search projects
        const filteredProjects = projects.filter(project =>
            project.name?.toLowerCase().includes(query) ||
            project.description?.toLowerCase().includes(query)
        ).slice(0, 5);

        // Search team members
        const filteredMembers = teamMembers.filter(member =>
            member.name?.toLowerCase().includes(query) ||
            member.email?.toLowerCase().includes(query)
        ).slice(0, 5);

        // Search labels
        const filteredLabels = labels.filter(label =>
            label.name?.toLowerCase().includes(query)
        ).slice(0, 5);

        setSearchResults({
            tasks: filteredTasks,
            projects: filteredProjects,
            members: filteredMembers,
            labels: filteredLabels
        });

        setShowSearchResults(true);
    }, [searchQuery, tasks, projects, teamMembers, labels]);

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchResults(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleResultClick = (type, item) => {
        setShowSearchResults(false);
        setSearchQuery("");

        switch (type) {
            case "task":
                navigate("/my-tasks");
                break;
            case "project":
                navigate("/projects");
                break;
            case "member":
                navigate("/team");
                break;
            case "label":
                navigate("/my-tasks");
                break;
            default:
                break;
        }
    };

    const clearSearch = () => {
        setSearchQuery("");
        setShowSearchResults(false);
    };

    return (
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">

            {/* LEFT */}
            <div className="flex items-center gap-3">
                <button className="md:hidden">
                    <Menu size={20} />
                </button>

                <div className="relative hidden md:block" ref={searchRef}>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search tasks, projects, members..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => searchQuery && setShowSearchResults(true)}
                            className="bg-gray-100 pl-10 pr-8 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                        />
                        {searchQuery && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* Search Results Dropdown */}
                    {showSearchResults && (
                        <div className="absolute top-12 left-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                            {searchResults.tasks.length > 0 && (
                                <div className="p-3 border-b border-gray-100">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase mb-2">
                                        <CheckSquare size={14} />
                                        Tasks
                                    </div>
                                    {searchResults.tasks.map((task) => (
                                        <div
                                            key={task.id}
                                            onClick={() => handleResultClick('task', task)}
                                            className="px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                                        >
                                            <p className="text-sm font-medium text-gray-900">{task.title}</p>
                                            {task.description && (
                                                <p className="text-xs text-gray-500 truncate">{task.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {searchResults.projects.length > 0 && (
                                <div className="p-3 border-b border-gray-100">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase mb-2">
                                        <Folder size={14} />
                                        Projects
                                    </div>
                                    {searchResults.projects.map((project) => (
                                        <div
                                            key={project.id}
                                            onClick={() => handleResultClick('project', project)}
                                            className="px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                                        >
                                            <p className="text-sm font-medium text-gray-900">{project.name}</p>
                                            {project.description && (
                                                <p className="text-xs text-gray-500 truncate">{project.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {searchResults.members.length > 0 && (
                                <div className="p-3 border-b border-gray-100">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase mb-2">
                                        <Users size={14} />
                                        Team Members
                                    </div>
                                    {searchResults.members.map((member) => (
                                        <div
                                            key={member.id}
                                            onClick={() => handleResultClick('member', member)}
                                            className="px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center gap-3"
                                        >
                                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-sm font-medium">
                                                {member.name?.charAt(0).toUpperCase() || member.email?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{member.name || "Unnamed"}</p>
                                                <p className="text-xs text-gray-500">{member.email}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {searchResults.labels.length > 0 && (
                                <div className="p-3">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase mb-2">
                                        <Tag size={14} />
                                        Labels
                                    </div>
                                    {searchResults.labels.map((label) => (
                                        <div
                                            key={label.id}
                                            onClick={() => handleResultClick('label', label)}
                                            className="px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center gap-2"
                                        >
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: label.color || "#6366f1" }}
                                            />
                                            <p className="text-sm font-medium text-gray-900">{label.name}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {searchResults.tasks.length === 0 &&
                                searchResults.projects.length === 0 &&
                                searchResults.members.length === 0 &&
                                searchResults.labels.length === 0 && (
                                    <div className="p-4 text-center text-gray-500 text-sm">
                                        No results found for "{searchQuery}"
                                    </div>
                                )}
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3 relative">
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="cursor-pointer w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-indigo-700 transition"
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
                            <div onClick={() => {
                                navigate("/settings");
                                setShowDropdown(false)
                            }} className="cursor-pointer flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
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