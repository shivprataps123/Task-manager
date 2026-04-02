import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfileAPI } from "@/features/auth/api";
import { setUser } from "@/store/slices/authSlice";
import LabelManager from "@/features/label/components/LabelManager";
import { Camera, User } from "lucide-react";

export default function SettingsPage() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [activeTab, setActiveTab] = useState("profile");
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || null);
    const [photoPreview, setPhotoPreview] = useState(user?.profilePhoto || null);
    const fileInputRef = useRef(null);

    return (
        <div className="p-6 max-w-4xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-sm text-gray-500">
                    Manage your account settings and preferences
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b">
                <button
                    onClick={() => setActiveTab("profile")}
                    className={`cursor-pointer pb-2 px-1 text-sm font-medium ${activeTab === "profile"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Profile
                </button>
                <button
                    onClick={() => setActiveTab("preferences")}
                    className={`cursor-pointer pb-2 px-1 text-sm font-medium ${activeTab === "preferences"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Preferences
                </button>
                <button
                    onClick={() => setActiveTab("notifications")}
                    className={`cursor-pointer pb-2 px-1 text-sm font-medium ${activeTab === "notifications"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Notifications
                </button>
                <button
                    onClick={() => setActiveTab("labels")}
                    className={`cursor-pointer pb-2 px-1 text-sm font-medium ${activeTab === "labels"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Labels
                </button>
            </div>

            {/* Profile Tab */}
            {activeTab === "profile" && (
                <div className="bg-white border rounded-xl p-6">
                    <h2 className="text-lg font-semibold mb-4">Profile Information</h2>

                    {/* Profile Photo Upload */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Profile Photo
                        </label>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                                    {photoPreview ? (
                                        <img
                                            src={photoPreview.startsWith('data:') ? photoPreview : `http://localhost:3000${photoPreview}`}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User size={32} className="text-indigo-600" />
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-0 right-0 w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-indigo-700 transition shadow-md"
                                >
                                    <Camera size={14} />
                                </button>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                                >
                                    Upload Photo
                                </button>
                                <p className="text-xs text-gray-500 mt-1">
                                    JPG, PNG or GIF. Max 2MB.
                                </p>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setProfilePhoto(file);
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setPhotoPreview(reader.result);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className="hidden"
                            />
                        </div>
                    </div>

                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        setLoading(true);
                        setMessage({ type: "", text: "" });
                        try {
                            const formData = new FormData();
                            formData.append("name", name);
                            formData.append("email", email);
                            if (profilePhoto instanceof File) {
                                formData.append("profilePhoto", profilePhoto);
                            }

                            const response = await updateProfileAPI(formData);
                            dispatch(setUser(response.data.data));
                            setMessage({ type: "success", text: "Profile updated successfully!" });
                        } catch (error) {
                            setMessage({ type: "error", text: error.response?.data?.error || "Failed to update profile" });
                        } finally {
                            setLoading(false);
                        }
                    }} className="space-y-4">
                        {message.text && (
                            <div className={`p-3 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                {message.text}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </form>
                </div>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
                <div className="bg-white border rounded-xl p-6">
                    <h2 className="text-lg font-semibold mb-4">Preferences</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Dark Mode</p>
                                <p className="text-sm text-gray-500">
                                    Enable dark mode for the application
                                </p>
                            </div>
                            <button className="w-12 h-6 bg-gray-200 rounded-full relative">
                                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow"></div>
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Email Notifications</p>
                                <p className="text-sm text-gray-500">
                                    Receive email notifications for task updates
                                </p>
                            </div>
                            <button className="w-12 h-6 bg-indigo-600 rounded-full relative">
                                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow"></div>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
                <div className="bg-white border rounded-xl p-6">
                    <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Task Assignments</p>
                                <p className="text-sm text-gray-500">
                                    Notify when you are assigned to a task
                                </p>
                            </div>
                            <button className="w-12 h-6 bg-indigo-600 rounded-full relative">
                                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow"></div>
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Task Updates</p>
                                <p className="text-sm text-gray-500">
                                    Notify when tasks you created are updated
                                </p>
                            </div>
                            <button className="w-12 h-6 bg-indigo-600 rounded-full relative">
                                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow"></div>
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Comments</p>
                                <p className="text-sm text-gray-500">
                                    Notify when someone comments on your tasks
                                </p>
                            </div>
                            <button className="w-12 h-6 bg-gray-200 rounded-full relative">
                                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow"></div>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Labels Tab */}
            {activeTab === "labels" && (
                <div className="bg-white border rounded-xl p-6">
                    <h2 className="text-lg font-semibold mb-4">Manage Labels</h2>
                    <p className="text-sm text-gray-500 mb-4">
                        Create and manage labels to organize your tasks
                    </p>
                    <LabelManager projectId={null} />
                </div>
            )}
        </div>
    );
}
