import { BsCartFill } from "react-icons/bs"
import { Link, useLocation } from "react-router-dom"
import UserData from "./userData"
import { CiBoxList, CiHome, CiPhone, CiShoppingCart } from "react-icons/ci"

export default function Header() {
    const location = useLocation();

    const isActive = (path) => {
        if (path === "/" && location.pathname === "/") return true;
        if (path !== "/" && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <>
            {/* Desktop Header */}
            <header className="w-full h-[85px] bg-[#020817]/85 backdrop-blur-xl border-b border-white/10 flex justify-between items-center text-white px-6 lg:px-12 sticky top-0 z-40">
                <Link className="h-full flex items-center group" to="/">
                    <img src="/logo.webp" alt="Isuri Computers" className="h-[150px] object-contain transition-transform duration-300 group-hover:scale-105" />
                </Link>

                <nav className="h-full lg:flex items-center gap-8 hidden">
                    <Link
                        to="/"
                        className={`h-full flex items-center font-medium text-sm transition-colors relative ${
                            isActive("/")
                                ? "text-cyan-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500 after:shadow-[0_0_8px_#22d3ee]"
                                : "text-gray-300 hover:text-white"
                        }`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/products"
                        className={`h-full flex items-center font-medium text-sm transition-colors relative ${
                            isActive("/products")
                                ? "text-cyan-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500 after:shadow-[0_0_8px_#22d3ee]"
                                : "text-gray-300 hover:text-white"
                        }`}
                    >
                        Products
                    </Link>
                    <Link
                        to="/about"
                        className={`h-full flex items-center font-medium text-sm transition-colors relative ${
                            isActive("/about")
                                ? "text-cyan-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500 after:shadow-[0_0_8px_#22d3ee]"
                                : "text-gray-300 hover:text-white"
                        }`}
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className={`h-full flex items-center font-medium text-sm transition-colors relative ${
                            isActive("/contact")
                                ? "text-cyan-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500 after:shadow-[0_0_8px_#22d3ee]"
                                : "text-gray-300 hover:text-white"
                        }`}
                    >
                        Contact
                    </Link>
                </nav>

                <div className="h-full lg:flex items-center gap-6 hidden">
                    <Link
                        to="/cart"
                        
                        className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-cyan-400 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all"
                        aria-label="Cart"
                    >
                        <BsCartFill className="text-xl" />
                    </Link>
                    <UserData />
                </div>
            </header>

            {/* Mobile Bottom Navigation */}
            <nav className="w-screen h-[70px] bg-[#020817]/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-5px_25px_rgba(0,0,0,0.5)] fixed bottom-0 left-0 z-40 flex lg:hidden justify-evenly items-center">
                <Link
                    to="/"
                    className={`h-full flex flex-col items-center justify-center aspect-square transition-all ${
                        isActive("/") ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]" : "text-gray-400 hover:text-gray-200"
                    }`}
                >
                    <CiHome className="text-2xl" />
                    <span className="text-[11px] font-medium mt-0.5">Home</span>
                </Link>
                <Link
                    to="/products"
                    className={`h-full flex flex-col items-center justify-center aspect-square transition-all ${
                        isActive("/products") ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]" : "text-gray-400 hover:text-gray-200"
                    }`}
                >
                    <CiBoxList className="text-2xl" />
                    <span className="text-[11px] font-medium mt-0.5">Products</span>
                </Link>
                <Link
                    to="/cart"
                    className={`h-full flex flex-col items-center justify-center aspect-square transition-all ${
                        isActive("/cart") ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]" : "text-gray-400 hover:text-gray-200"
                    }`}
                >
                    <CiShoppingCart className="text-2xl" />
                    <span className="text-[11px] font-medium mt-0.5">Cart</span>
                </Link>
                <Link
                    to="/contact"
                    className={`h-full flex flex-col items-center justify-center aspect-square transition-all ${
                        isActive("/contact") ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]" : "text-gray-400 hover:text-gray-200"
                    }`}
                >
                    <CiPhone className="text-2xl" />
                    <span className="text-[11px] font-medium mt-0.5">Contact</span>
                </Link>
                <UserData />
            </nav>
        </>
    )
}