import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InviteMemberModal from "../components/InviteMemberModal";
import CreateTeamModal from "../components/CreateTeamModal";
import CreateTeamMemberModal from "../components/CreateTeamMemberModal";
import { fetchTeams } from "@/store/slices/teamSlice";

export default function TeamPage() {
    const dispatch = useDispatch();
    const { teams, currentTeam, loading, error } = useSelector((state) => state.team);
    const membersList = useSelector((state) => state?.teamMember?.members)
    const [members, setMembers] = useState([]);

    const handleAddMember = (member) => {
        setMembers((prev) => [...prev, member]);
    };

    useEffect(() => {
        dispatch(fetchTeams());
    }, [dispatch]);

    useEffect(() => {
        if (currentTeam) {
            fetchMembers();
        }
    }, [currentTeam]);

    const fetchMembers = async () => {
        // This will be handled by the team member slice
        // For now, we'll keep the local state
    };

    if (loading) {
        return (
            <div className="p-6 max-w-4xl">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 max-w-4xl">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600">Error: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl">
            {teams.length === 0 && (
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4">
                        No team yet
                    </h2>

                </div>
            )}

            {console.log(membersList)}
            {/* 🔥 TEAM HEADER */}
            <div className="flex gap-2.5">
                <CreateTeamModal onCreated={() => dispatch(fetchTeams())} />

            </div>
            {membersList?.length > 0 && (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold">{currentTeam?.team?.name || "-"}</h1>
                            <p className="text-sm text-gray-500">
                                Manage your team members
                            </p>
                        </div>
                        <div className="flex gap-2.5">
                            {/* <CreateTeamModal onCreated={() => dispatch(fetchTeams())} /> */}
                            <CreateTeamMemberModal onMemberAdded={() => dispatch(fetchTeams())} />
                            <InviteMemberModal onAddMember={handleAddMember} />
                        </div>
                    </div>

                    <div className="bg-white border rounded-xl">

                        <div className="px-4 py-3 border-b text-sm font-semibold text-gray-700">
                            Members ({membersList?.length})
                        </div>
                        <div className="divide-y">
                            {membersList?.map((member) => (
                                <div
                                    key={member.id}
                                    className="flex items-center justify-between px-4 py-3"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {member?.user?.email}
                                        </p>
                                    </div>

                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded capitalize">
                                        {member.role}
                                    </span>
                                </div>
                            ))}
                        </div>

                    </div>
                </>
            )}
        </div>
    );
}
