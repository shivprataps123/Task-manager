import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Menu,
    X,
    LayoutDashboard,
    CheckSquare,
    Activity,
    Folder,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Building2,
    User2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import TeamSwitcher from "../../app/TeamSwitcher";
import { fetchProjects } from "@/store/slices/projectSlice";
import { fetchTeamMembers } from "@/store/slices/teamMemberSlice";

export default function Sidebar({ collapsed, setCollapsed }) {
    const dispatch = useDispatch();
    const { projects, loading: projectsLoading } = useSelector((state) => state.project);
    const { currentTeam } = useSelector((state) => state.team);
    const { members, loading: membersLoading } = useSelector((state) => state.teamMember);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentTeam?.team?.id) {
            dispatch(fetchProjects(currentTeam.team.id));
        } else {
            dispatch(fetchProjects());
        }
    }, [dispatch, currentTeam]);

    useEffect(() => {
        if (currentTeam?.id) {
            dispatch(fetchTeamMembers(currentTeam?.team?.id));
        }
    }, [dispatch, currentTeam]);

    return (
        <>
            {/* 🔥 MOBILE BUTTON */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow"
                onClick={() => setMobileOpen(true)}
            >
                <Menu size={20} />
            </button>

            {/* 🔥 SIDEBAR */}
            <aside
                className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40
        transition-all duration-300 flex flex-col
        ${collapsed ? "w-20" : "w-64"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
            >
                {/* HEADER */}
                <div className="flex items-center justify-between px-4 h-16 border-b">
                    {!collapsed ? (
                        <h1 className="text-lg font-bold text-gray-900">Taskly</h1>
                    ) : <h1 className="text-sm font-bold text-gray-900">Taskly</h1>
                    }

                    <button
                        className="md:hidden"
                        onClick={() => setMobileOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* SCROLL AREA */}
                <div className="overflow-y-auto p-4 space-y-6">
                    <TeamSwitcher />
                    {/* MAIN */}
                    <div className="space-y-2">
                        <SidebarItem onClick={() => navigate("/dashboard")} icon={LayoutDashboard} label="Dashboard" collapsed={collapsed} />
                        <SidebarItem onClick={() => navigate("/my-tasks")} icon={CheckSquare} label="My Tasks" collapsed={collapsed} />
                        <SidebarItem onClick={() => navigate("/activity")} icon={Activity} label="Activity" collapsed={collapsed} />
                        <SidebarItem onClick={() => navigate("/team")} icon={User2} label="Team" collapsed={collapsed} />
                        <SidebarItem onClick={() => navigate("/projects")} icon={Folder} label="Projects" collapsed={collapsed} />
                    </div>

                    {/* TEAM MEMBERS */}
                    {/* {currentTeam && (
                        <div>
                            {!collapsed && (
                                <p className="text-xs text-gray-400 mb-2">TEAM MEMBERS</p>
                            )}

                            <div className="space-y-2">
                                {membersLoading ? (
                                    <div className="flex justify-center items-center h-20">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                                    </div>
                                ) : (
                                    members.map((member) => (
                                        <SidebarItem
                                            key={member.id}
                                            icon={User2}
                                            label={member.user?.email || "Unknown"}
                                            collapsed={collapsed}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    )} */}

                    {/* PROJECTS */}
                    <div>
                        {/* {!collapsed && (
                            <p className="text-xs text-gray-400 mb-2">PROJECTS</p>
                        )} */}

                        {/* <div className="space-y-2">
                            {projectsLoading ? (
                                <div className="flex justify-center items-center h-20">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                                </div>
                            ) : (
                                projects.map((project) => (
                                    <SidebarItem
                                        key={project.id}
                                        icon={Folder}
                                        label={project.name}
                                        collapsed={collapsed}
                                    />
                                ))
                            )}
                        </div> */}

                        {/* {!collapsed && (
                            <button className="mt-3 text-sm text-indigo-600 hover:underline">
                                + New Project
                            </button>
                        )} */}
                    </div>
                </div>

                {/* FOOTER */}
                <div className="border-t p-4 space-y-2">
                    <SidebarItem icon={Settings} label="Settings" collapsed={collapsed} />
                    <SidebarItem onClick={() => { navigate("/login"); Cookies.remove('token') }} icon={LogOut} label="Logout" collapsed={collapsed} />

                    {/* COLLAPSE BUTTON */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden md:flex items-center justify-center w-full mt-2 text-gray-500 hover:text-gray-900"
                    >
                        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </button>
                </div>
            </aside>
        </>
    );
}

/* 🔥 Sidebar Item with FIXED TOOLTIP */
function SidebarItem({ icon: Icon, label, collapsed, onClick = () => { } }) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    const handleMouseEnter = (e) => {
        if (!collapsed) return;

        const rect = e.currentTarget.getBoundingClientRect();

        setCoords({
            top: rect.top + rect.height / 2,
            left: rect.right + 8,
        });

        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <>
            <div
                onClick={onClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
            >
                <Icon size={18} className="text-gray-600" />

                {!collapsed && (
                    <span className="text-sm text-gray-700">{label}</span>
                )}
            </div>

            {/* 🔥 TOOLTIP (OUTSIDE SIDEBAR) */}
            {showTooltip && (
                <div
                    className="hidden md:block fixed z-50 bg-gray-900 text-white text-xs px-3 py-1 rounded-md shadow"
                    style={{
                        top: coords.top,
                        left: coords.left,
                        transform: "translateY(-50%)",
                    }}
                >
                    {label}
                </div>
            )}
        </>
    );
}
