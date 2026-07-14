import { useLoaderData, useLocation, useParams } from "react-router-dom"
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
            toastst.error("error load product")
            setProduct(null)
        })
    })


    
    

    return(
        <div className="w-full h-[calc(100vh-100px)] overflow-y-scroll ">
            {loading && <LoadingAnimation/>}
            {
                product!=null&&
                <div className="w-full h-full min-h-full flex">
                    <div className="w-1/2 h-full flex items-center justify-center mt-4">

                        <ImageSlideShow images={product.images}/>

                    </div>
                    <div className="w-1/2 h-full p-8 flex flex-col">
                        <h1 className="text-3xl font-semibold">{product.name} {
                            product.altNames.map((name,index)=>{
                                return(
                                    <span key={index} className="text-gray-600 text-2xl">| {name} </span>
                                )
                                
                            })
                        }</h1>
                        
                        
                        <p className="text-lg text-secondary italic mt-2">{product.productId}</p>
                        <p className="text-lg text-secondary mt-2 flex items-center font-semibold gap-1"><BiCategory/><span className=" mr-2">Category </span> :- {product.category}</p>
                        <p className="text-lg text-secondary font-semibold mt-2 flex items-center gap-1"><HiOutlineBadgeCheck/>Brand :- {product.brand}</p>
                        <p className="text-lg text-secondary font-semibold mt-2 mb-8 flex items-center gap-1"><FiBox />Model :- {product.model}</p>
                        
                        
                        {
                            product.labledPrice>product.price&&<span className=" line-through ">{getFormattedPrice(product.labledPrice)}</span>
                        }
                        <span className=" text-2xl text-accent font-semibold">{getFormattedPrice(product.price)}</span>
                        
                        <div className="flex gap-6 mt-8">
                            
                            <button className="bg-accent text-white py-2 px-4 rounded-md hover:bg-black cursor-pointer" onClick={
                                ()=>{
                                    const cart = getCart()
                                    console.log(cart)
                                }
                            }>Buy Now</button>
                            <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-black cursor-pointer flex items-center gap-2" onClick={
                                ()=>{
                                    addToCart(product ,1)
                                    toast.success("product added to cart")
                                }
                            }><GrCart />Add to Cart</button>
                        </div>
                        <h1 className="mt-8 text-xl font-semibold underline">Description</h1>
                        <p className="text-gray-600 mt-2 pb-8">{product.description}</p>
                        
                    </div>
                </div>
            }
            {
                product==null&&!loading&&
                <div className="w-full min-h-[calc(100vh-100px)] flex justify-center items-center">
                    <h1 className="text-2xl text-center font-bold text-white flex ">Product not founded!</h1>
                </div>
            }
        </div>
    )
}