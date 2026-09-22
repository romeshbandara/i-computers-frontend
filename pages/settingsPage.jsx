import { useContext, useState } from "react"
import UserContext from "../src/context/userContext"
import toast from "react-hot-toast"
import api from "../lib/api"
import uploadMedia from "../lib/uploadMedia"
import LoadingAnimation from "../src/components/loadingAnimation"
import { Link, useNavigate } from "react-router-dom"

export default function SettingsPage() {

    const userInfo = useContext(UserContext)

    const [firstName, setFirstName] = useState(userInfo.user?.firstName || "")
    const [lastName, setLastName] = useState(userInfo.user?.lastName || "")
    const [image, setImage] = useState(null)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()


    async function handleProfileUpdate() {
        setIsLoading(true)
        const token = localStorage.getItem("token")
        if (token == null) {
            toast.error("Please login first!")
        }

        try {
            const data = {
                firstName: firstName,
                lastName: lastName,
                image: userInfo.user?.image
            }
            if (image != null) {
                data.image = await uploadMedia(image)

            }
            await api.put("/users/profile", data, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((res => {
                //window.location.reload();
                userInfo.setUserLoadingFinished(false)
                toast.success("Profile Updated Successfully!")
                setIsLoading(false)



            })).catch((err) => {
                toast.error("Profile couldn't be update!" + err.response.data.message)
                console.log(err.response.data.error)
                setIsLoading(false)
            })
        } catch (err) {
            toast.error(err.response.data)
            setIsLoading(false)
        }
    }

    async function handlePasswordUpdate() {
        const token = localStorage.getItem("token")

        if (password != confirmPassword) {
            toast.error("Password is not matching!")
            return
        }
        if (token == null) {
            toast.error("Please login first!")
            return
        }
        const data = {
            password: password
        }
        try {
            await api.put("/users/password", data, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((res) => {
                toast.success("Password Changed Successfully!")
                localStorage.removeItem("token")
                userInfo.setUser(null)
                setIsLoading(false)
                navigate("/login")


            }).catch((err) => {
                toast.error("Password Update Failed!")
                console.log(err)
                setIsLoading(false)
            })
        } catch (err) {
            toast.error("Password Update Failed!")
            console.log(err)
            setIsLoading(false)
        }
    }

    return (
        <main className="w-full min-h-[calc(100vh-85px)] bg-[#020817] text-white relative overflow-hidden flex flex-col items-center p-4 sm:p-8 pb-32">
            {/* Ambient Background Glows */}
            <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-blue-600/15 blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] bg-purple-600/15 blur-[150px] rounded-full pointer-events-none" />

            {isLoading && (
                <div className="py-20 flex justify-center items-center">
                    <LoadingAnimation />
                </div>
            )}

            <div className="relative z-10 w-full max-w-[1350px] mx-auto flex flex-col items-center">
                <div className="w-full flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black">
                            Account <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Settings</span>
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Manage your profile details and security credentials.</p>
                    </div>

                    {/* Mobile Quick Action Buttons */}
                    <div className="lg:hidden flex gap-3">
                        <Link
                            to="/my-orders"
                            className="px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-cyan-400 hover:bg-white/20 transition-all"
                        >
                            My Orders
                        </Link>
                        <button
                            onClick={() => {
                                localStorage.removeItem("token")
                                userInfo.setUser(null)
                                navigate("/login")
                            }}
                            className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* User Profile Card */}
                    <div className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl p-6 flex flex-col items-center justify-between">
                        <div className="w-full flex flex-col items-center text-center pb-6 border-b border-white/10">
                            <img
                                src={userInfo.user?.image || "/logo.webp"}
                                alt={userInfo.user?.firstName}
                                referrerPolicy="no-referrer"
                                className="w-24 h-24 rounded-full object-cover border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)] mb-4"
                            />
                            <h2 className="text-xl font-bold text-white">
                                {userInfo.user?.firstName} {userInfo.user?.lastName}
                            </h2>
                            <span className="text-xs text-cyan-400 font-mono mt-1">
                                {userInfo.user?.email}
                            </span>
                        </div>

                        <div className="w-full space-y-3 py-6 text-sm text-gray-300">
                            <div className="flex justify-between items-center py-1 border-b border-white/5">
                                <span className="text-gray-400">Account Role</span>
                                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-xs font-semibold text-white">
                                    {userInfo.user?.isAdmin ? "Admin" : "Customer"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-white/5">
                                <span className="text-gray-400">Account Status</span>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${userInfo.user?.isBlocked ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-green-500/20 text-green-400 border border-green-500/30"}`}>
                                    {userInfo.user?.isBlocked ? "Blocked" : "Active"}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                localStorage.removeItem("token")
                                userInfo.setUser(null)
                                navigate("/login")
                            }}
                            className="w-full py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-bold transition-all cursor-pointer"
                        >
                            Sign Out of Account
                        </button>
                    </div>

                    {/* Update Profile Card */}
                    <div className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl p-6 flex flex-col justify-between">
                        <div>
                            <h2 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                                Edit Personal Info
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1.5">First Name</label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-sm transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Last Name</label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-sm transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Avatar Image</label>
                                    <input
                                        type="file"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleProfileUpdate}
                            className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-bold text-xs sm:text-sm text-white shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                        >
                            Save Profile Changes
                        </button>
                    </div>

                    {/* Change Password Card */}
                    <div className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl p-6 flex flex-col justify-between">
                        <div>
                            <h2 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                                Security & Password
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1.5">New Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-sm transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-sm transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handlePasswordUpdate}
                            className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 font-bold text-xs sm:text-sm text-white shadow-lg shadow-indigo-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                        >
                            Update Password
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}