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
        <div className="w-full h-full flex justify-center items-center bg-primary">
            {!isOtpSent ? <div className="w-[400px] h-[400px] bg-white flex flex-col justify-center items-center gap-4 rounded-xl">
                <h1 className="text-2xl font-bold">Reset Password</h1>
                <div className="w-[80%] flex flex-col gap-2">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input type="email" placeholder="Enter your email address" value={email} onChange={(e) => { setEmail(e.target.value) }} className="w-full h-10 border-2 border-accent rounded-md p-2 " />
                </div>
                <button onClick={handleOTPRequest} className="w-[80%] h-10 bg-accent text-white rounded-md">Reset Password</button>
                <Link to="/login" className="text-accent">Back to Login</Link>
            </div>

                :

                <div className="w-[400px]  bg-white flex flex-col justify-center items-center gap-4 py-6 rounded-xl">
                    <h1 className="text-2xl font-bold">Reset Password</h1>
                    <h2 className="text-sm text-gray-500">{email}</h2>
                    <div className="w-[80%] flex flex-col gap-2">
                        <label htmlFor="otp" className="font-semibold">OTP</label>
                        <input type="text" placeholder="Enter your OTP" value={otp} onChange={(e) => { setOtp(e.target.value) }} className="w-full h-10 border-2 border-accent rounded-md p-2 " />
                    </div>
                    <div className="w-[80%] flex flex-col gap-2">
                        <label htmlFor="otp" className="font-semibold">New Password</label>
                        <input type="password" placeholder="Enter your new password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="w-full h-10 border-2 border-accent rounded-md p-2 " />
                    </div>
                    <div className="w-[80%] flex flex-col gap-2">
                        <label htmlFor="otp" className="font-semibold">Confirm Password</label>
                        <input type="password" placeholder="Enter your new password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} className="w-full h-10 border-2 border-accent rounded-md p-2 " />
                    </div>
                    <button onClick={handlePasswordReset} className="w-[80%] h-10 bg-accent text-white rounded-md">Reset Password</button>
                    <Link to="/login" className="text-accent">Back to Login</Link>
                </div>}


            {isLoading && <LoadingAnimation />}
        </div>
    )
}