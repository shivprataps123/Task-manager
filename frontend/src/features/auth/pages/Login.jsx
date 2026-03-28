import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginAPI } from "../api";
import Cookies from "js-cookie"

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await loginAPI(form);

            // 🔥 store token
            Cookies.set("token", res.data.data.token);

            // 🔥 redirect to dashboard
            navigate("/dashboard");

        } catch (err) {
            alert(err.response?.data?.error || "Login failed");
        }
    };
    return (
        <div className="min-h-screen grid md:grid-cols-2">

            {/* 🔵 LEFT SIDE */}
            <div className="hidden md:flex flex-col justify-center items-center bg-indigo-600 text-white p-10">
                <h1 className="text-4xl font-bold">Welcome back 👋</h1>
                <p className="mt-4 text-lg text-indigo-100 text-center max-w-sm">
                    Continue managing your tasks and stay productive with Taskly.
                </p>
            </div>

            {/* ⚪ RIGHT SIDE */}
            <div className="flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-200">

                    <h2 className="text-2xl font-bold text-gray-900 text-center">
                        Login to your account
                    </h2>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                        <input
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition">
                            Login
                        </button>
                    </form>

                    <p className="text-sm text-gray-500 mt-4 text-center">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-indigo-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}