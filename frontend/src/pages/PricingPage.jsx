import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PricingPage() {
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
                        Simple, Transparent Pricing
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mt-6 text-gray-600 text-lg"
                    >
                        Choose the plan that fits your team's needs. No hidden fees, no surprises. Start free and upgrade anytime.
                    </motion.p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="pb-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Free Plan */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
                        >
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900">Free</h3>
                                <p className="text-gray-500 mt-2">Perfect for getting started</p>
                                <div className="mt-6">
                                    <span className="text-5xl font-bold text-gray-900">$0</span>
                                    <span className="text-gray-500">/month</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "Up to 5 team members",
                                    "Unlimited tasks",
                                    "Basic project management",
                                    "Mobile apps",
                                    "Email support"
                                ].map((feature, i) => (
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

                            <Link
                                to="/signup"
                                className="block w-full bg-gray-100 text-gray-900 text-center py-3 rounded-lg font-medium hover:bg-gray-200 transition"
                            >
                                Get Started Free
                            </Link>
                        </motion.div>

                        {/* Pro Plan */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-indigo-600 rounded-2xl p-8 shadow-xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
                                POPULAR
                            </div>

                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-white">Pro</h3>
                                <p className="text-indigo-200 mt-2">For growing teams</p>
                                <div className="mt-6">
                                    <span className="text-5xl font-bold text-white">$12</span>
                                    <span className="text-indigo-200">/user/month</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "Unlimited team members",
                                    "Unlimited tasks & projects",
                                    "Advanced Kanban boards",
                                    "Time tracking",
                                    "Custom labels & tags",
                                    "Priority support",
                                    "Integrations (Slack, GitHub)",
                                    "Advanced reporting"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-white">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to="/signup"
                                className="block w-full bg-white text-indigo-600 text-center py-3 rounded-lg font-medium hover:bg-gray-100 transition"
                            >
                                Start Free Trial
                            </Link>
                        </motion.div>

                        {/* Enterprise Plan */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
                        >
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900">Enterprise</h3>
                                <p className="text-gray-500 mt-2">For large organizations</p>
                                <div className="mt-6">
                                    <span className="text-5xl font-bold text-gray-900">Custom</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "Everything in Pro",
                                    "Unlimited storage",
                                    "SSO & SAML",
                                    "Advanced security",
                                    "Custom integrations",
                                    "Dedicated account manager",
                                    "24/7 phone support",
                                    "Custom training",
                                    "SLA guarantee"
                                ].map((feature, i) => (
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

                            <Link
                                to="/signup"
                                className="block w-full bg-gray-900 text-white text-center py-3 rounded-lg font-medium hover:bg-gray-800 transition"
                            >
                                Contact Sales
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Feature Comparison */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Compare Plans</h2>
                        <p className="mt-4 text-gray-600">See which plan is right for your team</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Features</th>
                                    <th className="text-center py-4 px-4 font-semibold text-gray-900">Free</th>
                                    <th className="text-center py-4 px-4 font-semibold text-indigo-600">Pro</th>
                                    <th className="text-center py-4 px-4 font-semibold text-gray-900">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: "Team Members", free: "5", pro: "Unlimited", enterprise: "Unlimited" },
                                    { feature: "Tasks", free: "Unlimited", pro: "Unlimited", enterprise: "Unlimited" },
                                    { feature: "Projects", free: "3", pro: "Unlimited", enterprise: "Unlimited" },
                                    { feature: "Storage", free: "1 GB", pro: "10 GB", enterprise: "Unlimited" },
                                    { feature: "Kanban Boards", free: "Basic", pro: "Advanced", enterprise: "Advanced" },
                                    { feature: "Time Tracking", free: "❌", pro: "✓", enterprise: "✓" },
                                    { feature: "Custom Labels", free: "❌", pro: "✓", enterprise: "✓" },
                                    { feature: "Integrations", free: "❌", pro: "✓", enterprise: "✓" },
                                    { feature: "Advanced Reporting", free: "❌", pro: "✓", enterprise: "✓" },
                                    { feature: "SSO/SAML", free: "❌", pro: "❌", enterprise: "✓" },
                                    { feature: "Dedicated Support", free: "❌", pro: "❌", enterprise: "✓" },
                                    { feature: "Custom Training", free: "❌", pro: "❌", enterprise: "✓" }
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-4 px-4 text-gray-700">{row.feature}</td>
                                        <td className="py-4 px-4 text-center text-gray-600">{row.free}</td>
                                        <td className="py-4 px-4 text-center text-indigo-600 font-medium">{row.pro}</td>
                                        <td className="py-4 px-4 text-center text-gray-600">{row.enterprise}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
                        <p className="mt-4 text-gray-600">Got questions? We've got answers.</p>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                question: "Can I change plans anytime?",
                                answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate your billing accordingly."
                            },
                            {
                                question: "Is there a free trial for paid plans?",
                                answer: "Absolutely! All paid plans come with a 14-day free trial. No credit card required to start."
                            },
                            {
                                question: "What payment methods do you accept?",
                                answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for Enterprise plans."
                            },
                            {
                                question: "Do you offer discounts for nonprofits or education?",
                                answer: "Yes! We offer 50% off for nonprofits and educational institutions. Contact our sales team for more information."
                            },
                            {
                                question: "What happens when I exceed my plan limits?",
                                answer: "We'll notify you when you're approaching your limits. You can upgrade your plan or we'll help you optimize your usage."
                            },
                            {
                                question: "Can I cancel my subscription anytime?",
                                answer: "Yes, you can cancel anytime. Your subscription will remain active until the end of your billing period."
                            }
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-indigo-600 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-indigo-100 mb-8 text-lg">
                        Join thousands of teams already using Taskly. Start your free trial today.
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
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
