import { Link } from "react-router-dom"
export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

                {/* 🔷 Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold">
                        T
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                        Taskly
                    </span>
                </div>

                {/* 🔗 Nav Links */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                    <a href="#" className="hover:text-gray-900">Product</a>
                    <a href="#" className="hover:text-gray-900">Solutions</a>
                    <a href="#" className="hover:text-gray-900">Pricing</a>
                    <a href="#" className="hover:text-gray-900">Resources</a>
                </nav>

                {/* 🔐 Auth Buttons */}
                <div className="flex items-center gap-3">
                    <Link
                        to="/login"
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        Login
                    </Link>

                    <Link
                        to="/signup"
                        className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Sign up free
                    </Link>
                </div>
            </div>
        </header>
    );
}