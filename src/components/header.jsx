import { BsCartFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import UserData from "./userData"


export default function Header() {
    return (
        <header className="w-full h-[100px] bg-accent flex justify-between text-white p-4">
           
            <a href="/" className="h-full  flex items-center"><img src="logo.webp" alt="logo" className="h-[100px] w-[200px] object-cover" /></a>
            <div className="h-full text-primary flex gap-8">
                <Link to="/" className="h-full w-full flex items-center justify-center"> Home </Link>
                <Link to="/products" className="h-full w-full flex items-center justify-center"> Products </Link>
                <Link to="/about" className="h-full w-full flex items-center justify-center"> About </Link>
            </div>
            <div className="h-full  flex items-center   justify-evenly gap-8 mr-[20px]">
                <Link to="/cart" className="text-3xl"><BsCartFill /></Link>
                <UserData />
            </div>
        </header>
    )
}