import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import api from "../lib/api";
import LoadingAnimation from "../src/components/loadingAnimation";

export default function RegisterPage(){

    const [email , setEmail] = useState("") 
    const [firstName , setFirstName] = useState("")
    const [lastName , setLastName] = useState("")
    const [password , setPassword] = useState("")
    const [confirmPassword , setConfirmPassword] = useState("")
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate()

function handleRegister(){

    setLoading(true)

    if(password !== confirmPassword){
        toast.error("Passwords do not match")
        setLoading(false)
        return
    }

    api.post("/users/" ,
        {
            email : email,
            firstName : firstName,
            lastName : lastName,
            password : password

        }
    ).then((res) => 
    {
        toast.success("Registration successful")
        navigate("/login")
        
    }
    ).catch((err) =>
    {
        console.log(err);
        toast.error("Registration failed");
        setLoading(false)
    })
}

    return (
        <main className="w-full min-h-screen bg-[#020817] text-white flex justify-center items-center relative overflow-hidden p-4">
            {/* Ambient Glows */}
            <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-blue-600/15 blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[10%] left-[10%] w-[450px] h-[450px] bg-purple-600/15 blur-[150px] rounded-full pointer-events-none" />

            {loading && <LoadingAnimation />}

            <div className="w-full max-w-[440px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col items-center gap-3 relative z-10">
                <Link to="/">
                    <img src="/logo.webp" alt="Isuri Computers" className="h-12 object-contain mb-1 hover:scale-105 transition-transform" />
                </Link>
                <h1 className="text-2xl font-black text-white mb-2">
                    Create <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Account</span>
                </h1>

                <div className="w-full flex flex-col gap-1">
                    <label className="w-full text-xs font-medium text-gray-300">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email"
                        className="w-full h-[42px] text-white rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none px-3.5 text-sm placeholder-gray-500"
                    />
                </div>

                <div className="w-full flex flex-row gap-2">
                    <div className="w-1/2 flex flex-col gap-1">
                        <label className="w-full text-xs font-medium text-gray-300">First Name</label>
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text"
                            placeholder="First name"
                            className="w-full h-[42px] text-white rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none px-3.5 text-sm placeholder-gray-500"
                        />
                    </div>
                    <div className="w-1/2 flex flex-col gap-1">
                        <label className="w-full text-xs font-medium text-gray-300">Last Name</label>
                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            type="text"
                            placeholder="Last name"
                            className="w-full h-[42px] text-white rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none px-3.5 text-sm placeholder-gray-500"
                        />
                    </div>
                </div>

                <div className="w-full flex flex-col gap-1">
                    <label className="w-full text-xs font-medium text-gray-300">Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        autoComplete="new-password"
                        placeholder="Enter your password"
                        className="w-full h-[42px] text-white rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none px-3.5 text-sm placeholder-gray-500"
                    />
                </div>

                <div className="w-full flex flex-col gap-1">
                    <label className="w-full text-xs font-medium text-gray-300">Confirm Password</label>
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleRegister();
                            }
                        }}
                        type="password"
                        autoComplete="new-password"
                        placeholder="Confirm your password"
                        className="w-full h-[42px] text-white rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none px-3.5 text-sm placeholder-gray-500"
                    />
                </div>

                <button
                    onClick={handleRegister}
                    className="w-full h-[44px] bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-bold text-white rounded-xl mt-3 shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer text-sm"
                >
                    Create Account
                </button>

                <p className="w-full text-center text-xs text-gray-400 mt-2">
                    Already have an account?{" "}
                    <Link to="/login" className="text-cyan-400 font-semibold hover:underline">
                        Login
                    </Link>
                </p>

                <div className="w-full flex items-center gap-3 my-2">
                    <div className="flex-1 h-[1px] bg-white/10" />
                    <span className="text-[11px] text-gray-500 uppercase tracking-wider">or</span>
                    <div className="flex-1 h-[1px] bg-white/10" />
                </div>

                <button className="w-full h-[42px] bg-white/5 text-gray-200 border border-white/10 font-medium rounded-xl flex items-center justify-center gap-3 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer text-xs">
                    <FcGoogle className="text-base" />
                    <span>Register with Google</span>
                </button>
            </div>
        </main>
    )
}
