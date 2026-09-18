import { Link } from "react-router-dom"
import { FiHome, FiArrowRight } from "react-icons/fi"

export default function NotFoundPage() {
    return (
        <main className="min-h-[80vh] flex flex-col items-center justify-center bg-[#020817] text-white px-6 relative overflow-hidden text-center pb-24">
            {/* Ambient Background Glows */}
            <div className="absolute top-[20%] left-[25%] w-[450px] h-[450px] bg-blue-600/15 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[20%] right-[25%] w-[450px] h-[450px] bg-purple-600/15 blur-[140px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-xl mx-auto">
                <div className="text-8xl sm:text-9xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(34,211,238,0.4)]">
                    404
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold mt-4">
                    Signal Lost: Page Not Found
                </h1>
                <p className="text-gray-400 text-sm sm:text-base mt-3 leading-relaxed">
                    The hardware address or page you are attempting to access does not exist or has been relocated to another sector.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-semibold text-sm shadow-lg shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all"
                    >
                        <FiHome />
                        <span>Back to Home</span>
                    </Link>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-sm font-semibold hover:border-cyan-400/50 hover:bg-white/10 transition-all"
                    >
                        <span>Browse Products</span>
                        <FiArrowRight />
                    </Link>
                </div>
            </div>
        </main>
    )
}
