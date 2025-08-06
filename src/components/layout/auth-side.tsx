import { useEffect, useState } from "react"
import AuthImage from "@/assets/images/auth-side.png"

export function AuthHero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    return (
        <div className="hidden lg:flex lg:flex-col lg:justify-center items-center lg:px-12 lg:py-12 bg-gradient-to-br from-primary via-primary to-primary/50 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-700/20 animate-pulse" />

            <div
                className="absolute w-64 h-64 bg-white/5 rounded-full blur-xl transition-transform duration-1000 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
                    left: "10%",
                    top: "20%",
                }}
            />
            <div
                className="absolute w-48 h-48 bg-purple-300/10 rounded-full blur-xl transition-transform duration-1000 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
                    right: "15%",
                    bottom: "25%",
                }}
            />

            <div className="relative z-10 max-w-xl w-full animate-fade-in">
                <div className="flex items-center gap-3 mb-8 group cursor-pointer">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transition-all duration-300">
                            <div className="w-4 h-4 bg-white rounded-sm transition-all duration-300 group-hover:rotate-45" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold transition-all duration-300 group-hover:text-blue-100">
                        IMB EDU
                    </h1>
                </div>

                {/* Main heading with staggered animation */}
                <div className="mb-20">
                    <h2 className="text-4xl font-bold leading-tight mb-4 animate-slide-up">
                        Your place to work
                    </h2>
                    <p className="text-xl font-medium text-blue-100 animate-slide-up-delay">
                        Plan. Create. Control.
                    </p>
                </div>

                {/* Illustration with hover effect */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 !text-primary" />
                    <img
                        src={"/images/auth-side.svg"}
                        alt="Person working with kanban board"
                        width={500}
                        height={600}
                        className="w-full max-w-lg transition-transform duration-500 group-hover:scale-105 animate-float text-primary"
                    />
                </div>
            </div>

            {/* Animated decorative elements */}
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 translate-y-16 animate-bounce-slow" />
            <div className="absolute top-1/4 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-12 animate-pulse" />
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-300/20 rounded-full animate-ping" />
        </div>
    )
}
