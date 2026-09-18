import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import LoadingAnimation from "../src/components/loadingAnimation"
import toast from "react-hot-toast"
import api from "../lib/api"

export default function ResetPasswordPage() {

    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [otp, setOtp] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isOtpSent, setIsOtpSent] = useState(false)
    const navigate = useNavigate()
    async function handleOTPRequest() {
        setIsLoading(true)

        try {
            await api.post("/users/otp", { email: email })
            setIsOtpSent(true)
        } catch (err) {
            setIsLoading(false)
            console.log(err.response.data.message)
            toast.error(err.response.data.message)
            
        }
        setIsLoading(false)
    }

    async function handlePasswordReset() {
        setIsLoading(true)
        try {
            if (password == confirmPassword) {

                await api.post("/users/reset-password", { email: email, otp: otp, newPassword: password })
                navigate("/login")

            } else {
                toast.error("Password is not matching")
                setIsLoading(false)
            }

        } catch (err) {
            console.log(err.response.data.message)
            toast.error(err.response?.data?.message || "Something went wrong!")
            setIsLoading(false)
        }
    }

    return (
        <main className="w-full min-h-screen flex justify-center items-center bg-[#020817] text-white relative overflow-hidden p-4">
            {/* Ambient Background Glows */}
            <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-blue-600/15 blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] bg-purple-600/15 blur-[150px] rounded-full pointer-events-none" />

            {!isOtpSent ? (
                <div className="w-full max-w-[400px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col items-center gap-4 relative z-10">
                    <Link to="/">
                        <img src="/logo.webp" alt="Isuri Computers" className="h-12 object-contain mb-1 hover:scale-105 transition-transform" />
                    </Link>
                    <h1 className="text-2xl font-black text-white">
                        Reset <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Password</span>
                    </h1>
                    <p className="text-xs text-gray-400 text-center -mt-2 mb-2">
                        Enter your account email to receive a recovery code.
                    </p>

                    <div className="w-full flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-xs font-medium text-gray-300">Email Address</label>
                        <input
                            type="email"
                            placeholder="you@domain.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none text-sm transition-all"
                        />
                    </div>

                    <button
                        onClick={handleOTPRequest}
                        className="w-full h-11 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-bold text-white rounded-xl mt-3 shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer text-sm"
                    >
                        Send Reset Code
                    </button>

                    <Link to="/login" className="text-xs text-cyan-400 font-semibold hover:underline mt-2">
                        Back to Login
                    </Link>
                </div>
            ) : (
                <div className="w-full max-w-[400px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col items-center gap-4 relative z-10">
                    <h1 className="text-2xl font-black text-white">
                        Enter <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Code</span>
                    </h1>
                    <span className="text-xs text-cyan-400 font-mono -mt-2">{email}</span>

                    <div className="w-full flex flex-col gap-1.5">
                        <label htmlFor="otp" className="text-xs font-medium text-gray-300">OTP Code</label>
                        <input
                            type="text"
                            placeholder="Enter 6-digit code"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none text-sm font-mono tracking-widest transition-all"
                        />
                    </div>

                    <div className="w-full flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-gray-300">New Password</label>
                        <input
                            type="password"
                            placeholder="Enter your new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none text-sm transition-all"
                        />
                    </div>

                    <div className="w-full flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-gray-300">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm your new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none text-sm transition-all"
                        />
                    </div>

                    <button
                        onClick={handlePasswordReset}
                        className="w-full h-11 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-bold text-white rounded-xl mt-3 shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer text-sm"
                    >
                        Confirm New Password
                    </button>

                    <Link to="/login" className="text-xs text-cyan-400 font-semibold hover:underline mt-2">
                        Back to Login
                    </Link>
                </div>
            )}

            {isLoading && <LoadingAnimation />}
        </main>
    )
}