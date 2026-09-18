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
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searching, setSearching] = useState(false)
    const [query, setQuery] = useState("")
    const [filter, setFilter] = useState(location?.state || "filter")

    useEffect(() => {

        if (loading) {
            api.get("/products").then((response) => {
                setProducts(response.data)
                setLoading(false)
            }).catch(() => {
                toast.error("Error")
            })
        }

        if (filter != "filter") {
            handleFilter(filter)
        }

    }, [loading])

    async function handleSearch() {

        if (query == "") {
            return toast.error("Please enter search keyword")
        }

        setSearching(true)

        try {
            const response = await api.get("/products/search/" + query)
            setProducts(response.data)
            setSearching(false)
        } catch (err) {
            toast.error("Search Failed!")
        }
    }

    async function handleFilter(selectedFilter) {
        setFilter(selectedFilter)
        if (selectedFilter == "filter") {
            return toast.error("Please select a category")
        }
        setSearching(true)
        try {
            const response = await api.get("/products/filter/" + selectedFilter)
            setProducts(response.data)
            setSearching(false)
        } catch (err) {
            setSearching(false)
            return toast.error("Failed to filter products")
        }
    }

    const handleReset = () => {
        setQuery("")
        setFilter("filter")
        setLoading(true)
    }

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
                        {/* Search Input Box */}
                        <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-3.5 py-2.5 sm:py-3 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20 transition-all">
                            <LuSearch className="text-gray-400 text-lg sm:text-xl shrink-0 mr-3 pointer-events-none" />
                            <input
                                type="search"
                                enterKeyHint="search"
                                autoCapitalize="none"
                                autoCorrect="off"
                                spellCheck="false"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearch();
                                    }
                                }}
                                placeholder="Search laptops, GPUs, keyboards, accessories..."
                                className="w-full bg-transparent text-white placeholder-gray-400 text-base outline-none min-h-[34px] [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery("")}
                                    className="p-1.5 text-gray-400 hover:text-white active:scale-90 transition-transform cursor-pointer mr-1"
                                    aria-label="Clear search"
                                >
                                    <LuX className="text-lg" />
                                </button>
                            )}
                            <button
                                onClick={handleSearch}
                                disabled={searching}
                                className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-sm font-semibold shrink-0 cursor-pointer active:scale-95 transition-all hover:shadow-lg hover:shadow-cyan-500/25 shadow-md shadow-blue-600/30 disabled:opacity-50"
                            >
                                Search
                            </button>
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
                                    onChange={(e) => handleFilter(e.target.value)}
                                    className={`w-full appearance-none pl-9 sm:pl-10 pr-9 py-2 sm:py-2.5 text-sm rounded-xl border transition-all cursor-pointer font-medium outline-none ${
                                        filter !== "filter"
                                            ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                                            : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                                    } [&>option]:bg-[#020817] [&>option]:text-white`}
                                >
                                    <option value="filter" disabled>Filter by Category</option>
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
                                className={`h-[38px] sm:h-[42px] px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold shrink-0 cursor-pointer active:scale-95 transition-all outline-none ${
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
                                    onClick={() => handleFilter(cat.value)}
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
                {loading || searching ? (
                    <div className="py-20 flex justify-center items-center">
                        <LoadingAnimation />
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center content-start gap-2">
                        {products.map((product, index) => (
                            <ProductCard product={product} key={product.productId || index} />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !searching && products.length === 0 && (
                    <div className="w-full max-w-md mx-auto my-12 p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 text-center flex flex-col items-center">
                        <div className="text-5xl mb-4">🔍</div>
                        <h2 className="text-2xl font-bold text-white mb-2">No Products Found</h2>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            We couldn't find any products matching your search criteria. Try a different keyword or reset the filter.
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