import api from "../lib/api";
import { useEffect, useState } from "react";
import LoadingAnimation from "../src/components/loadingAnimation.jsx";
import getFormattedPrice from "../lib/priceFormat.js";
import formatTimestamp from "../lib/dateFormat.js";
import MyOrderModal from "../src/components/myOrderModal.jsx";
import { LuSearch, LuX } from "react-icons/lu";

export default function MyOrdersPage() {

    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const token = localStorage.getItem("token")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalOrders, setTotalOrders] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [searchQuery, setSearchQuery] = useState("")
    const [appliedSearch, setAppliedSearch] = useState("")
    const [refreshIndex, setRefreshIndex] = useState(0)

    // Live search on key release with 250ms debounce (instant when cleared)
    useEffect(() => {
        const trimmed = searchQuery.trim()
        if (!trimmed) {
            setAppliedSearch("")
            setCurrentPage(1)
            return
        }

        const timer = setTimeout(() => {
            setAppliedSearch(trimmed)
            setCurrentPage(1)
        }, 250)

        return () => clearTimeout(timer)
    }, [searchQuery])

    useEffect(() => {
        let isCancelled = false
        setIsLoading(true)

        const queryParam = appliedSearch ? `?search=${encodeURIComponent(appliedSearch)}` : ""
        api.get(`/orders/${pageSize}/${currentPage}${queryParam}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((response) => {
            if (isCancelled) return
            setOrders(response.data?.orders || [])
            setTotalPages(response.data?.totalPages || 1)
            setTotalOrders(response.data?.totalCount || 0)
        }).catch((err) => {
            if (isCancelled) return
            console.error("Failed to load orders:", err)
        }).finally(() => {
            if (!isCancelled) {
                setIsLoading(false)
            }
        })

        return () => {
            isCancelled = true
        }
    }, [appliedSearch, currentPage, pageSize, refreshIndex, token])

    const handleClearSearch = () => {
        setSearchQuery("")
        setAppliedSearch("")
        setCurrentPage(1)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            const trimmed = searchQuery.trim()
            if (appliedSearch !== trimmed) {
                setAppliedSearch(trimmed)
                setCurrentPage(1)
            }
        }
    }

    return (
        <main className="w-full min-h-[calc(100vh-85px)] bg-[#020817] text-white relative overflow-hidden flex flex-col p-4 sm:p-8 pb-36">
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
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black">
                                My <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Orders</span>
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-400 mt-1">
                                Total {totalOrders} recorded order{totalOrders !== 1 ? "s" : ""}
                                {appliedSearch && (
                                    <span className="text-cyan-400 font-medium ml-1">
                                        (matching "{appliedSearch}")
                                    </span>
                                )}
                            </p>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-auto">
                            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-xs sm:text-sm text-gray-300">
                                <label className="text-gray-400">Items/page:</label>
                                <select
                                    className="bg-transparent text-cyan-400 font-semibold cursor-pointer outline-none [&>option]:bg-[#020817] [&>option]:text-white"
                                    value={pageSize}
                                    onChange={(e) => {
                                        setPageSize(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                    <option value={20}>20</option>
                                </select>
                            </div>

                            <button
                                className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all"
                                onClick={() => setRefreshIndex((prev) => prev + 1)}
                            >
                                Refresh
                            </button>
                        </div>
                    </div>

                    {/* Search Bar - Live Filter on Key Release */}
                    <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20 transition-all">
                        <LuSearch className="text-gray-400 text-base shrink-0 mr-3 pointer-events-none" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyUp={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search by order ID, date, status, city, phone..."
                            className="w-full bg-transparent text-white placeholder-gray-400 text-xs sm:text-sm outline-none"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer mr-1"
                                title="Clear search"
                            >
                                <LuX className="text-base" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Orders Table Container */}
                <div className="w-full overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl mb-8">
                    <table className="w-full text-center border-collapse">
                        <thead className="bg-white/10 border-b border-white/10 text-cyan-400 text-xs sm:text-sm uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="p-3.5">Order ID</th>
                                <th className="p-3.5">Date</th>
                                <th className="p-3.5">Name</th>
                                <th className="p-3.5">City</th>
                                <th className="p-3.5">Phone</th>
                                <th className="p-3.5">Status</th>
                                <th className="p-3.5">Items</th>
                                <th className="p-3.5">Total</th>
                                <th className="p-3.5">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-white/5 text-xs sm:text-sm text-gray-300">
                            {orders.map((item) => (
                                <tr
                                    key={item.orderId}
                                    className="hover:bg-white/[0.07] transition-colors"
                                >
                                    <td className="p-3.5 font-mono text-cyan-400 text-xs">{item.orderId}</td>
                                    <td className="p-3.5 text-gray-400">{formatTimestamp(item.date)}</td>
                                    <td className="p-3.5 font-medium text-white">{item.firstName} {item.lastName}</td>
                                    <td className="p-3.5">{item.city}</td>
                                    <td className="p-3.5 font-mono">{item.phone}</td>
                                    <td className="p-3.5">
                                        <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-3.5">{item.items?.length || 0}</td>
                                    <td className="p-3.5 font-bold text-cyan-400">
                                        {getFormattedPrice(item.totalAmount)}
                                    </td>
                                    <td className="p-3.5">
                                        <div className="flex items-center justify-center">
                                            <MyOrderModal order={item} refresh={() => setRefreshIndex((prev) => prev + 1)} />
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {orders.length === 0 && !isLoading && (
                                <tr>
                                    <td colSpan="9" className="py-12 text-center text-gray-400">
                                        {appliedSearch ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <p>No orders found matching "{appliedSearch}".</p>
                                                <button
                                                    onClick={handleClearSearch}
                                                    className="text-xs text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                                                >
                                                    Clear search
                                                </button>
                                            </div>
                                        ) : (
                                            "No orders found in your account history."
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Floating Pagination Bar */}
                <div className="fixed bottom-20 lg:bottom-6 left-0 w-full flex justify-center z-30 pointer-events-none">
                    <div className="bg-[#020817]/90 backdrop-blur-xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.6)] rounded-full px-5 py-2.5 flex items-center gap-4 pointer-events-auto">
                        <button
                            disabled={currentPage === 1}
                            className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-cyan-500/20 text-gray-200 hover:text-cyan-300 text-xs font-semibold transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                            onClick={() => {
                                if (currentPage > 1) {
                                    setCurrentPage(currentPage - 1);
                                }
                            }}
                        >
                            &larr; Prev
                        </button>

                        <span className="text-xs font-semibold text-gray-300">
                            Page <strong className="text-cyan-400">{currentPage}</strong> of {totalPages}
                        </span>

                        <button
                            disabled={currentPage === totalPages}
                            className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-cyan-500/20 text-gray-200 hover:text-cyan-300 text-xs font-semibold transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                            onClick={() => {
                                if (currentPage < totalPages) {
                                    setCurrentPage(currentPage + 1);
                                }
                            }}
                        >
                            Next &rarr;
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}