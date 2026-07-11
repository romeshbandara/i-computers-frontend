import { CiTrash } from "react-icons/ci";
import { useState } from "react";
import api from "../../lib/api";
import toast from "react-hot-toast";

export default function DeleteProductModel(props){


    const [showModel , setShowModel] = useState(false)
    const refresh = props.refresh
    const product = props.product
    const token = localStorage.getItem("token")

    async function handleDelete(productId){

        try{
            const res = await api.delete(`/products/${productId}`, {
                headers : {
                    Authorization : "Bearer "+token
                }
            })
            refresh()
            toast.success("Product Deleted Successfully")
            
        }catch(err){
            console.log(err.response.data.message)
            toast.error(err.response.data.message)
            
        }finally{
            setShowModel(false)
        }
    }

    return(

        <>
        <CiTrash className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => setShowModel(true)} />
        {showModel && (
            <div className="w-screen h-screen bg-black/50 flex justify-center items-center fixed left-0 top-0 z-50">
                <div className="w-[400px] h-[200px] bg-white rounded-md flex flex-col  items-center  relative">
                    <div className="w-full h-[25%] bg-accent flex items-center justify-between  rounded-t-md">
                        <h1 className="text-white text-sm ml-3">Delete Product</h1>
                        <div className="bg-red-500 h-full w-[8%]  flex justify-center items-center p-2 text-xs font-bold text-white cursor-pointer hover:bg-red-700" onClick={() => setShowModel(false)}>
                            X
                            </div>
                    </div>

                    <div className="w-full h-[40%] ">
                        <h1 className="text-black pt-3 text-xl">Are you sure you want to delete this product? (Product : {product.productId})</h1>
                    </div>

                    <div className="w-full h-[35%] flex items-center justify-center gap-10">
                        <button className="bg-accent text-xl py-2 px-4 rounded-md text-white hover:bg-accent/90 cursor-pointer" onClick={() => setShowModel(false)}>
                            Cancel
                        </button>
                        <button className="bg-red-500 text-xl py-2 px-4 rounded-md text-white hover:bg-red-700 cursor-pointer" onClick={() => handleDelete(product.productId)}>
                            Delete
                        </button>
                    </div>

                </div>
            </div>
        )}
        </>

    
   


)
}
