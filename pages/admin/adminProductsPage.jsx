import {Link} from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import api from "../../lib/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiEdit, CiTrash } from "react-icons/ci";
import LoadingAnimation from "../../src/components/loadingAnimation.jsx";
import DeleteProductModel from "../../src/components/deleteProductModel.jsx";

export default function AdminProudctsPage(){



    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const token = localStorage.getItem("token")

    
    
    useEffect(()=>{
    api.get("/products", {
       headers : {
                    Authorization : "Bearer "+token
                }
    }).then((response)=>{
        
        if(isLoading){
        console.log(response.data)
        setProducts(response.data)
        setIsLoading(false)
        }
        
      })
    } , [isLoading])

    //make a backend call to get all products 
    //update the products variable's value with response from backend
     
    // async function handleDelete(productId){

    //     const confirm = window.confirm("Are you sure you want to delete this product?")

    //     if(!confirm){
    //         setIsLoading(false)
    //         return
    //     }

    //     setIsLoading(true)
        
        

        

    //     try{
    //         const res = await api.delete(`/products/${productId}`, {
    //             headers : {
    //                 Authorization : "Bearer "+token
    //             }
    //         })
    //         setIsLoading(true)
    //         toast.success("Product Deleted Successfully")
            
    //     }catch(err){
    //         console.log(err.response.data.message)
    //         toast.error(err.response.data.message)
    //         setIsLoading(true)
    //     }
    // }


    return(
        <div className="w-full max-h-full flex flex-col p-4 items-start overflow-y-scroll">

        {
            isLoading && <LoadingAnimation/>
        }

          <div className="w-full h-[100px] bg-white shadow-md rounded-md flex items-center p-4 justify-between mb-8">

                <h1 className="text-2xl font-semibold text-secondary">All Products</h1>
                <h1>{products.length} Products</h1>

                <button className="bg-accent text-white px-4 py-2 rounded-md cursor-pointer hover:bg-accent/90" onClick={
                    () => 
                        //window.location.reload()
                        //rerun the function inside the useEffect to get the products again
                        {
                            setIsLoading(true)
                        }
                    }>
                    Refresh
                </button>
            </div>
            
            <table className="w-full bg-white shadow-md rounded-md text-center">


                <thead className="bg-accent text-white h-[80px]">
                    <tr >
                        <th>Image</th>
                        <th>Product ID </th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Labeled Price</th>
                        <th>Stock</th>
                        <th>Availability</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody >

                    {products.map(
                        (item , index) => {
                            return(
                                <tr key={index} className=" hover:bg-accent transition-all duration-200 hover:text-white  odd:bg-secondary/20a even:bg-gray-100 ">
                                    <td><img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-md" /></td>
                                    <td>{item.productId}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price.toLocaleString()} LKR</td>
                                    <td>{item.labledPrice.toLocaleString()} LKR</td>
                                    <td>{item.stock}</td>
                                    <td>{item.isAvailable ? "Available" : "Not Available"}</td>
                                    <td>{item.category}</td>
                                    <td>{item.brand}</td>
                                    <td>
                                        <div className="flex items-center justify-center gap-2 text-2xl">
                                           <Link to="/admin/edit-product/" state={item}>
                                                <CiEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                                            </Link>
                                            <DeleteProductModel product={item} refresh={()=>{setIsLoading(true)}}/>
                                            
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    )
                    
                    
                    }

                </tbody>


            </table>


            <Link to="/admin/add-product" className="w-[60px] h-[60px] bg-accent text-white text-2xl rounded-full flex items-center justify-center fixed right-[35px] bottom-[35px]">
                <FaPlus/>
            </Link>
        </div>
    )
}