import { useEffect, useState } from "react"
import api from "../lib/api"
import toast from "react-hot-toast"
import LoadingAnimation from "../src/components/loadingAnimation"
import ProductCard from "../src/components/productCard"
import { LuRefreshCcw } from "react-icons/lu"

export default function ProductsPage() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searching, setSearching] = useState(false)
    const [query, setQuery] = useState("")
    const [filter, setFilter] = useState("filter")

    useEffect(() => {

        if (loading) {
            api.get("/products").then((response) => {
                setProducts(response.data)
                setLoading(false)
            }).catch(() => {
                toast.error("Error")
            })
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

    async function handleFilter(filter) {
        setFilter(filter)
        if (filter == "filter") {
            return toast.error("Please select a category")
        }
        setSearching(true)
        try {
            const response = await api.get("/products/filter/"+filter)
            setProducts(response.data)
            setSearching(false)
        } catch (err) {
            setSearching(false)
            return toast.error("Failed to filter products")
        }
    }
    return (
        <>
            <div className="w-full h-[calc(100vh-100px)] overflow-y-scroll flex flex-wrap p-8 justify-center pb-30">
                <div className="w-full h-[50px] flex justify-center">

                    <input onChange={(e) => { setQuery(e.target.value) }} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }} value={query} type="text" placeholder="Search Products..." className="w-[400px] border-2 border-accent rounded-xl p-3" />
                    <button onClick={handleSearch} className="bg-accent px-4 py-2 ml-2 text-white rounded-xl cursor-pointer hover:bg-black">Search</button>

                    <select value={filter} onChange={(e) => handleFilter(e.target.value)} className="w-35 h-full bg-accent text-white rounded-md border-2 border-gray-300 p-2 mx-2 hover:bg-black cursor-pointer">
                        <option value={"filter"} disabled>Filter</option>
                        <option value={"Laptop"}>Laptop</option>
                        <option value={"Desktop"}>Desktop</option>
                        <option value={"Monitor"}>Monitor</option>
                        <option value={"Keyboard"}>Keyboard</option>
                        <option value={"Mouse"}>Mouse</option>
                        <option value={"Graphic Card"}>Graphic Card</option>
                        <option value={"Processor"}>Processor</option>
                        <option value={"Motherboard"}>Motherboard</option>
                        <option value={"Power Suply"}>Power Suply</option>
                        <option value={"RAM"}>RAM</option>
                        <option value={"Phone"}>Phone</option>

                    </select>
                    <button onClick={() => { setLoading(true); setQuery(""); setFilter("filter") }} className="bg-accent px-4 py-2  text-white rounded-xl cursor-pointer hover:bg-black"><LuRefreshCcw /></button>
                </div>
                {loading || searching ? <LoadingAnimation />
                    : <>
                        {
                            products.map(
                                (product, index) => {
                                    return (
                                        <ProductCard product={product} key={index} />
                                    )
                                }
                            )
                        }
                    </>
                }
                {products.length === 0 && <h1 className="text-2xl font-semibold">No product found!</h1>}

            </div>
        </>
    )
}