import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "@/store/slices/activitySlice";

export default function ActivityPage() {
    const dispatch = useDispatch();
    const { activities, loading, error } = useSelector((state) => state.activity);

    useEffect(() => {
        dispatch(fetchActivities());
    }, [dispatch]);

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
                    Recent Activity ({activities.length})
                </div>

                <div className="divide-y">
                    {activities.length === 0 ? (
                        <div className="px-4 py-8 text-center text-gray-500">
                            No activity yet
                        </div>
                    ) : (
                        activities.map((activity) => (
                            <div
                                key={activity.id}
                                className="px-4 py-3"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {activity.action}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(activity.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
