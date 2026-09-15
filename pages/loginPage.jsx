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
        <div className="w-full h-full bg-[url(/bg.jpg)] bg-cover flex justify-center items-center">

            {loading && <LoadingAnimation />}

            <div className="w-[350px] lg:w-[450px] h-[580px] backdrop-blur-md shadow-2xl rounded-lg p-4 flex items-center flex-col">

                <img src="logo.webp" className="w-[150px] h-[90px] object-cover bg-accent/40 rounded-lg mb-4" />
                <h1 className="text-3xl font-bold text-white lg:text-secondary">Login</h1>

                <label className="w-full text-lg text-white  mt-2 mb-2 ">Email</label>
                <input
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}

                    type="email" placeholder="Enter your email" className="w-full h-[40px] text-primary mb-2 rounded-lg bg-secondary/20 border-2 border-accent/30 focus:border-accent outline-none p-2 mb-4" />

                <label className="w-full text-lg text-white  mt-2 mb-2 ">Password</label>
                <input
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}

                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleLogin();
                        }
                    }}

                    type="password" placeholder="Enter your password" className="w-full h-[40px] text-primary mb-2 rounded-lg bg-secondary/20 border-2 border-accent/30 focus:border-accent outline-none p-2 " />
                <p className="w-full text-right text-white lg:text-secondary">Forget Password? reset <Link to="/reset-password" className="text-accent font-bold hover:underline">here</Link></p>

                <button onClick={handleLogin} type="submit" className="w-full h-[40px] bg-accent text-primary font-bold rounded-lg  mt-5 mb-2 hover:bg-accent/80 cursor-pointer">Login</button>
                <p className="w-full text-right text-white lg:text-secondary">Don't have an account? <Link to="/register" className="text-accent font-bold hover:underline">Register</Link></p>

                <button onClick={googleLogin} className="w-full h-[40px] bg-secondary/50 text-primary font-bold rounded-lg border-3 border-secondary mt-5 flex items-center justify-center gap-3 hover:bg-secondary/70 cursor-pointer"><FcGoogle />Login with Google</button>

            </div>



        </div>
    )


}