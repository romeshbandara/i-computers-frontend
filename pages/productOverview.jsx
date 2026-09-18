import { Link, useLoaderData, useLocation, useParams } from "react-router-dom"
import api from "../lib/api"
import { useEffect, useState } from "react"
import LoadingAnimation from "../src/components/loadingAnimation"
import toast from "react-hot-toast"
import ImageSlideShow from "../src/components/imageSlideShow"
import { BiCategory } from "react-icons/bi"
import { HiOutlineBadgeCheck } from "react-icons/hi"
import { FiBox } from "react-icons/fi"
import getFormattedPrice from "../lib/priceFormat"
import { GrCart } from "react-icons/gr"
import { addToCart, getCart } from "../lib/cart"


export default function ProductOverview(){

    const params = useParams()
    const location = useLocation()
    

    //parameter related product should be retrieved from backend

    const [product,setProduct] = useState(location.state)
    const [loading,setLoading] = useState(true)

    
    

    useEffect(()=>{
        api.get("/products/"+params.productId).then((response)=>{
            setProduct(response.data)
            setLoading(false)
        }).catch(()=>{
            toast.error("error load product")
            setProduct(null)
        })
    })


    
    

    return (
        <div className="w-full min-h-[calc(100vh-85px)] bg-[#020817] text-white relative overflow-hidden pb-28">
            {/* Ambient Glows */}
            <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-blue-600/15 blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] bg-purple-600/15 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-10 pt-8">
                {loading && (
                    <div className="py-24 flex justify-center items-center">
                        <LoadingAnimation />
                    </div>
                )}

                {product != null && (
                    <div className="w-full flex lg:flex-row flex-col gap-10 items-start">
                        {/* Left: Product Images */}
                        <div className="lg:w-1/2 w-full flex items-center justify-center">
                            <div className="w-full max-w-lg bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6  shadow-2xl flex justify-center items-center">
                                <ImageSlideShow images={product.images} />
                            </div>
                        </div>

                        {/* Right: Details */}
                        <div className="lg:w-1/2 w-full flex flex-col">
                            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
                                PID: {product.productId}
                            </div>

                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                                {product.name}
                                {product.altNames?.map((name, index) => (
                                    <span key={index} className="text-gray-400 text-xl font-normal ml-2">
                                        | {name}
                                    </span>
                                ))}
                            </h1>

                            {/* Badges */}
                            <div className="flex flex-wrap gap-2.5 mt-4">
                                <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-gray-300 flex items-center gap-1.5">
                                    <BiCategory className="text-cyan-400 text-sm" />
                                    <span>Category: <strong className="text-white">{product.category}</strong></span>
                                </div>
                                <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-gray-300 flex items-center gap-1.5">
                                    <HiOutlineBadgeCheck className="text-blue-400 text-sm" />
                                    <span>Brand: <strong className="text-white">{product.brand}</strong></span>
                                </div>
                                <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-gray-300 flex items-center gap-1.5">
                                    <FiBox className="text-purple-400 text-sm" />
                                    <span>Model: <strong className="text-white">{product.model}</strong></span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="mt-6 flex items-baseline gap-3">
                                <span className="text-3xl sm:text-4xl font-black text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">
                                    {getFormattedPrice(product.price)}
                                </span>
                                {product.labledPrice > product.price && (
                                    <span className="text-lg text-gray-500 line-through">
                                        {getFormattedPrice(product.labledPrice)}
                                    </span>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 mt-8">
                                <Link
                                    to="/checkout"
                                    state={[
                                        {
                                            product: {
                                                productId: product.productId,
                                                name: product.name,
                                                price: product.price,
                                                labledPrice: product.labledPrice,
                                                image: product.images[0],
                                            },
                                            qty: 1,
                                        },
                                    ]}
                                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-bold text-white shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all text-center cursor-pointer"
                                >
                                    Buy Now
                                </Link>

                                <button
                                    className="px-7 py-3.5 rounded-xl border border-cyan-400/40 bg-cyan-500/10 text-cyan-400 font-bold hover:bg-cyan-500/20 hover:border-cyan-400 transition-all flex items-center gap-2 cursor-pointer active:scale-95 shadow-sm"
                                    onClick={() => {
                                        addToCart(product, 1)
                                        toast.success("Product added to cart!")
                                    }}
                                >
                                    <GrCart className="text-lg" />
                                    <span>Add to Cart</span>
                                </button>
                            </div>

                            {/* Description Card */}
                            <div className="mt-10 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                                    Product Description
                                </h2>
                                <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {product == null && !loading && (
                    <div className="w-full max-w-md mx-auto my-16 p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 text-center flex flex-col items-center">
                        <div className="text-5xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
                        <p className="text-gray-400 text-sm mb-6">
                            This product may have been removed or is temporarily unavailable.
                        </p>
                        <Link
                            to="/products"
                            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-semibold text-sm text-white shadow-lg shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all"
                        >
                            Return to Catalog
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}