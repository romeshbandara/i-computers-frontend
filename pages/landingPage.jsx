// export default function LandingPage() {
//     return (
//         <>
//             <div className="w-full h-screen bg-primary lg:flex items-center justify-center relative hidden">
//                 <video src="/720p.mp4" autoPlay loop muted className="w-full h-full object-cover absolute top-0 left-0 z-0" />
//                 <div className="w-full h-full absolute top-0 left-0 z-10 bg-black/50 flex flex-col justify-center items-center gap-4">
//                     <h1 className="text-4xl lg:text-6xl text-white font-bold">Welcome to Isuri Computers</h1>
//                     <p className="text-white text-lg lg:text-2xl">Your one-stop shop for all your computer needs</p>
//                     <button className="bg-accent text-white px-4 py-2 rounded-lg text-lg lg:text-xl hover:bg-black transition-colors"><a href="/products">Shop Now</a></button>
//                 </div>
//             </div>
//             <div className="w-full h-screen bg-primary flex items-center justify-center lg:hidden relative">
//                 <video src="/720p.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover absolute top-0 left-0 z-0" />
//                 <div className="w-full h-full absolute top-0 left-0 z-10 bg-black/50 flex flex-col items-center gap-4">
//                     <div className="w-[80%] h-full fixed top-0 flex flex-col justify-center items-center">
//                         <h1 className="text-4xl lg:text-6xl text-white font-bold text-center">Welcome to Isuri Computers</h1>
//                         <p className="text-white text-lg lg:text-2xl text-center mt-4">Your one-stop shop for all your computer needs</p>
//                         <button className="bg-accent text-white px-4 py-2 rounded-lg text-lg lg:text-xl hover:bg-black transition-colors mt-10"><a href="/products">Shop Now</a></button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

import {
    FiTruck,
    FiShield,
    FiHeadphones,
    FiTag,
    FiArrowRight,
    FiShoppingCart,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-[#020817] text-white pb-30">

            {/* ================= HERO ================= */}
            <section className="relative min-h-screen overflow-hidden flex items-center">

                {/* Background Video */}
                <video
                    src="/720p.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#020817]/75" />

                {/* Blue glow */}
                <div
                    className="absolute top-[20%] right-[5%]
                    w-[500px] h-[500px]
                    bg-blue-600/20 blur-[150px] rounded-full"
                />

                {/* Purple glow */}
                <div
                    className="absolute bottom-0 left-[20%]
                    w-[400px] h-[300px]
                    bg-purple-600/20 blur-[130px] rounded-full"
                />

                {/* ================= HERO CONTENT ================= */}
                <div
                    className="relative z-10 w-full max-w-[1500px]
                    mx-auto px-6 lg:px-10 pt-[100px]"
                >

                    <div className="grid lg:grid-cols-2 gap-10 items-center">

                        {/* LEFT CONTENT */}
                        <div className="max-w-[700px]">

                            {/* Small heading */}
                            <div className="flex items-center gap-4 mb-6">

                                <span
                                    className="text-cyan-400 font-semibold
                                    tracking-[5px] text-sm"
                                >
                                    BUILD / UPGRADE / PERFORM
                                </span>

                                <div
                                    className="hidden sm:block
                                    w-28 h-[1px] bg-cyan-400"
                                />

                            </div>


                            {/* Main heading */}
                            <h1
                                className="text-5xl sm:text-6xl lg:text-7xl
                                font-black leading-[1.05]"
                            >
                                Welcome to

                                <span
                                    className="block mt-2
                                    bg-gradient-to-r
                                    from-cyan-400
                                    via-blue-500
                                    to-purple-500
                                    bg-clip-text text-transparent"
                                >
                                    Isuri Computers
                                </span>
                            </h1>


                            {/* Description */}
                            <p
                                className="text-xl lg:text-2xl
                                text-gray-200 mt-7"
                            >
                                Your one-stop shop for all your computer needs.
                            </p>

                            <p
                                className="text-gray-400 text-base
                                lg:text-lg max-w-[600px]
                                mt-4 leading-7"
                            >
                                Premium laptops, desktops, gaming gear,
                                accessories and more — with trusted quality
                                and great value.
                            </p>


                            {/* Buttons */}
                            <div className="flex flex-wrap gap-4 mt-8">

                                <Link
                                    to="/products"
                                    className="group flex items-center
                                    gap-3 px-7 py-4 rounded-full
                                    bg-gradient-to-r from-cyan-500
                                    via-blue-600 to-purple-600
                                    font-semibold text-lg
                                    shadow-xl shadow-blue-600/30
                                    hover:scale-105
                                    transition-all duration-300"
                                >
                                    <FiShoppingCart size={21} />

                                    Shop Now

                                    <FiArrowRight
                                        className="group-hover:translate-x-1
                                        transition"
                                    />
                                </Link>


                                <Link
                                    to="/products"
                                    className="px-7 py-4 rounded-full
                                    border border-white/20
                                    bg-white/5 backdrop-blur-md
                                    hover:bg-white/10
                                    transition"
                                >
                                    Explore Products
                                </Link>

                            </div>

                        </div>


                        {/* RIGHT COMPUTER VISUAL */}
                        <div
                            className="hidden lg:flex relative
                            h-[520px] items-center justify-center"
                        >

                            <div
                                className="absolute w-[450px] h-[450px]
                                rounded-full bg-blue-600/20
                                blur-[100px]"
                            />

                            <div
                                className="relative w-[500px] h-[380px]
                                rounded-3xl
                                border border-white/10
                                bg-white/5 backdrop-blur-sm
                                shadow-2xl shadow-blue-900/30
                                overflow-hidden"
                            >

                                {/* Monitor */}
                                <div
                                    className="absolute top-8 left-10
                                    w-[290px] h-[180px]
                                    rounded-xl border-4 border-gray-800
                                    bg-gradient-to-br
                                    from-blue-600 via-purple-700 to-black
                                    shadow-2xl shadow-blue-500/30"
                                >
                                    <div
                                        className="w-full h-full
                                        flex items-center justify-center
                                        text-5xl"
                                    >
                                        ⚡
                                    </div>
                                </div>


                                {/* PC Case */}
                                <div
                                    className="absolute right-8 top-10
                                    w-[140px] h-[260px]
                                    rounded-xl
                                    border border-purple-400/30
                                    bg-black/80
                                    shadow-xl shadow-purple-500/20"
                                >

                                    <div
                                        className="flex flex-col gap-4
                                        items-center justify-center h-full"
                                    >

                                        <div
                                            className="w-16 h-16 rounded-full
                                            border-4 border-cyan-400
                                            shadow-[0_0_25px_#22d3ee]"
                                        />

                                        <div
                                            className="w-16 h-16 rounded-full
                                            border-4 border-purple-500
                                            shadow-[0_0_25px_#a855f7]"
                                        />

                                        <div
                                            className="w-16 h-16 rounded-full
                                            border-4 border-blue-500
                                            shadow-[0_0_25px_#3b82f6]"
                                        />

                                    </div>

                                </div>


                                {/* Laptop */}
                                <div
                                    className="absolute bottom-8 left-16
                                    w-[260px] h-[100px]
                                    rounded-xl
                                    bg-gradient-to-br
                                    from-gray-800 to-gray-950
                                    border border-blue-400/20
                                    rotate-[-4deg]
                                    shadow-xl shadow-blue-500/20"
                                >

                                    <div
                                        className="absolute top-3 left-8
                                        right-8 h-[55px]
                                        rounded-lg
                                        bg-gradient-to-br
                                        from-blue-600 to-purple-600"
                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ================= FEATURES ================= */}
                    <div
                        className="mt-14 lg:mt-10
                        grid grid-cols-2 lg:grid-cols-4
                        border-t border-white/10
                        pt-7 pb-8"
                    >

                        <Feature
                            icon={<FiTruck />}
                            title="Fast Delivery"
                            text="Islandwide shipping"
                        />

                        <Feature
                            icon={<FiShield />}
                            title="Trusted Products"
                            text="Quality & warranty"
                        />

                        <Feature
                            icon={<FiHeadphones />}
                            title="Expert Support"
                            text="We're here to help"
                        />

                        <Feature
                            icon={<FiTag />}
                            title="Best Prices"
                            text="More value for money"
                        />

                    </div>

                </div>


                {/* Bottom line */}
                <div
                    className="absolute bottom-0 left-0 w-full h-[3px]
                    bg-gradient-to-r from-purple-600
                    via-blue-500 to-cyan-400"
                />

            </section>


            {/* ================= CATEGORY SECTION ================= */}
            <section className="bg-[#020817] py-20 px-6">

                <div className="max-w-[1300px] mx-auto">

                    <div
                        className="flex flex-col sm:flex-row
                        justify-between sm:items-end
                        gap-5 mb-10"
                    >

                        <div>

                            <p
                                className="text-cyan-400
                                tracking-[4px] text-sm
                                font-semibold mb-3"
                            >
                                SHOP BY CATEGORY
                            </p>

                            <h2 className="text-4xl lg:text-5xl font-bold">
                                Find What You Need
                            </h2>

                        </div>


                        <Link
                            to="/products"
                            className="flex items-center gap-2
                            text-cyan-400
                            hover:text-white transition"
                        >
                            View All Products
                            <FiArrowRight />
                        </Link>

                    </div>


                    {/* Categories */}
                    <div
                        className="grid sm:grid-cols-2
                        lg:grid-cols-4 gap-5"
                    >

                        <Category
                            title="Laptops"
                            icon="💻"
                            gradient="from-cyan-500/20 to-blue-600/20"
                        />

                        <Category
                            title="Desktops"
                            icon="🖥️"
                            gradient="from-blue-500/20 to-purple-600/20"
                        />

                        <Category
                            title="Gaming Gear"
                            icon="🎮"
                            gradient="from-purple-500/20 to-pink-600/20"
                        />

                        <Category
                            title="Accessories"
                            icon="⌨️"
                            gradient="from-pink-500/20 to-blue-600/20"
                        />

                    </div>

                </div>

            </section>

        </main>
    );
}


/* ================= FEATURE ================= */

function Feature({ icon, title, text }) {
    return (
        <div
            className="flex items-center gap-4
            px-4 lg:px-7 py-4
            border-r border-white/10
            last:border-r-0"
        >

            <div
                className="text-3xl text-blue-500
                drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]"
            >
                {icon}
            </div>

            <div>

                <h3 className="font-semibold text-sm lg:text-base">
                    {title}
                </h3>

                <p className="text-gray-500 text-xs lg:text-sm mt-1">
                    {text}
                </p>

            </div>

        </div>
    );
}


/* ================= CATEGORY ================= */

function Category({ title, icon, gradient }) {
    return (
        <Link
            to="/products"
            className={`group relative overflow-hidden
            h-[180px] rounded-2xl
            border border-white/10
            bg-gradient-to-br ${gradient}
            p-6 flex flex-col justify-between
            hover:border-cyan-400/50
            hover:-translate-y-1
            transition-all duration-300`}
        >

            <div className="text-5xl">
                {icon}
            </div>

            <div className="flex justify-between items-center">

                <h3 className="text-xl font-semibold">
                    {title}
                </h3>

                <FiArrowRight
                    className="text-cyan-400
                    group-hover:translate-x-2
                    transition-transform"
                    size={22}
                />

            </div>``

        </Link>
    );
}