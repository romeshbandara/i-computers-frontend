import { Route, Routes, Link } from "react-router-dom";

export default function AdminPage(){
    return(
        <div className="w-full h-full flex">

            <div className="w-[360px] h-full bg-red-900 text-white flex flex-col ">

                {/* <a className="bg-red-700 hover:bg-red-600 p-2 border-b-2 border-white" href="/admin">Admin Dashboard</a>
                <a className="bg-red-700 hover:bg-red-600 p-2 border-b-2 border-white" href="/admin/products">Products</a>
                <a className="bg-red-700 hover:bg-red-600 p-2 border-b-2 border-white" href="/admin/users">Users</a> */}

                <Link to="/admin" className="bg-red-700 hover:bg-red-600 p-2 border-b-2 border-white">Admin Dashboard</Link>
                <Link to="/admin/products" className="bg-red-700 hover:bg-red-600 p-2 border-b-2 border-white">Products</Link>
                <Link to="/admin/users" className="bg-red-700 hover:bg-red-600 p-2 border-b-2 border-white">Users</Link>

            </div>
            <div className="w-[calc(100%-360px)] h-full bg-yellow-500">

                <Routes>
                    <Route path="/" element={<h1>Orders Page</h1>} />
                    <Route path="/products" element={<h1>Products Page</h1>} />
                    <Route path="/users" element={<h1>Users Page</h1>} />
                </Routes>

            </div>
            
            
        </div>
        
    )
}

//primary - #f2f2f2
//secondary - #333333
//accent - #000080