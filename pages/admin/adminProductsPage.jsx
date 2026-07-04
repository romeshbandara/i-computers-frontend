import {Link} from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import api from "../../lib/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



export default function AdminProudctsPage(){

    const [products, setProducts] = useState([])

    const token = localStorage.getItem("token")

    useEffect(()=>{
    api.get("/products", {
       headers : {
                    Authorization : "Bearer "+token
                }
    }).then((response)=>{
        console.log(response.data)
        setProducts(response.data)
      })
    } , [])

    //make a backend call to get all products 
    //update the products variable's value with response from backend
     



    return(
        <div className="w-full max-h-full flex flex-col p-4 items-start overflow-y-scroll">


          <div className="w-full h-[100px] bg-white shadow-md rounded-md flex items-center p-4 justify-between mb-8">

                <h1 className="text-2xl font-semibold text-secondary">All Products</h1>
                <h1>{products.length} Products</h1>

                

            </div>
            
            <table className="w-full bg-white shadow-md rounded-md ">


                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product ID </th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Labeled Price</th>
                        <th>Stock</th>
                        <th>Availability</th>
                        <th>Category</th>
                        <th>Brand</th>
                    </tr>
                </thead>

                <tbody >

                    {products.map(
                        (item , index) => {
                            return(
                                <tr key={index} className="hover:bg-accent transition-all duration-200 hover:text-white cursor-pointer odd:bg-secondary/20a even:bg-gray-100">
                                    <td><img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-md" /></td>
                                    <td>{item.productId}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.labeledPrice}</td>
                                    <td>{item.stock}</td>
                                    <td>{item.isAvailable ? "Available" : "Not Available"}</td>
                                    <td>{item.category}</td>
                                    <td>{item.brand}</td>
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