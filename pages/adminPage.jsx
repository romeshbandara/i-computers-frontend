import { Route, Routes, Link } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { CiShoppingCart } from "react-icons/ci";
import { BsBox } from "react-icons/bs";
import { LuUsersRound } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import AdminProudctsPage from "./admin/adminProductsPage";
import AddProductForm from "./admin/adminAddProductForm";



export default function AdminPage(){

    useEffect(() => {toast.success("Welcome to Admin Dashboard")}, [])

    return(
        
        <div className="w-full h-full flex">

            <div className="w-[360px] h-full shadow-2xl text-secondary flex flex-col ">

                <div className="w-[360px] h-[100px] flex justify-center items-center ">

                    <img src="/logo.webp" alt="logo" className="w-[200px] h-[200px] object-cover"></img>

                </div>

               <Link to="/admin" className="w-full flex items-center p-2 gap-2 text-3xl mb-2 hover:bg-accent hover:text-white"><IoCartOutline /> Orders</Link>
               <Link to="/admin/products" className="w-full flex items-center p-2 gap-2 text-3xl mb-2 hover:bg-accent hover:text-white"><BsBox /> Products</Link>
               <Link to="/admin/users" className="w-full flex items-center p-2 gap-2 text-3xl mb-2 hover:bg-accent hover:text-white"><LuUsersRound/>Users</Link>
               

            </div>
            <div className="w-[calc(100%-360px)] h-full">

                

                <Routes>
                    <Route path="/" element={<h1>Orders Page</h1>} />
                    <Route path="/products" element={<AdminProudctsPage/>} />
                    <Route path="/users" element={<h1>Users Page</h1>} />
                    <Route path="/add-product" element={<AddProductForm/>}/>
                </Routes>

            </div>
            
            
        </div>
        
    )
}

//primary - #f2f2f2
//secondary - #333333
//accent - #000080