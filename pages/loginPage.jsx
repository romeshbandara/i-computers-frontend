import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import api from "../lib/api";

export default function LoginPage(){

    const [email , setEmail] = useState("") 
    const [password , setPassword] = useState("")

function handleLogin(){

    // axios.post("http://localhost:3000/users/login" ,
    //     {
    //         email : email,
    //         password : password
    //     }
    // )
    api.post("/users/login" ,
        {
            email : email,
            password : password
        }
    ).then((res) => 
    {
        console.log(res.data.token);
        console.log(res.data.isAdmin);
        toast.success("Login successful");

        //browser store
        localStorage.setItem("token" , res.data.token);    
        
    }
    ).catch((err) =>
    {
        console.log(err);
        toast.error("Login failed");
    })
}

    return(
        <div className="w-full h-full bg-[url(/bg.jpg)] bg-cover flex justify-center items-center">

            <div className="w-[450px] h-[580px] backdrop-blur-md shadow-2xl rounded-lg p-4 flex items-center flex-col">

                <img src="logo.webp" className="w-[150px] h-[90px] object-cover bg-accent/40 rounded-lg mb-4" />
                <h1 className="text-3xl font-bold text-secondary">Login</h1>

                <label className="w-full text-lg text-secondary  mt-2 mb-2 ">Email</label>
                <input
                
                onChange={(e)=>{
                    setEmail(e.target.value);
                }}

                type="email" placeholder="Enter your email" className="w-full h-[40px] text-primary mb-2 rounded-lg bg-secondary/20 border-2 border-accent/30 focus:border-accent outline-none p-2 mb-4" />
                
                <label className="w-full text-lg text-secondary  mt-2 mb-2 ">Password</label>
                <input
                    onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    type="password" placeholder="Enter your password" className="w-full h-[40px] text-primary mb-2 rounded-lg bg-secondary/20 border-2 border-accent/30 focus:border-accent outline-none p-2 " />
                <p className="w-full text-right">Forget Password? reset <Link to="/reset-password" className="text-accent font-bold hover:underline">here</Link></p>
                
                <button onClick={handleLogin}  className="w-full h-[40px] bg-accent text-primary font-bold rounded-lg  mt-5">Login</button>
                <p className="w-full text-right">Don't have an account? <Link to="/register" className="text-accent font-bold hover:underline">Register</Link></p>
                
                <button className="w-full h-[40px] bg-secondary/50 text-primary font-bold rounded-lg border-3 border-secondary mt-5 flex items-center justify-center gap-3"><FcGoogle />Login with Google</button>

            </div>

                

        </div>
    )


}