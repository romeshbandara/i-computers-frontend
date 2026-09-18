import { Link } from "react-router-dom"
import { FiArrowRight, FiShield, FiCpu, FiAward, FiCheckCircle } from "react-icons/fi"

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#020817] text-white relative overflow-hidden pb-24">
            {/* Ambient Background Glows */}
            <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-blue-600/15 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute top-[40%] right-[10%] w-[450px] h-[450px] bg-purple-600/15 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-[1300px] mx-auto px-6 lg:px-12 pt-12">
                {/* Hero Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-6">
                        Pioneering Computing Excellence
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                        About <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Isuri Computers</span>
                    </h1>
                    <p className="text-gray-300 text-base sm:text-lg mt-6 leading-relaxed">
                        We are committed to delivering cutting-edge computer systems, gaming gear, and tech accessories with unmatched reliability, islandwide delivery, and expert support.
                    </p>
                </div>

                {/* Stats Counters */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
                    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center hover:border-cyan-400/40 transition-all">
                        <div className="text-3xl sm:text-4xl font-black text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">15K+</div>
                        <p className="text-gray-400 text-xs sm:text-sm mt-2 font-medium">Satisfied Customers</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center hover:border-blue-400/40 transition-all">
                        <div className="text-3xl sm:text-4xl font-black text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]">100%</div>
                        <p className="text-gray-400 text-xs sm:text-sm mt-2 font-medium">Genuine Hardware</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center hover:border-purple-400/40 transition-all">
                        <div className="text-3xl sm:text-4xl font-black text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]">Islandwide</div>
                        <p className="text-gray-400 text-xs sm:text-sm mt-2 font-medium">Express Shipping</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center hover:border-cyan-400/40 transition-all">
                        <div className="text-3xl sm:text-4xl font-black text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">24/7</div>
                        <p className="text-gray-400 text-xs sm:text-sm mt-2 font-medium">Technical Support</p>
                    </div>
                </div>

                {/* Our Story & Mission */}
                <div className="grid lg:grid-cols-2 gap-10 items-center mb-20">
                    <div className="space-y-6">
                        <h2 className="text-3xl sm:text-4xl font-bold">
                            Crafted for Gamers, Builders & Professionals
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            Founded by computer hardware enthusiasts, Isuri Computers started with a simple belief: everyone deserves access to top-tier, reliable technology without the inflated markups.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Whether you are building your dream custom liquid-cooled gaming rig, upgrading an office workstation, or searching for the best laptop for university, our team guides you every step of the way with verified benchmarks and transparent advice.
                        </p>
                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-3 text-sm text-gray-200">
                                <FiCheckCircle className="text-cyan-400 text-lg shrink-0" />
                                <span>Official distributor warranties on all parts</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-200">
                                <FiCheckCircle className="text-cyan-400 text-lg shrink-0" />
                                <span>Free consultation for custom PC configurations</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-200">
                                <FiCheckCircle className="text-cyan-400 text-lg shrink-0" />
                                <span>Safe, shockproof packaging for fragile hardware</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-3xl rounded-full" />
                        <h3 className="text-2xl font-bold mb-6 text-white">Our Core Commitments</h3>
                        <div className="space-y-6">
                            <div className="flex gap-4 items-start">
                                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xl shrink-0">
                                    <FiCpu />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">Peak Performance Gear</h4>
                                    <p className="text-sm text-gray-400 mt-1">We curate only the highest-rated processors, graphics cards, and high-speed memory for sustained workloads.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xl shrink-0">
                                    <FiShield />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">Hassle-Free Warranty</h4>
                                    <p className="text-sm text-gray-400 mt-1">Direct warranty claim assistance and rapid turnaround times so you never experience prolonged downtime.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xl shrink-0">
                                    <FiAward />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">Competitive Pricing</h4>
                                    <p className="text-sm text-gray-400 mt-1">Transparent pricing with regular seasonal promos and exclusive bundle deals for our loyal community.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action Card */}
                <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-black/60 border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-bold">Ready to Upgrade Your Setup?</h3>
                        <p className="text-gray-300 text-sm sm:text-base mt-2 max-w-xl">
                            Browse through our extensive catalog of genuine laptops, desktops, components, and accessories today.
                        </p>
                    </div>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-semibold text-white shadow-lg shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all shrink-0"
                    >
                        <span>Explore Products</span>
                        <FiArrowRight />
                    </Link>
                </div>
            </div>
        </main>
    )
}
