import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useState, useContext } from "react";
import api from "../lib/api";
import LoadingAnimation from "../src/components/loadingAnimation";
import UserContext from "../src/context/userContext";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {


    const userInfo = useContext(UserContext)
    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            console.log(response)
            api.post("/users/google", {
                accessToken: response.access_token
            }).then(
                (res) => {
                    console.log(res)
                    toast.success("Login Successful")
                    localStorage.setItem("token", res.data.token)
                    userInfo.setUser(res.data.user)
                    if (res.data.isAdmin) {
                        navigate("/admin")
                    } else {
                        navigate("/")
                    }
                }
            ).catch((err)=>{
                console.log(err)
                toast.error("Google login failed")
            })
        },
        onError: (error) => {
            console.log(error)
            toast.error("Google login failed")
        }
    })
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleLogin() {

        // axios.post("http://localhost:3000/users/login" ,
        //     {
        //         email : email,
        //         password : password
        //     }
        // )

        setLoading(true)

        api.post("/users/login/",
            {
                email: email,
                password: password
            }
        ).then((res) => {
            console.log(res.data.token);
            console.log(res.data.isAdmin);
            toast.success("Login successful");

            //browser store
            localStorage.setItem("token", res.data.token);

            userInfo.setUser(res.data.user)

            if (res.data.isAdmin) {
                //admin dashboard
                navigate("/admin")
            } else {
                //home page
                navigate("/")
            }

        }
        ).catch((err) => {
            console.log(err);
            toast.error(err.response.data.message);
            setLoading(false)
        })
    }

    return (
        <main className="w-full min-h-screen bg-[#020817] text-white flex justify-center items-center relative overflow-hidden p-4">
            {/* Ambient Glows */}
            <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-blue-600/15 blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] bg-purple-600/15 blur-[150px] rounded-full pointer-events-none" />

            {loading && <LoadingAnimation />}

            <div className="w-full max-w-[420px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col items-center relative z-10">
                <Link to="/">
                    <img src="/logo.webp" alt="Isuri Computers" className="h-12 object-contain mb-3 hover:scale-105 transition-transform" />
                </Link>
                <h1 className="text-2xl font-black text-white mb-6">
                    Welcome <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Back</span>
                </h1>

                <div className="w-full space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">Email Address</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full h-[44px] text-white rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none px-4 text-sm transition-all placeholder-gray-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleLogin();
                                }
                            }}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full h-[44px] text-white rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none px-4 text-sm transition-all placeholder-gray-500"
                        />
                    </div>
                </div>

                <div className="w-full text-right mt-2">
                    <Link to="/reset-password" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                        Forgot Password?
                    </Link>
                </div>

                <button
                    onClick={handleLogin}
                    type="submit"
                    className="w-full h-[44px] bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold rounded-xl mt-5 shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer text-sm"
                >
                    Sign In
                </button>

                <p className="w-full text-center text-xs text-gray-400 mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-cyan-400 font-semibold hover:underline">
                        Create one here
                    </Link>
                </p>

                <div className="w-full flex items-center gap-3 my-4">
                    <div className="flex-1 h-[1px] bg-white/10" />
                    <span className="text-[11px] text-gray-500 uppercase tracking-wider">or</span>
                    <div className="flex-1 h-[1px] bg-white/10" />
                </div>

                <button
                    onClick={googleLogin}
                    className="w-full h-[44px] bg-white/5 text-gray-200 border border-white/10 font-medium rounded-xl flex items-center justify-center gap-3 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer text-xs"
                >
                    <FcGoogle className="text-base" />
                    <span>Continue with Google</span>
                </button>
            </div>
        </main>
    )


}