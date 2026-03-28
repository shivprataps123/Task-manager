import { motion } from "framer-motion";

export default function LandingPage() {
    return (
        <div className="bg-gray-50">

            {/* 🔥 HERO */}
            <section className="max-w-7xl mx-auto px-4 py-20 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold text-gray-900"
                >
                    Manage your team’s work, simply.
                </motion.h1>

                <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
                    Plan, track and collaborate — all in one place with Taskly.
                </p>

                <div className="mt-6 flex justify-center gap-4">
                    <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
                        Get Started Free
                    </button>

                    <button className="border border-gray-200 px-6 py-3 rounded-lg text-gray-600 hover:bg-gray-100">
                        See Demo
                    </button>
                </div>

                {/* Mock UI */}
                <div className="mt-12 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                    <div className="grid grid-cols-3 gap-4 text-left">
                        <div className="bg-gray-100 p-3 rounded-lg">
                            <p className="font-semibold">Todo</p>
                            <div className="mt-2 space-y-2">
                                <div className="bg-white p-2 rounded shadow-sm">Task 1</div>
                                <div className="bg-white p-2 rounded shadow-sm">Task 2</div>
                            </div>
                        </div>

                        <div className="bg-gray-100 p-3 rounded-lg">
                            <p className="font-semibold">In Progress</p>
                        </div>

                        <div className="bg-gray-100 p-3 rounded-lg">
                            <p className="font-semibold">Done</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🚀 FEATURES */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-2xl font-bold text-center mb-10">
                    Everything you need to manage work
                </h2>

                <div className="grid md:grid-cols-4 gap-6">
                    {[
                        "Team Collaboration",
                        "Task Management",
                        "Project Tracking",
                        "Activity Logs"
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm"
                        >
                            <p className="font-semibold">{item}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 🧠 HOW IT WORKS */}
            <section className="bg-white py-16">
                <h2 className="text-2xl font-bold text-center mb-10">
                    How it works
                </h2>

                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-4 text-center">
                    {[
                        "Create a team",
                        "Add projects & tasks",
                        "Track progress together"
                    ].map((step, i) => (
                        <div key={i} className="p-6">
                            <div className="text-indigo-600 font-bold text-xl mb-2">
                                {i + 1}
                            </div>
                            <p className="text-gray-600">{step}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 💰 PRICING */}
            <section className="max-w-5xl mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold mb-10">Simple pricing</h2>

                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                    <h3 className="text-xl font-semibold">Free Plan</h3>
                    <p className="text-gray-500 mt-2">Perfect for individuals and small teams</p>

                    <ul className="mt-6 space-y-2 text-gray-600">
                        <li>✔ Unlimited tasks</li>
                        <li>✔ Team collaboration</li>
                        <li>✔ Basic features</li>
                    </ul>

                    <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
                        Start Free
                    </button>
                </div>
            </section>

            {/* 📣 CTA */}
            <section className="bg-indigo-600 text-white py-16 text-center">
                <h2 className="text-2xl font-bold">
                    Start managing your work today
                </h2>

                <button className="mt-6 bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100">
                    Get Started Free
                </button>
            </section>

            {/* 🦶 FOOTER */}
            <footer className="bg-gray-100 py-6 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} Taskly. All rights reserved.
            </footer>
        </div>
    );
}