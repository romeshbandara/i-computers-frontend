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
                    <div className=" text-white p-1 lg:flex hidden gap-4">
                        <Link to="/login" className="border-2 border-white rounded-full px-4 py-2 flex justify-center items-center hover:bg-white hover:text-accent transition-colors duration-100">Login </Link>

                        <Link to="/register" className="border-2 border-white rounded-full px-4 py-2 flex justify-center items-center hover:bg-white hover:text-accent transition-colors duration-100"> Register</Link>
                    </div>
                    <Link to="/login" className="lg:hidden flex flex-col aspect-square items-center justify-center">
                        <CiUser />
                        <span className="text-sm">Login</span>
                    </Link>
                </>
            )
                : (
                    <>
                        <div className="h-full lg:w-auto lg:h-auto w-[80px]  hidden text-white border-2 border-white lg:rounded-full lg:flex lg:flex-row flex-col justify-center items-center  lg:gap-2 overflow-hidden">
                            <img src={userData.user?.image} referrerPolicy="no-referrer" onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/40?text=U"; // Fallback placeholder
                            }} alt="Avatar" className="lg:w-10 lg:h-10 w-5 h-5 rounded-full" />
                            <select value={selection} onChange={(e) => {
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
                            }} className=" lg:bg-accent text-center  lg:text-white text-accent lg:p-1 outline-none cursor-pointer flex  ">
                                <option value="name" disabled={true}>{userData.user.firstName}</option>
                                <option value="settings">Settings</option>
                                <option value="my-orders">My Orders</option>
                                <option value="logout">Logout</option>
                            </select>
                        </div>
                        <Link to="/settings" className="h-full w- lg:hidden flex flex-col justify-center items-center aspect-square ">
                            <img src={userData.user.image} alt={userData.user.firstName} className="w-5 h-5 rounded-full object-cover" />
                            <h1 className="text-sm">me</h1>
                        </Link>
                    </>
                )}
        </>
    )
}