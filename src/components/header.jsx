import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header className="w-full h-[100px] bg-accent flex justify-between text-white p-4">
            <Link to="/" className="h-full  flex items-center">
                <img src="logo.webp" alt="logo" className="h-[100px] w-[200px] object-cover"/>
            </Link>
            <div className="h-full text-primary flex gap-8">
                <Link to="/" className="h-full w-full flex items-center justify-center"> Home </Link>
                <Link to="/products" className="h-full w-full flex items-center justify-center"> Products </Link>
                <Link to="/about" className="h-full w-full flex items-center justify-center"> About </Link>
            </div>
            <div className="h-full bg-white w-[200px] ">

            </div>
        </header>
    )
}