import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="bg-gray-50">
            {/* 🔥 HERO SECTION */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 opacity-90"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWMTJoMnY0em0wLTZoLTJWNmgydjR6bTAtNmgtMlYwaDJ2NHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

                <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-white"
                        >
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                Now with AI-powered task suggestions
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                Manage your team's work, <span className="text-yellow-300">simply.</span>
                            </h1>
                            <p className="mt-6 text-lg text-indigo-100 max-w-lg">
                                Plan, track and collaborate — all in one place with Taskly. Boost productivity by 40% with our intuitive project management platform.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    to="/signup"
                                    className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Get Started Free
                                </Link>
                                <Link
                                    to="/product"
                                    className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                    Watch Demo
                                </Link>
                            </div>
                            <div className="mt-8 flex items-center gap-6">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-white"></div>
                                    ))}
                                </div>
                                <div className="text-sm">
                                    <p className="font-semibold">10,000+ teams</p>
                                    <p className="text-indigo-200">already using Taskly</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative"
                        >
                            {/* Dashboard Preview */}
                            <div className="bg-white rounded-2xl shadow-2xl p-4 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                                <div className="bg-gray-100 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {["To Do", "In Progress", "Done"].map((column, i) => (
                                            <div key={i} className="bg-white rounded-lg p-3 shadow-sm">
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-xs font-semibold text-gray-600">{column}</span>
                                                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                                                        {i === 0 ? "4" : i === 1 ? "3" : "5"}
                                                    </span>
                                                </div>
                                                <div className="space-y-2">
                                                    {[1, 2].map((task) => (
                                                        <div key={task} className="bg-gray-50 p-2 rounded border border-gray-100">
                                                            <div className="flex items-center gap-1 mb-1">
                                                                <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-red-400' : i === 1 ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
                                                                <span className="text-xs font-medium text-gray-700">Task {task}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <div className="w-4 h-4 bg-indigo-100 rounded-full"></div>
                                                                <div className="w-4 h-4 bg-purple-100 rounded-full"></div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-xl shadow-lg font-semibold text-sm"
                            >
                                +40% Productivity
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -bottom-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg font-semibold text-sm"
                            >
                                ✓ Real-time Sync
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 🏢 TRUSTED BY */}
            <section className="bg-white py-12 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <p className="text-center text-gray-500 text-sm mb-8">Trusted by innovative teams worldwide</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
                        {["Google", "Microsoft", "Airbnb", "Spotify", "Slack", "Netflix"].map((company, i) => (
                            <div key={i} className="text-2xl font-bold text-gray-400">{company}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 🚀 FEATURES */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-indigo-600 font-semibold text-sm uppercase tracking-wider"
                    >
                        Features
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mt-2"
                    >
                        Everything you need to manage work
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="mt-4 text-gray-600 max-w-2xl mx-auto"
                    >
                        Powerful features designed to help teams of all sizes work smarter and achieve more together.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            icon: (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            ),
                            title: "Team Collaboration",
                            description: "Work together seamlessly with real-time updates and comments."
                        },
                        {
                            icon: (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            ),
                            title: "Task Management",
                            description: "Create, assign, and track tasks with priorities and deadlines."
                        },
                        {
                            icon: (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            ),
                            title: "Project Tracking",
                            description: "Monitor progress with visual dashboards and detailed reports."
                        },
                        {
                            icon: (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ),
                            title: "Activity Logs",
                            description: "Track every change and keep your team accountable."
                        }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                            className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mx-auto mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="font-semibold text-gray-900 text-lg mb-2">{feature.title}</h3>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 🧠 HOW IT WORKS */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-indigo-600 font-semibold text-sm uppercase tracking-wider"
                        >
                            How It Works
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold text-gray-900 mt-2"
                        >
                            Get started in 3 simple steps
                        </motion.h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Create a team",
                                description: "Invite your colleagues and set up your workspace in minutes.",
                                icon: "👥"
                            },
                            {
                                step: "02",
                                title: "Add projects & tasks",
                                description: "Organize your work into projects and break them down into manageable tasks.",
                                icon: "📋"
                            },
                            {
                                step: "03",
                                title: "Track progress together",
                                description: "Monitor progress, collaborate in real-time, and celebrate achievements.",
                                icon: "🎯"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 h-full border border-indigo-100">
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <div className="text-indigo-600 font-bold text-sm mb-2">Step {item.step}</div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                                {i < 2 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                        <svg className="w-8 h-8 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 📊 STATS */}
            <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 text-center text-white">
                        {[
                            { number: "10K+", label: "Active Teams" },
                            { number: "500K+", label: "Tasks Completed" },
                            { number: "99.9%", label: "Uptime" },
                            { number: "4.9/5", label: "User Rating" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                                <div className="text-indigo-200">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 💰 PRICING PREVIEW */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-indigo-600 font-semibold text-sm uppercase tracking-wider"
                    >
                        Pricing
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mt-2"
                    >
                        Simple, transparent pricing
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="mt-4 text-gray-600"
                    >
                        Start free, upgrade when you're ready
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {[
                        {
                            name: "Free",
                            price: "$0",
                            description: "Perfect for individuals",
                            features: ["Up to 5 members", "Unlimited tasks", "Basic features"],
                            cta: "Get Started",
                            popular: false
                        },
                        {
                            name: "Pro",
                            price: "$12",
                            description: "For growing teams",
                            features: ["Unlimited members", "Advanced boards", "Integrations", "Priority support"],
                            cta: "Start Free Trial",
                            popular: true
                        },
                        {
                            name: "Enterprise",
                            price: "Custom",
                            description: "For large organizations",
                            features: ["Everything in Pro", "SSO & SAML", "Dedicated support", "Custom training"],
                            cta: "Contact Sales",
                            popular: false
                        }
                    ].map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`rounded-2xl p-8 ${plan.popular ? 'bg-indigo-600 text-white shadow-xl scale-105' : 'bg-white border border-gray-200 shadow-sm'}`}
                        >
                            {plan.popular && (
                                <div className="text-sm font-semibold text-indigo-200 mb-2">Most Popular</div>
                            )}
                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <div className="text-4xl font-bold mb-2">{plan.price}</div>
                            <p className={`mb-6 ${plan.popular ? 'text-indigo-200' : 'text-gray-500'}`}>{plan.description}</p>
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-center gap-2">
                                        <svg className={`w-5 h-5 ${plan.popular ? 'text-indigo-200' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className={plan.popular ? 'text-indigo-100' : 'text-gray-600'}>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                to="/pricing"
                                className={`block text-center py-3 rounded-lg font-medium transition ${plan.popular ? 'bg-white text-indigo-600 hover:bg-gray-100' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                            >
                                {plan.cta}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 💬 TESTIMONIALS */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-indigo-600 font-semibold text-sm uppercase tracking-wider"
                        >
                            Testimonials
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold text-gray-900 mt-2"
                        >
                            Loved by teams worldwide
                        </motion.h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "Taskly transformed how our remote team collaborates. We've seen a 40% increase in productivity!",
                                author: "Sarah Chen",
                                role: "Engineering Manager, TechCorp",
                                avatar: "👩‍💻"
                            },
                            {
                                quote: "The best project management tool we've ever used. Intuitive, powerful, and the support is amazing.",
                                author: "Michael Rodriguez",
                                role: "CEO, StartupXYZ",
                                avatar: "👨‍💼"
                            },
                            {
                                quote: "Finally, a tool that adapts to our workflow instead of the other way around. Highly recommended!",
                                author: "Emily Watson",
                                role: "Product Lead, DesignCo",
                                avatar: "👩‍🎨"
                            }
                        ].map((testimonial, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-2xl">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{testimonial.author}</p>
                                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 📣 CTA */}
            <section className="relative overflow-hidden py-20">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWMTJoMnY0em0wLTZoLTJWNmgydjR6bTAtNmgtMlYwaDJ2NHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

                <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        Start managing your work today
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-indigo-100 mb-8 text-lg"
                    >
                        Join 10,000+ teams already using Taskly to get more done.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <Link
                            to="/signup"
                            className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg"
                        >
                            Get Started Free
                        </Link>
                        <Link
                            to="/pricing"
                            className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition"
                        >
                            View Pricing
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* 🦶 FOOTER */}
            <footer className="bg-gray-900 text-gray-400 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold">
                                    T
                                </div>
                                <span className="text-lg font-semibold text-white">Taskly</span>
                            </div>
                            <p className="text-sm">
                                The modern way to manage your team's work. Simple, powerful, and beautiful.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/product" className="hover:text-white transition">Features</Link></li>
                                <li><Link to="/pricing" className="hover:text-white transition">Pricing</Link></li>
                                <li><Link to="/solutions" className="hover:text-white transition">Solutions</Link></li>
                                <li><Link to="/resources" className="hover:text-white transition">Resources</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition">About</a></li>
                                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                                <li><a href="#" className="hover:text-white transition">Security</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm">
                        © {new Date().getFullYear()} Taskly. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
