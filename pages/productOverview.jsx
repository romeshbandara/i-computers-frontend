import { useLoaderData, useLocation, useParams } from "react-router-dom"
import api from "../lib/api"
import { useEffect, useState } from "react"
import LoadingAnimation from "../src/components/loadingAnimation"
import toast from "react-hot-toast"
import ImageSlideShow from "../src/components/imageSlideShow"

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
        <div className="w-full h-[calc(100vh-100px)] ">
            {loading && <LoadingAnimation/>}
            {
                product!=null&&
                <div className="w-full h-full min-h-full flex">
                    <div className="w-1/2 h-full flex items-center justify-center">

                        <ImageSlideShow images={product.images}/>

                    </div>
                    <div className="w-1/2 h-full ">

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