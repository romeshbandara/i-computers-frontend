import { Route, Routes, Link, useNavigate, replace } from "react-router-dom";
import { useContext } from "react";
import toast from "react-hot-toast";
import { CiShoppingCart } from "react-icons/ci";
import { BsBox } from "react-icons/bs";
import { LuUsersRound } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import AdminProudctsPage from "./admin/adminProductsPage";
import AddProductForm from "./admin/adminAddProductForm";
import EditProductForm from "./admin/adminEditProductForm";
import AdminOrdersPage from "./admin/adminOrders";
import AdminUsersPage from "./admin/adminUsersPage";
import UserContext from "../src/context/userContext";
import AdminContactPage from "./admin/adminContactPage";
import { FaRegMessage } from "react-icons/fa6";


export default function AdminPage() {

    const userInfo = useContext(UserContext)
    const navigate = useNavigate()

    if (userInfo.user == null || !userInfo.user.isAdmin) {
        navigate("/login", { replace: true })
    }

    return (
        <div className="w-full h-full flex bg-[#020817]">

            {/* Sidebar */}
            <div className="w-[240px] shrink-0 h-full bg-[#020817] border-r border-white/10 flex flex-col shadow-2xl">

                <div className="w-full h-[90px] flex justify-center items-center border-b border-white/10 px-4">
                    <a href="/"> <img src="/logo.webp" alt="logo" className="h-[150px] w-auto object-contain" /></a>
                </div>

                <nav className="flex flex-col p-3 gap-1 mt-2">
                    <Link
                        to="/admin"
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-150"
                    >
                        <IoCartOutline className="text-xl shrink-0" />
                        Orders
                    </Link>
                    <Link
                        to="/admin/products"
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-150"
                    >
                        <BsBox className="text-xl shrink-0" />
                        Products
                    </Link>
                    <Link
                        to="/admin/users"
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-150"
                    >
                        <LuUsersRound className="text-xl shrink-0" />
                        Users
                    </Link>
                    <Link
                        to="/admin/contact"
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-150"
                    >
                        <FaRegMessage className="text-xl shrink-0" />
                        Messages
                    </Link>
                </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 h-full overflow-y-auto bg-[#020817]">
                <Routes>
                    <Route path="/" element={<AdminOrdersPage />} />
                    <Route path="/products" element={<AdminProudctsPage />} />
                    <Route path="/users" element={<AdminUsersPage />} />
                    <Route path="/add-product" element={<AddProductForm />} />
                    <Route path="/edit-product/" element={<EditProductForm />} />
                    <Route path="/contact/" element={<AdminContactPage />} />
                </Routes>
            </div>

        </div>
    )
}

//primary - #f2f2f2
//secondary - #333333
//accent - #000080
