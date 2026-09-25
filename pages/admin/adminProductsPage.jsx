import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { LuSearch, LuX } from "react-icons/lu";
import api from "../../lib/api";
import { useEffect, useState } from "react";
import LoadingAnimation from "../../src/components/loadingAnimation.jsx";
import DeleteProductModel from "../../src/components/deleteProductModel.jsx";

export default function AdminProductsPage() {

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (!isLoading) return;
        api.get("/products", {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((response) => {
            setProducts(response.data || [])
        }).catch((err) => {
            console.error("Failed to fetch products:", err)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [isLoading, token])

    const filteredProducts = products.filter((item) => {
        if (!searchQuery.trim()) return true
        const q = searchQuery.toLowerCase().trim()
        return (
            item.name?.toLowerCase().includes(q) ||
            item.productId?.toLowerCase().includes(q) ||
            item.brand?.toLowerCase().includes(q) ||
            item.category?.toLowerCase().includes(q) ||
            item.model?.toLowerCase().includes(q) ||
            (Array.isArray(item.altNames) && item.altNames.some(alt => alt.toLowerCase().includes(q)))
        )
    })

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
                <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col gap-4 mb-6 shadow-xl">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black">
                                All <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Products</span>
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-400 mt-1">
                                Total {products.length} product{products.length !== 1 ? "s" : ""}
                                {searchQuery.trim() && (
                                    <span className="text-cyan-400 font-medium ml-1">
                                        ({filteredProducts.length} matching)
                                    </span>
                                )}
                            </p>
                        </div>

                        <button
                            className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all"
                            onClick={() => setIsLoading(true)}
                        >
                            Refresh
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20 transition-all">
                        <LuSearch className="text-gray-400 text-base shrink-0 mr-3 pointer-events-none" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by product name, ID, category, brand, model..."
                            className="w-full bg-transparent text-white placeholder-gray-400 text-xs sm:text-sm outline-none"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer mr-1"
                                title="Clear search"
                            >
                                <LuX className="text-base" />
                            </button>
                        )}
                    </div>
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
                            {filteredProducts.map((item, index) => (
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
                                            <DeleteProductModel product={item} refresh={() => setIsLoading(true)} />
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredProducts.length === 0 && !isLoading && (
                                <tr>
                                    <td colSpan="10" className="py-12 text-center text-gray-400">
                                        {searchQuery.trim() ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <p>No products found matching "{searchQuery.trim()}".</p>
                                                <button
                                                    onClick={() => setSearchQuery("")}
                                                    className="text-xs text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                                                >
                                                    Clear search
                                                </button>
                                            </div>
                                        ) : (
                                            "No products found."
                                        )}
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