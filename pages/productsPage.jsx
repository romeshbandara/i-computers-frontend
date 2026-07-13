import { useEffect, useState } from "react"
import api from "../lib/api"
import toast from "react-hot-toast"
import LoadingAnimation from "../src/components/loadingAnimation"
import ProductCard from "../src/components/productCard"

export default function ProductsPage() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if(loading){
            api.get("/products").then((response) => {
                setProducts(response.data)
                setLoading(false)
            }).catch(()=>{
                toast.error("Error")
            })
        }

    },[])

    return (
        <div className="w-full flex flex-wrap p-8 justify-center">
            {loading?<LoadingAnimation/>
            :<>
               {
                products.map(
                    (product , index)=>{
                        return(
                            <ProductCard product={product} key={index}/>
                        )
                    }
                )
               }
            </>
            }

        </div>
    )
}