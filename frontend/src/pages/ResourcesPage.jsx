import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ResourcesPage() {
    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center max-w-3xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900"
                    >
                        Resources & Learning Center
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mt-6 text-gray-600 text-lg"
                    >
                        Everything you need to get the most out of Taskly. Guides, tutorials, templates, and more.
                    </motion.p>
                </div>
            </section>

            {/* Resource Categories */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                ),
                                title: "Documentation",
                                description: "Comprehensive guides and API references"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                ),
                                title: "Video Tutorials",
                                description: "Step-by-step video walkthroughs"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                    </svg>
                                ),
                                title: "Templates",
                                description: "Ready-to-use project templates"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                title: "Help Center",
                                description: "FAQs and troubleshooting guides"
                            }
                        ].map((category, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
                            >
                                <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mx-auto mb-4">
                                    {category.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                                <p className="text-gray-600 text-sm">{category.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Guides */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Featured Guides</h2>
                        <p className="mt-4 text-gray-600">Learn how to get the most out of Taskly</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Getting Started with Taskly",
                                description: "Learn the basics and set up your first project in under 10 minutes.",
                                readTime: "5 min read",
                                category: "Beginner"
                            },
                            {
                                title: "Advanced Kanban Workflows",
                                description: "Master advanced techniques for managing complex projects with Kanban boards.",
                                readTime: "8 min read",
                                category: "Advanced"
                            },
                            {
                                title: "Team Collaboration Best Practices",
                                description: "Tips and strategies for effective team collaboration and communication.",
                                readTime: "6 min read",
                                category: "Team"
                            },
                            {
                                title: "Integrating with Your Tools",
                                description: "Connect Taskly with Slack, GitHub, Google, and more for seamless workflows.",
                                readTime: "7 min read",
                                category: "Integration"
                            },
                            {
                                title: "Project Management Methodologies",
                                description: "Implement Agile, Scrum, or Kanban methodologies in Taskly.",
                                readTime: "10 min read",
                                category: "Methodology"
                            },
                            {
                                title: "Reporting and Analytics",
                                description: "Generate insights and track team performance with powerful reporting tools.",
                                readTime: "6 min read",
                                category: "Analytics"
                            }
                        ].map((guide, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
                            >
                                <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                    <div className="text-white text-6xl">📚</div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
                                            {guide.category}
                                        </span>
                                        <span className="text-xs text-gray-500">{guide.readTime}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{guide.title}</h3>
                                    <p className="text-gray-600">{guide.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Tutorials */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Video Tutorials</h2>
                        <p className="mt-4 text-gray-600">Watch and learn with our video guides</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Taskly Quick Start Guide",
                                duration: "12:34",
                                views: "15K views"
                            },
                            {
                                title: "Setting Up Your First Project",
                                duration: "8:21",
                                views: "12K views"
                            },
                            {
                                title: "Advanced Task Management",
                                duration: "15:45",
                                views: "9K views"
                            },
                            {
                                title: "Team Collaboration Features",
                                duration: "10:18",
                                views: "11K views"
                            }
                        ].map((video, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-100 rounded-xl overflow-hidden cursor-pointer group"
                            >
                                <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <svg className="w-8 h-8 text-indigo-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-2 py-1 rounded">
                                        {video.duration}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-1">{video.title}</h3>
                                    <p className="text-sm text-gray-500">{video.views}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Templates */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Project Templates</h2>
                        <p className="mt-4 text-gray-600">Get started quickly with pre-built templates</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { name: "Agile Sprint", icon: "🏃", category: "Development" },
                            { name: "Marketing Campaign", icon: "📢", category: "Marketing" },
                            { name: "Product Launch", icon: "🚀", category: "Product" },
                            { name: "Event Planning", icon: "🎉", category: "Operations" },
                            { name: "Content Calendar", icon: "📅", category: "Marketing" },
                            { name: "Bug Tracking", icon: "🐛", category: "Development" },
                            { name: "HR Onboarding", icon: "👥", category: "HR" },
                            { name: "Sales Pipeline", icon: "💼", category: "Sales" }
                        ].map((template, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
                            >
                                <div className="text-4xl mb-4">{template.icon}</div>
                                <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                                <p className="text-sm text-gray-500">{template.category}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Latest from Our Blog</h2>
                        <p className="mt-4 text-gray-600">Tips, insights, and best practices</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "10 Tips for Better Project Management",
                                excerpt: "Learn the top strategies that successful teams use to manage projects effectively.",
                                date: "Mar 15, 2026",
                                readTime: "4 min read"
                            },
                            {
                                title: "The Future of Remote Work",
                                excerpt: "How distributed teams are reshaping the workplace and what it means for you.",
                                date: "Mar 10, 2026",
                                readTime: "6 min read"
                            },
                            {
                                title: "Maximizing Team Productivity",
                                excerpt: "Proven techniques to boost your team's output without burning out.",
                                date: "Mar 5, 2026",
                                readTime: "5 min read"
                            }
                        ].map((post, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-50 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                            >
                                <div className="h-48 bg-gradient-to-br from-indigo-400 to-purple-500"></div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                        <span>{post.date}</span>
                                        <span>•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                                    <p className="text-gray-600">{post.excerpt}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Community */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
                        <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
                            Connect with other Taskly users, share tips, and get help from our community of experts.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
                                Join Discord
                            </button>
                            <button className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition">
                                Follow on Twitter
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-indigo-600 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Put These Resources to Use?
                    </h2>
                    <p className="text-indigo-100 mb-8 text-lg">
                        Start your free trial and apply what you've learned today.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            to="/signup"
                            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
                        >
                            Start Free Trial
                        </Link>
                        <Link
                            to="/product"
                            className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
                        >
                            Explore Product
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
