import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "@/store/slices/activitySlice";

export default function ActivityPage() {
    const dispatch = useDispatch();
    const { activities, loading, error, pagination } = useSelector((state) => state.activity);
    const { currentTeam } = useSelector((state) => state.team);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20;

    useEffect(() => {
        if (currentTeam?.team?.id) {
            dispatch(fetchActivities({ teamId: currentTeam.team.id, page: currentPage, limit }));
        } else {
            dispatch(fetchActivities({ page: currentPage, limit }));
        }
    }, [dispatch, currentTeam, currentPage]);

    const activityAction = {
        comment_added: "added a comment",
        task_created: "created a task",
        task_updated: "updated a task",
        task_deleted: "deleted a task",
    }
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
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Activity</h1>
                <p className="text-sm text-gray-500">
                    View recent activity in your workspace
                </p>
            </div>

            <div className="bg-white border rounded-xl">
                <div className="px-4 py-3 border-b text-sm font-semibold text-gray-700">
                    Recent Activity ({pagination?.total || 0})
                </div>

                <div className="divide-y">
                    {activities?.length === 0 ? (
                        <div className="px-4 py-8 text-center text-gray-500">
                            No activity yet
                        </div>
                    ) : (
                        activities?.map((activity) => (
                            <div
                                key={activity?.id}
                                className="px-4 py-3"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {activity?.user?.name} {activityAction[activity?.action]} in {activity?.project?.name} project.
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(activity?.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                    <div className="px-4 py-3 border-t flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} activities
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(pagination.page - 1)}
                                disabled={pagination.page === 1}
                                className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Previous
                            </button>
                            <span className="px-3 py-1 text-sm">
                                Page {pagination.page} of {pagination.totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(pagination.page + 1)}
                                disabled={pagination.page === pagination.totalPages}
                                className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
