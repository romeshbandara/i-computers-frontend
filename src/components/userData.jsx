import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../lib/api";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";


export default function UserData() {

    const userData = useContext(UserContext)
    
    const [selection, setSelection] = useState("name")
    const navigate = useNavigate()
    const location = useLocation()

    

    useEffect(()=>{
        if(location.pathname === "/settings"){
            setSelection("settings")
        }else if(location.pathname === "/my-orders"){
            setSelection("my-orders")
        }else{
            setSelection("name")
        }
    },[location.pathname])

    return (
        <>
            {userData.user == null ? (
                <div className=" text-white p-1 flex gap-4">
                    <Link to="/login" className="border-2 border-white rounded-full px-4 py-2 flex justify-center items-center hover:bg-white hover:text-accent transition-colors duration-100">Login </Link>
                    
                    <Link to="/register" className="border-2 border-white rounded-full px-4 py-2 flex justify-center items-center hover:bg-white hover:text-accent transition-colors duration-100"> Register</Link>
                </div>
            )
                : (
                    <div className=" text-white border-2 border-white rounded-full flex items-center gap-2 overflow-hidden">
                        <img src={userData.user.image} alt="Avatar" className="w-10 h-10 rounded-full" />
                        <select value={selection} onChange={(e)=>{
                            setSelection(e.target.value)
                            if(e.target.value === "settings"){
                                
                                navigate("/settings")
                                
                            }else if(e.target.value === "my-orders"){
                                navigate("/my-orders")
                            }else if(e.target.value === "logout"){
                                localStorage.removeItem("token")
                                userData.setUser(null)
                                navigate("/login")
                            }
                        }} className=" bg-accent text-white p-1 outline-none cursor-pointer">
                            <option value="name" disabled={true}>{userData.user.firstName}</option>
                            <option value="settings">Settings</option>
                            <option value="my-orders">My Orders</option>
                            <option value="logout">Logout</option>
                        </select>
                    </div>
                )}
        </>
    )
}