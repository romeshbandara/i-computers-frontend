import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import uploadMedia from "../../lib/uploadMedia.js";

export default function AddProductForm(){

    const [productId, setProductId] = useState("")
    const [name, setName] = useState("")
    const [altNames, setAltNames] = useState("")
    const [description, setDescription] = useState("")
    const [images, setImages] = useState([])
    const [price, setPrice] = useState("")
    const [labelledPrice, setLabelledPrice] = useState("")
    const [stock, setStock] = useState("")
    const [isAvailable, setIsAvailable] = useState(true)
    const [category, setCategory] = useState("Laptop")
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const navigate = useNavigate()

    async function handleSave(){

        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("You are not logged in")
            navigate("/login")
            return
        }

        try {

            const imageUploadPromises = []

            for(let i=0; i<images.length; i++){
                imageUploadPromises[i] = uploadMedia(images[i])
            }
            
            
            const imageUrls = await Promise.all(imageUploadPromises)
            console.log(imageUrls)


            
        } catch (err) {

            console.log(err)
            toast.error("Failed to add product")
            
        }

    }

    return(
        <div className="w-full max-h-full flex flex-wrap p-4 items-start overflow-y-scroll">

            <div className="w-full h-[100px] bg-white shadow-md rounded-md flex items-center p-4 justify-between mb-8">

                <h1 className="text-2xl font-semibold text-secondary">Add Porduct</h1>

                <div className="flex gap-2">

                    <button onClick={handleSave} className="p-2 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700">Save</button>
                    <Link to="/admin/products" className="p-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-red-700">Cancel</Link>
                </div>

            </div>

            <div className="w-[15%] flex flex-col  h-[80px] p-2 mb-2">

                <label className="text-secondary text-lg font-semibold mb-2">Product Id</label>
                <input type="text" value={productId} onChange={(e)=>setProductId(e.target.value)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />

            </div>

            <div className="w-[40%] flex flex-col  h-[80px] p-2 mb-2">

                <label className="text-secondary text-lg font-semibold mb-2">Product Name</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />

            </div>

            <div className="w-[45%] flex flex-col  h-[80px] p-2 mb-2">

                <label className="text-secondary text-lg font-semibold mb-2">Alternative Names</label>
                <input type="text" value={altNames} onChange={(e)=>setAltNames(e.target.value)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />

            </div>
            <div className="w-full flex flex-col  h-[150px] p-2  mb-2">

                <label className="text-secondary text-lg font-semibold mb-2">Description</label>
                <textarea  value={description} onChange={(e)=>setDescription(e.target.value)} className="w-full h-[150px] rounded-md border-2 border-gray-300 p-2  " />

            </div>
            <div className="w-[45%] flex flex-col  h-[80px] p-2 mb-2">

                <label className="text-secondary text-lg font-semibold mb-2">Images</label>
                <input type="file" multiple={true} onChange={(e)=>setImages(e.target.files)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />

            </div>
            <div className="w-[30%] flex flex-col  h-[80px] p-2 mb-2">

                <label className="text-secondary text-lg font-semibold mb-2">Price</label>
                <input type="number"  value={price} onChange={(e)=>setPrice(e.target.value)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />

            </div>
            <div className="w-[25%] flex flex-col  h-[80px] p-2 mb-2">

                <label className="text-secondary text-lg font-semibold mb-2">Labaled Price</label>
                <input type="number"  value={labelledPrice} onChange={(e)=>setLabelledPrice(e.target.value)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />

            </div>
            <div className="w-[25%] flex flex-col  h-[80px] p-2 mb-2">

                <label className="text-secondary text-lg font-semibold mb-2">Stock</label>
                <input type="number"  value={stock} onChange={(e)=>setStock(e.target.value)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />

            </div>
            {/* <div className="w-[30%] flex flex-col  h-[80px] p-2">

                <label className="text-secondary text-lg font-semibold mb-2">Available</label>
                <input type="checkbox"  value={isAvailable} onChange={(e)=>setIsAvailable(e.target.checked)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />

            </div> */}
            <div className="w-[25%] flex flex-col  h-[80px] p-2 mb-2">

                <label className="text-secondary text-lg font-semibold mb-2">Availability</label>
                <select value={isAvailable} onChange={(e)=>setIsAvailable(e.target.value)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4">
                    <option value={true}>Available</option>
                    <option value={false}>Not Available</option>
                </select>
            </div>
            <div className="w-[50%] flex flex-col">
                
            </div>
            <div className="w-[25%] flex flex-col  h-[80px] p-2 mb-2">

                <label className="text-secondary text-lg font-semibold mb-2">Categories</label>
                <select value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4">
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

                </select>
            </div>
            <div className="w-[25%] flex flex-col  h-[80px] p-2 mb-2">

                <label className="text-secondary text-lg font-semibold mb-2">Brand</label>
                <input type="text"  value={brand} onChange={(e)=>setBrand(e.target.value)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />

            </div>
            <div className="w-[25%] flex flex-col  h-[80px] p-2 mb-2">

                <label className="text-secondary text-lg font-semibold mb-2">Model</label>
                <input type="text"  value={model} onChange={(e)=>setModel(e.target.value)} className="w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />

            </div>

           
        </div>
    )
}