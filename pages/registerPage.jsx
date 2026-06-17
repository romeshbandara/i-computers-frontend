import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import api from "../lib/api";

export default function RegisterPage(){

    const [email , setEmail] = useState("") 
    const [firstName , setFirstName] = useState("")
    const [lastName , setLastName] = useState("")
    const [password , setPassword] = useState("")
    const [confirmPassword , setConfirmPassword] = useState("")
    const navigate = useNavigate()

function handleRegister(){

    if(password !== confirmPassword){
        toast.error("Passwords do not match")
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
    })
}

    return(
        <div className="w-full h-full bg-[url(/bg.jpg)] bg-cover flex justify-center items-center">

            <div className="w-[420px] backdrop-blur-md shadow-2xl rounded-lg p-6 flex items-center flex-col gap-3">

                <img src="logo.webp" className="w-[120px] h-[70px] object-cover bg-accent/40 rounded-lg mb-1" />
                

                <div className="w-full flex flex-col gap-1">
                    <label className="w-full text-base text-white">Email</label>
                    <input
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                    type="email" autoComplete="email" placeholder="Enter your email" className="w-full h-[40px] text-primary rounded-lg bg-secondary/20 border-2 border-accent/30 focus:border-accent outline-none p-2" />
                </div>
                
                <div className="w-full flex flex-row gap-2">

                    <div className="w-1/2 flex flex-col gap-1">
                
                        <label className="w-full text-base text-white">First Name</label>
                        <input
                        value={firstName}
                        onChange={(e)=>{
                        setFirstName(e.target.value);
                        }}

                        type="text" placeholder="Enter your first name" className="w-full h-[40px] text-primary  rounded-lg bg-secondary/20 border-2 border-accent/30 focus:border-accent outline-none p-2 " />


                    </div>

                    <div className="w-1/2 flex flex-col gap-1">

                     <label className="w-full text-base text-white">Last Name</label>
                        <input
                        value={lastName}
                        onChange={(e)=>{
                        setLastName(e.target.value);
                        }}

                        type="text" placeholder="Enter your last name" className="w-full h-[40px] text-primary  rounded-lg bg-secondary/20 border-2 border-accent/30 focus:border-accent outline-none p-2 " />


                    </div>

                </div>

                <div className="w-full flex flex-col gap-1">
                    <label className="w-full text-base text-white">Password</label>
                    <input
                        value={password}
                        onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        type="password" autoComplete="new-password" placeholder="Enter your password" className="w-full h-[40px] text-primary rounded-lg bg-secondary/20 border-2 border-accent/30 focus:border-accent outline-none p-2 " />
                </div>
                
                <div className="w-full flex flex-col gap-1">
                    <label className="w-full text-base text-white">Confirm Password</label>
                    <input
                        value={confirmPassword}
                        onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                        type="password" autoComplete="new-password" placeholder="Confirm your password" className="w-full h-[40px] text-primary rounded-lg bg-secondary/20 border-2 border-accent/30 focus:border-accent outline-none p-2 " />
                </div>

                <button onClick={handleRegister} className="w-full h-[40px] bg-accent text-primary font-bold rounded-lg mt-1 hover:bg-accent/80 cursor-pointer">Register</button>
                
                <p className="w-full text-right text-sm">Already have an account? <Link to="/login" className="text-accent font-bold hover:underline">Login</Link></p>
                
                <button className="w-full h-[40px] bg-secondary/50 text-primary font-bold rounded-lg border-2 border-secondary flex items-center justify-center gap-3 hover:bg-secondary/70 cursor-pointer">
                    <FcGoogle />Login with Google
                </button>

            </div>

        </div>
    )


}
