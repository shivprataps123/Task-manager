import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams, setCurrentTeam } from "@/store/slices/teamSlice";

export default function TeamSwitcher() {
    const dispatch = useDispatch();
    const { teams, currentTeam, loading } = useSelector((state) => state.team);

    useEffect(() => {
        dispatch(fetchTeams());
    }, [dispatch]);

    useEffect(() => {
        if (teams.length > 0 && !currentTeam) {
            const savedTeamId = localStorage.getItem("activeTeamId");
            const teamToSelect = savedTeamId
                ? teams.find(t => t.id === savedTeamId) || teams[0]
                : teams[0];
            dispatch(setCurrentTeam(teamToSelect));
            localStorage.setItem("activeTeamId", teamToSelect.id);
        }
    }, [teams, currentTeam, dispatch]);

    const handleChange = (e) => {
        const id = e.target.value;
        const team = teams.find(t => t?.team?.id === id);
        if (team) {
            dispatch(setCurrentTeam(team));
            localStorage.setItem("activeTeamId", id);
        }
    };

    if (loading) {
        return (
            <div className="w-full border px-3 py-2 rounded-lg text-sm bg-gray-100 animate-pulse">
                Loading teams...
            </div>
        );
    }

    return (
        <select
            value={currentTeam?.team?.id || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg text-sm"
        >
            {teams.length === 0 ? (
                <option value="">No teams available</option>
            ) : (
                teams.map((team) => (
                    <option key={team?.team?.id} value={team?.team?.id}>
                        {team?.team?.name}
                    </option>
                ))
            )}
        </select>
    );
}
