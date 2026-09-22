import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import api from "../../lib/api";
import { useEffect, useState } from "react";
import LoadingAnimation from "../../src/components/loadingAnimation.jsx";
import DeleteProductModel from "../../src/components/deleteProductModel.jsx";

export default function AdminProductsPage() {

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const token = localStorage.getItem("token")

    useEffect(() => {
        api.get("/products", {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((response) => {
            if (isLoading) {
                setProducts(response.data)
                setIsLoading(false)
            }
        })
    }, [isLoading])

    return (
        <div className="w-full min-h-full bg-[#020817] text-white relative overflow-hidden flex flex-col p-4 sm:p-8 pb-28">
            {/* Ambient Glows */}
            <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-blue-600/15 blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] bg-purple-600/15 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto">
                {isLoading && (
                    <div className="py-20 flex justify-center items-center">
                        <LoadingAnimation />
                    </div>
                )}

                {/* Top Control Bar */}
                <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-wrap items-start sm:items-center justify-between gap-4 mb-6 shadow-xl">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black">
                            All <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Products</span>
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-400 mt-1">
                            Total {products.length} product{products.length !== 1 ? "s" : ""}
                        </p>
                    </div>

                    <button
                        className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all"
                        onClick={() => setIsLoading(true)}
                    >
                        Refresh
                    </button>
                </div>

                {/* Products Table */}
                <div className="w-full overflow-x-auto overscroll-x-contain rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
                    <table className="w-full min-w-[1100px] text-center border-collapse">
                        <thead className="bg-white/10 border-b border-white/10 text-cyan-400 text-xs sm:text-sm uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="p-3.5">Image</th>
                                <th className="p-3.5">Product ID</th>
                                <th className="p-3.5">Name</th>
                                <th className="p-3.5">Price</th>
                                <th className="p-3.5">Labeled Price</th>
                                <th className="p-3.5">Stock</th>
                                <th className="p-3.5">Availability</th>
                                <th className="p-3.5">Category</th>
                                <th className="p-3.5">Brand</th>
                                <th className="p-3.5">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-white/5 text-xs sm:text-sm text-gray-300">
                            {products.map((item, index) => (
                                <tr key={index} className="hover:bg-white/[0.07] transition-colors">
                                    <td className="p-3">
                                        <img
                                            src={item.images[0]}
                                            alt={item.name}
                                            className="w-12 h-12 object-contain rounded-lg bg-white/10 p-1 mx-auto"
                                        />
                                    </td>
                                    <td className="p-3.5 font-mono text-cyan-400 text-xs">{item.productId}</td>
                                    <td className="p-3.5 font-medium text-white text-left max-w-[200px] truncate">{item.name}</td>
                                    <td className="p-3.5 font-bold text-cyan-400">{item.price.toLocaleString()} LKR</td>
                                    <td className="p-3.5 text-gray-400 line-through">{item.labledPrice.toLocaleString()} LKR</td>
                                    <td className="p-3.5">{item.stock}</td>
                                    <td className="p-3.5">
                                        <span className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${
                                            item.isAvailable
                                                ? "bg-green-500/15 text-green-300 border-green-400/30"
                                                : "bg-red-500/15 text-red-300 border-red-400/30"
                                        }`}>
                                            {item.isAvailable ? "Available" : "Unavailable"}
                                        </span>
                                    </td>
                                    <td className="p-3.5">
                                        <span className="px-2 py-0.5 rounded-md bg-white/10 text-gray-300 text-xs">{item.category}</span>
                                    </td>
                                    <td className="p-3.5 text-gray-400">{item.brand}</td>
                                    <td className="p-3.5">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link
                                                to="/admin/edit-product/"
                                                state={item}
                                                className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-400/20 text-blue-400 hover:bg-blue-500/25 hover:text-blue-300 transition-all text-lg"
                                                title="Edit product"
                                            >
                                                <CiEdit />
                                            </Link>
                                            <DeleteProductModel product={item} refresh={() => { setIsLoading(true) }} />
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {products.length === 0 && !isLoading && (
                                <tr>
                                    <td colSpan="10" className="py-12 text-center text-gray-400">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Floating Add Button */}
            <Link
                to="/admin/add-product"
                className="w-[56px] h-[56px] bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 text-white text-xl rounded-full flex items-center justify-center fixed right-4 bottom-4 sm:right-8 sm:bottom-8 shadow-lg shadow-blue-500/40 hover:scale-110 active:scale-95 transition-all z-50"
                title="Add new product"
            >
                <FaPlus />
            </Link>
        </div>
    )
}