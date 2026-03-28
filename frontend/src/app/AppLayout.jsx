import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex">

            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            <div
                className={`flex-1 flex flex-col transition-all duration-300
        ${collapsed ? "md:ml-20" : "md:ml-64"}`}
            >
                <Topbar />
                <div className="p-6">
                    <Outlet />
                </div>
            </div>

        </div>
    );
}