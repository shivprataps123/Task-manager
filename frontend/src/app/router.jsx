import { Routes, Route } from "react-router-dom";

import PublicLayout from "./PublicLayout";
import AppLayout from "./AppLayout";

import LandingPage from "@/pages/LandingPage";
import Login from "@/features/auth/pages/Login";
import Signup from "@/features/auth/pages/Signup";

import Dashboard from "@/pages/Dashboard";
import TeamPage from "@/features/team/pages/TeamPage";

import ProtectedRoute from "@/components/common/ProtectedRoute";
import PublicRoute from "@/components/common/PublicRoute";
import MyTasksPage from "../features/task/page/MyTasksPage";
import ActivityPage from "../features/activity/page/ActivityPage";
import ProjectPage from "../features/project/page/ProjectPage";
import SettingsPage from "../features/settings/page/SettingsPage";

export default function AppRouter() {
    return (
        <Routes>

            {/* 🌍 PUBLIC */}
            <Route element={<PublicLayout />}>

                <Route path="/" element={<LandingPage />} />

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/signup"
                    element={
                        <PublicRoute>
                            <Signup />
                        </PublicRoute>
                    }
                />

            </Route>

            {/* 🔒 APP (PROTECTED) */}
            <Route
                element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }
            >

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/my-tasks" element={<MyTasksPage />} />
                <Route path="/activity" element={<ActivityPage />} />
                <Route path="/projects" element={<ProjectPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Route>

        </Routes>
    );
}
