import { BsCartFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import UserData from "./userData"
import { CiBoxList, CiHome, CiPhone, CiShoppingCart, CiUser } from "react-icons/ci"


export default function Header() {
    return (
        <>
            <header className="w-full h-[100px] bg-accent flex lg:justify-between justify-center text-white p-4">

                <Link className="h-full  flex items-center" to="/" ><img src="logo.webp" alt="logo" className="h-[100px] w-[200px] object-cover" /></Link>
                <div className="h-full text-primary lg:flex gap-8 hidden">
                    <Link to="/" className="h-full w-full flex items-center justify-center"> Home </Link>
                    <Link to="/products" className="h-full w-full flex items-center justify-center"> Products </Link>
                    <Link to="/about" className="h-full w-full flex items-center justify-center"> About </Link>
                </div>
                <div className="h-full  lg:flex items-center   justify-evenly gap-8 mr-[20px] hidden">
                    <Link to="/cart" className="text-3xl"><BsCartFill /></Link>
                    <UserData />
                </div>

            </header>
            {/* mobile */}
            <div className="w-screen h-[80px] bg-white shadow-2xl shadow-black fixed bottom-0 z-30 flex lg:hidden justify-evenly">
                <Link to="/" className="h-full flex flex-col items-center justify-center aspect-square ">
                    <CiHome />
                    <span className="text-sm text-accent">Home</span>
                </Link>
                <Link to="/products" className="h-full flex flex-col items-center justify-center aspect-square">
                    <CiBoxList />
                    <span className="text-sm text-accent">Products</span>
                </Link>
                <Link to="/cart" className="h-full flex flex-col items-center justify-center aspect-square ">
                    <CiShoppingCart />
                    <span className="text-sm text-accent">Cart</span>
                </Link>
                <Link to="/contact" className="h-full flex flex-col items-center justify-center aspect-square ">
                    <CiPhone />
                    <span className="text-sm text-accent">Contact</span>
                </Link>
                <UserData/>
            </div>
        </>
    )
}