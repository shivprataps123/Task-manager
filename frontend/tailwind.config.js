/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {

            // 🔤 FONT
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },

            // 🎨 COLORS (DESIGN SYSTEM)
            colors: {
                primary: {
                    DEFAULT: "#4f46e5", // indigo-600
                    hover: "#4338ca",   // indigo-700
                },

                background: "#f9fafb", // gray-50
                card: "#ffffff",

                text: {
                    primary: "#111827",   // gray-900
                    secondary: "#6b7280", // gray-500
                    muted: "#9ca3af",     // gray-400
                },

                border: "#e5e7eb", // gray-200

                status: {
                    todo: "#9ca3af",       // gray
                    progress: "#3b82f6",   // blue
                    done: "#22c55e",       // green
                    blocked: "#ef4444",    // red
                },
            },

            // 🧱 SPACING / UI FEEL
            borderRadius: {
                xl: "0.75rem",
                "2xl": "1rem",
            },

            boxShadow: {
                card: "0 1px 3px rgba(0,0,0,0.08)",
            },
        },
    },
    plugins: [],
};