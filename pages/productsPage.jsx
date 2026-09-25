import { useEffect, useState } from "react"
import api from "../lib/api"
import toast from "react-hot-toast"
import LoadingAnimation from "../src/components/loadingAnimation"
import ProductCard from "../src/components/productCard"
import { LuRefreshCcw, LuSearch, LuX, LuFilter, LuChevronDown } from "react-icons/lu"
import { useLocation } from "react-router-dom"

const CATEGORIES = [
    { label: "Laptop", value: "Laptop" },
    { label: "Desktop", value: "Desktop" },
    { label: "Monitor", value: "Monitor" },
    { label: "Keyboard", value: "Keyboard" },
    { label: "Mouse", value: "Mouse" },
    { label: "Graphic Card", value: "Graphic Card" },
    { label: "Processor", value: "Processor" },
    { label: "Motherboard", value: "Motherboard" },
    { label: "Power Supply", value: "Power Suply" },
    { label: "RAM", value: "RAM" },
    { label: "Phone", value: "Phone" },
    { label: "Gaming Gear", value: "Gaming" },
]

export default function ProductsPage() {

    const location = useLocation()
    const [allProducts, setAllProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState("")
    const [filter, setFilter] = useState(location?.state || "filter")

    const fetchProducts = () => {
        setLoading(true)
        api.get("/products").then((response) => {
            setAllProducts(response.data || [])
            setLoading(false)
        }).catch((err) => {
            console.error("Failed to load products:", err)
            toast.error("Failed to load products")
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        if (location?.state) {
            setFilter(location.state)
        }
    }, [location?.state])

    const handleReset = () => {
        setQuery("")
        setFilter("filter")
    }

    // Instant filter on key release / query change / category filter
    const filteredProducts = allProducts.filter((product) => {
        // Category check
        if (filter !== "filter" && product.category?.toLowerCase() !== filter.toLowerCase()) {
            return false
        }

        // Search query check
        if (!query.trim()) return true
        const q = query.toLowerCase().trim()
        const words = q.split(/\s+/).filter(Boolean)
        return words.every((word) =>
            product.name?.toLowerCase().includes(word) ||
            product.productId?.toLowerCase().includes(word) ||
            product.brand?.toLowerCase().includes(word) ||
            product.category?.toLowerCase().includes(word) ||
            product.model?.toLowerCase().includes(word) ||
            product.description?.toLowerCase().includes(word) ||
            (Array.isArray(product.altNames) && product.altNames.some((alt) => alt.toLowerCase().includes(word)))
        )
    })

    return (
        <main className="w-full min-h-[calc(100vh-85px)] bg-[#020817] text-white relative overflow-hidden flex flex-col pb-28">
            {/* Ambient Background Glows */}
            <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-blue-600/15 blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute top-[35%] right-[10%] w-[450px] h-[450px] bg-purple-600/15 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[10%] left-[25%] w-[400px] h-[400px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8">
                {/* Unified Desktop & Mobile Search Bar */}
                <div className="w-full max-w-4xl mx-auto mb-8">
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 p-3.5 sm:p-5 flex flex-col gap-3">
                        {/* Search Input Box - Live Instant Filter on Key Release */}
                        <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-3.5 py-2.5 sm:py-3 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20 transition-all">
                            <LuSearch className="text-gray-400 text-lg sm:text-xl shrink-0 mr-3 pointer-events-none" />
                            <input
                                type="text"
                                enterKeyHint="search"
                                autoCapitalize="none"
                                autoCorrect="off"
                                spellCheck="false"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={(e) => setQuery(e.target.value)}
                                placeholder="Search laptops, GPUs, keyboards, accessories..."
                                className="w-full bg-transparent text-white placeholder-gray-400 text-sm sm:text-base outline-none min-h-[34px]"
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery("")}
                                    className="p-1.5 text-gray-400 hover:text-white active:scale-90 transition-transform cursor-pointer mr-1"
                                    aria-label="Clear search"
                                    title="Clear search"
                                >
                                    <LuX className="text-lg" />
                                </button>
                            )}
                        </div>

                        {/* Filter Dropdown & Reset Action Bar */}
                        <div className="flex items-center gap-2.5 sm:gap-3">
                            {/* Category Dropdown */}
                            <div className="relative flex-1">
                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-400">
                                    <LuFilter className="text-sm" />
                                </div>
                                <select
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    className={`w-full appearance-none pl-9 sm:pl-10 pr-9 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl border transition-all cursor-pointer font-medium outline-none ${
                                        filter !== "filter"
                                            ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                                            : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                                    } [&>option]:bg-[#020817] [&>option]:text-white`}
                                >
                                    <option value="filter">All Categories</option>
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    <LuChevronDown className="text-sm" />
                                </div>
                            </div>

                            {/* Reset Button */}
                            <button
                                onClick={handleReset}
                                title="Reset filters"
                                aria-label="Reset all filters"
                                className={`h-[38px] sm:h-[42px] px-3.5 sm:px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold shrink-0 cursor-pointer active:scale-95 transition-all outline-none ${
                                    query !== "" || filter !== "filter"
                                        ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.3)]"
                                        : "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border-white/10"
                                }`}
                            >
                                <LuRefreshCcw className={`text-sm ${loading ? "animate-spin" : ""}`} />
                                <span className="hidden sm:inline">Reset</span>
                            </button>
                        </div>

                        {/* Horizontal Category Quick-Chips */}
                        <div className="flex items-center gap-2 overflow-x-auto py-1 text-xs [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            <button
                                type="button"
                                onClick={handleReset}
                                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap font-medium transition-all cursor-pointer shrink-0 active:scale-95 ${
                                    filter === "filter" && query === ""
                                        ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                                        : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                All Products
                            </button>
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.value}
                                    type="button"
                                    onClick={() => setFilter(cat.value)}
                                    className={`px-3.5 py-1.5 rounded-full whitespace-nowrap font-medium transition-all cursor-pointer shrink-0 active:scale-95 ${
                                        filter === cat.value
                                            ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                                            : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Catalog Grid */}
                {loading ? (
                    <div className="py-20 flex justify-center items-center">
                        <LoadingAnimation />
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center content-start gap-4">
                        {filteredProducts.map((product, index) => (
                            <ProductCard product={product} key={product.productId || index} />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredProducts.length === 0 && (
                    <div className="w-full max-w-md mx-auto my-12 p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 text-center flex flex-col items-center">
                        <div className="text-5xl mb-4">🔍</div>
                        <h2 className="text-2xl font-bold text-white mb-2">No Products Found</h2>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            {query.trim()
                                ? `We couldn't find any products matching "${query.trim()}".`
                                : "We couldn't find any products in this category."}
                        </p>
                        <button
                            onClick={handleReset}
                            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-semibold text-sm text-white shadow-lg shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>
        </main>
    )
}