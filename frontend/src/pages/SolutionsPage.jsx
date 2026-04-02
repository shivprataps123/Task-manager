import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SolutionsPage() {
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
                        Solutions for Every Team
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mt-6 text-gray-600 text-lg"
                    >
                        Whether you're a startup, enterprise, or anything in between, Taskly adapts to your unique workflow and helps your team achieve more.
                    </motion.p>
                </div>
            </section>

            {/* Solutions Grid */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "For Startups",
                                description: "Get your team up and running quickly with intuitive tools that scale as you grow. Perfect for small teams with big ambitions.",
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                ),
                                features: ["Quick setup", "Affordable pricing", "Easy collaboration", "Scalable infrastructure"]
                            },
                            {
                                title: "For Enterprises",
                                description: "Enterprise-grade security, compliance, and support. Manage complex workflows across multiple teams and departments.",
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                ),
                                features: ["Advanced security", "Custom integrations", "Dedicated support", "Compliance tools"]
                            },
                            {
                                title: "For Remote Teams",
                                description: "Stay connected and productive no matter where your team is located. Real-time collaboration tools for distributed teams.",
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                features: ["Real-time sync", "Video integration", "Time zone support", "Mobile apps"]
                            },
                            {
                                title: "For Agencies",
                                description: "Manage multiple client projects effortlessly. Keep track of deadlines, deliverables, and team workload across all your accounts.",
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                ),
                                features: ["Client management", "Project templates", "Time tracking", "Reporting tools"]
                            }
                        ].map((solution, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow border border-gray-100"
                            >
                                <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                                    {solution.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{solution.title}</h3>
                                <p className="text-gray-600 mb-6">{solution.description}</p>
                                <ul className="space-y-3">
                                    {solution.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                                                <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Popular Use Cases</h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                            See how teams across different industries use Taskly to streamline their work.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Software Development",
                                description: "Track bugs, manage sprints, and ship features faster with agile workflows.",
                                image: "💻"
                            },
                            {
                                title: "Marketing Teams",
                                description: "Plan campaigns, track content calendars, and measure results in one place.",
                                image: "📈"
                            },
                            {
                                title: "Product Teams",
                                description: "Manage roadmaps, gather feedback, and prioritize features effectively.",
                                image: "🎯"
                            },
                            {
                                title: "Design Teams",
                                description: "Organize design assets, track revisions, and collaborate on creative projects.",
                                image: "🎨"
                            },
                            {
                                title: "HR & Operations",
                                description: "Streamline hiring, onboarding, and internal processes with ease.",
                                image: "👥"
                            },
                            {
                                title: "Sales Teams",
                                description: "Track leads, manage deals, and close more opportunities efficiently.",
                                image: "💼"
                            }
                        ].map((useCase, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
                            >
                                <div className="text-4xl mb-4">{useCase.image}</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                                <p className="text-gray-600">{useCase.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integration Section */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Integrate with Your Favorite Tools
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Taskly connects seamlessly with the tools you already use. Sync data, automate workflows, and boost productivity across your entire tech stack.
                            </p>
                            <div className="grid grid-cols-3 gap-4">
                                {["Slack", "GitHub", "Google", "Figma", "Jira", "Notion"].map((tool, i) => (
                                    <div key={i} className="bg-gray-100 rounded-lg p-4 text-center font-medium text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition cursor-pointer">
                                        {tool}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white"
                        >
                            <div className="space-y-4">
                                {[
                                    { name: "Slack", status: "Connected", color: "bg-green-400" },
                                    { name: "GitHub", status: "Connected", color: "bg-green-400" },
                                    { name: "Google Drive", status: "Syncing", color: "bg-yellow-400" },
                                    { name: "Figma", status: "Connected", color: "bg-green-400" }
                                ].map((integration, i) => (
                                    <div key={i} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm flex items-center justify-between">
                                        <span className="font-medium">{integration.name}</span>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${integration.color}`}></div>
                                            <span className="text-sm">{integration.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Trusted by Teams Worldwide</h2>
                        <p className="mt-4 text-gray-600">See what our customers have to say about Taskly.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "Taskly transformed how our remote team collaborates. We've seen a 40% increase in productivity since switching.",
                                author: "Sarah Chen",
                                role: "Engineering Manager, TechCorp"
                            },
                            {
                                quote: "The best project management tool we've ever used. Intuitive, powerful, and the support team is amazing.",
                                author: "Michael Rodriguez",
                                role: "CEO, StartupXYZ"
                            },
                            {
                                quote: "Finally, a tool that adapts to our workflow instead of the other way around. Highly recommended!",
                                author: "Emily Watson",
                                role: "Product Lead, DesignCo"
                            }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                                <div>
                                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-indigo-600 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Find the Right Solution for Your Team
                    </h2>
                    <p className="text-indigo-100 mb-8 text-lg">
                        Let us help you choose the perfect plan and setup for your specific needs.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            to="/signup"
                            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
                        >
                            Start Free Trial
                        </Link>
                        <Link
                            to="/pricing"
                            className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
                        >
                            View Pricing
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
