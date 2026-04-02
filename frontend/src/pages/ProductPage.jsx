import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProductPage() {
    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            Powerful Task Management for Modern Teams
                        </h1>
                        <p className="mt-6 text-gray-600 text-lg">
                            Taskly combines intuitive design with powerful features to help your team stay organized, focused, and productive. From simple to-do lists to complex project workflows, we've got you covered.
                        </p>
                        <div className="mt-8 flex gap-4">
                            <Link
                                to="/signup"
                                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
                            >
                                Start Free Trial
                            </Link>
                            <Link
                                to="/pricing"
                                className="border border-gray-300 px-6 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition font-medium"
                            >
                                View Pricing
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200"
                    >
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-8 text-white">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                </div>
                                <span className="font-semibold text-lg">Taskly Dashboard</span>
                            </div>
                            <div className="space-y-3">
                                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                    <div className="flex items-center justify-between">
                                        <span>Sprint Planning</span>
                                        <span className="text-sm bg-green-500 px-2 py-1 rounded">Active</span>
                                    </div>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                    <div className="flex items-center justify-between">
                                        <span>Design Review</span>
                                        <span className="text-sm bg-yellow-500 px-2 py-1 rounded">In Progress</span>
                                    </div>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                    <div className="flex items-center justify-between">
                                        <span>API Integration</span>
                                        <span className="text-sm bg-blue-500 px-2 py-1 rounded">Pending</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Everything You Need to Succeed</h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                            Our comprehensive suite of tools helps teams of all sizes work smarter, not harder.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                ),
                                title: "Team Collaboration",
                                description: "Work together seamlessly with real-time updates, comments, and file sharing. Keep everyone on the same page."
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                ),
                                title: "Smart Task Management",
                                description: "Create, assign, and track tasks with ease. Set priorities, deadlines, and dependencies to keep projects on track."
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                ),
                                title: "Project Tracking",
                                description: "Monitor progress with visual dashboards, Kanban boards, and detailed reports. Make data-driven decisions."
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                title: "Time Tracking",
                                description: "Track time spent on tasks and projects. Generate accurate reports for billing and productivity analysis."
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                ),
                                title: "Labels & Tags",
                                description: "Organize tasks with custom labels and tags. Filter and search to find what you need instantly."
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                ),
                                title: "Smart Notifications",
                                description: "Stay informed with customizable notifications. Get updates on task changes, comments, and deadlines."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Kanban Board Preview */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Visualize Your Workflow with Kanban Boards
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Drag and drop tasks between columns to visualize your workflow. Customize columns to match your team's process and see progress at a glance.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Customizable columns for any workflow",
                                    "Drag-and-drop task management",
                                    "Real-time updates across team",
                                    "Filter and sort by assignee, priority, or label"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200"
                        >
                            <div className="grid grid-cols-3 gap-4">
                                {["To Do", "In Progress", "Done"].map((column, i) => (
                                    <div key={i} className="bg-gray-100 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="font-semibold text-gray-700">{column}</span>
                                            <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                                                {i === 0 ? "3" : i === 1 ? "2" : "4"}
                                            </span>
                                        </div>
                                        <div className="space-y-3">
                                            {[1, 2].map((task) => (
                                                <div key={task} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-red-400' : i === 1 ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
                                                        <span className="text-sm font-medium text-gray-700">Task {task}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 bg-indigo-100 rounded-full"></div>
                                                        <span className="text-xs text-gray-500">Assigned</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-indigo-600 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Transform Your Team's Productivity?
                    </h2>
                    <p className="text-indigo-100 mb-8 text-lg">
                        Join thousands of teams already using Taskly to get more done.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            to="/signup"
                            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
                        >
                            Get Started Free
                        </Link>
                        <Link
                            to="/solutions"
                            className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
