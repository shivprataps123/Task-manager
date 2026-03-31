import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupAPI } from "../api";

export default function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signupAPI(form);

            // after signup → go to login
            navigate("/login");

        } catch (err) {
            alert(err.response?.data?.error || "Signup failed");
        }
    };

    return (
        <div className="min-h-screen grid md:grid-cols-2">

            {/* 🔵 LEFT SIDE */}
            <div className="hidden md:flex flex-col justify-center items-center bg-indigo-600 text-white p-10">
                <h1 className="text-4xl font-bold">Taskly</h1>
                <p className="mt-4 text-lg text-indigo-100 text-center max-w-sm">
                    Organize your work, collaborate with your team and get things done faster.
                </p>
            </div>

            {/* ⚪ RIGHT SIDE */}
            <div className="flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-200">

                    <h2 className="text-2xl font-bold text-gray-900 text-center">
                        Create your account
                    </h2>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                        <input
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                            className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

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
                            Sign up
                        </button>
                    </form>

                    <p className="text-sm text-gray-500 mt-4 text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}