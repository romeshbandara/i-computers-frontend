import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../lib/api";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";
import { CiUser } from "react-icons/ci";


export default function UserData() {

    const userData = useContext(UserContext)

    const [selection, setSelection] = useState("name")
    const navigate = useNavigate()
    const location = useLocation()



    useEffect(() => {
        if (location.pathname === "/settings") {
            setSelection("settings")
        } else if (location.pathname === "/my-orders") {
            setSelection("my-orders")
        } else {
            setSelection("name")
        }
    }, [location.pathname])

    return (
        <>
            {userData.user == null ? (
                <>
                    <div className="text-white lg:flex hidden items-center gap-3">
                        <Link to="/login" className="border border-white/20 bg-white/5 backdrop-blur-md rounded-full px-4 py-1.5 text-sm text-gray-200 hover:text-white hover:border-cyan-400/60 hover:bg-white/10 transition-all">
                            Login
                        </Link>
                        <Link to="/register" className="border border-cyan-500/40 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 rounded-full px-4 py-1.5 text-sm font-semibold hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all">
                            Register
                        </Link>
                    </div>
                    <Link to="/login" className="lg:hidden flex flex-col aspect-square items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors">
                        <CiUser className="text-2xl" />
                        <span className="text-xs mt-1">Login</span>
                    </Link>
                </>
            ) : (
                <>
                    <div className="h-auto hidden text-white border border-white/15 bg-white/5 backdrop-blur-md rounded-full lg:flex items-center gap-2 pl-1 pr-2 py-1 hover:border-cyan-400/50 transition-all">
                        <img src={userData.user?.image || "/logo.webp"} referrerPolicy="no-referrer" alt="Avatar" className="w-8 h-8 rounded-full object-cover border border-cyan-400/40" />
                        <select
                            value={selection}
                            onChange={(e) => {
                                setSelection(e.target.value)
                                if (e.target.value === "settings") {
                                    navigate("/settings")
                                } else if (e.target.value === "my-orders") {
                                    navigate("/my-orders")
                                } else if (e.target.value === "logout") {
                                    localStorage.removeItem("token")
                                    userData.setUser(null)
                                    navigate("/login")
                                }
                            }}
                            className="bg-transparent text-white text-sm font-medium outline-none cursor-pointer pr-1 [&>option]:bg-[#020817] [&>option]:text-white"
                        >
                            <option value="name" disabled={true}>{userData.user.firstName}</option>
                            <option value="settings">Settings</option>
                            <option value="my-orders">My Orders</option>
                            <option value="logout">Logout</option>
                        </select>
                    </div>
                    <Link to="/settings" className="lg:hidden flex flex-col justify-center items-center aspect-square text-gray-400 hover:text-cyan-400 transition-colors">
                        <img src={userData.user.image || "/logo.webp"} alt={userData.user.firstName} className="w-6 h-6 rounded-full object-cover border border-cyan-400/50" />
                        <span className="text-xs mt-1">Me</span>
                    </Link>
                </>
            )}
        </>
    )
}