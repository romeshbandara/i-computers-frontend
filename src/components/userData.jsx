import { Link, useNavigate } from "react-router-dom";
import api from "../../lib/api";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";


export default function UserData() {

    const [user, setUser] = useState(null)
    const [selection, setSelection] = useState("name")
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token != null) {
            api.get("/users/me", {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((res) => {
                setUser(res.data.user)
            }).catch((err) => {
                toast.error(err.response.data.message || "Something went wrong")
                toast.warning("Please login again")
                localStorage.removeItem("token")
                setUser(null)
            })
        }
    }, [])

    return (
        <>
            {user == null ? (
                <div className=" text-white p-1">
                    <Link to="/login">Login </Link>
                    |
                    <Link to="/register"> Register</Link>
                </div>
            )
                : (
                    <div className=" text-white border-2 border-white rounded-full flex items-center gap-2 overflow-hidden">
                        <img src={user.image} alt="Avatar" className="w-10 h-10 rounded-full" />
                        <select value={selection} onChange={(e)=>{
                            setSelection(e.target.value)
                            if(e.target.value === "settings"){
                                navigate("/settings")
                            }else if(e.target.value === "my-orders"){
                                navigate("/my-orders")
                            }else if(e.target.value === "logout"){
                                localStorage.removeItem("token")
                                setUser(null)
                                navigate("/login")
                            }
                        }} className=" bg-accent text-white p-1 outline-none cursor-pointer">
                            <option value="name">{user.firstName}</option>
                            <option value="settings">Settings</option>
                            <option value="my-orders">My Orders</option>
                            <option value="logout">Logout</option>
                        </select>
                    </div>
                )}
        </>
    )
}