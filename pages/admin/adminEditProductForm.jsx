import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import uploadMedia from "../../lib/uploadMedia.js";
import LoadingAnimation from "../../src/components/loadingAnimation.jsx";
import { CiCircleInfo } from "react-icons/ci";
import api from "../../lib/api.js";

const CATEGORIES = ["Laptop", "Desktop", "Monitor", "Keyboard", "Mouse", "Graphic Card", "Processor", "Motherboard", "Power Suply", "RAM", "Phone","Gaming Gear"]

const fieldClass = "w-full h-[42px] rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 p-3 text-sm focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-all [&>option]:bg-[#020817]"
const fieldDisabledClass = "w-full h-[42px] rounded-xl bg-white/[0.03] border border-white/5 text-gray-500 p-3 text-sm cursor-not-allowed"
const labelClass = "text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block"

export default function EditProductForm() {
    const location = useLocation()
    const [productId] = useState(location?.state?.productId || "")
    const [name, setName] = useState(location?.state?.name || "")
    const [altNames, setAltNames] = useState(location?.state?.altNames?.join(",") || "")
    const [description, setDescription] = useState(location?.state?.description || "")
    const [images, setImages] = useState([])
    const [price, setPrice] = useState(location?.state?.price || "")
    const [labelledPrice, setLabelledPrice] = useState(location?.state?.labledPrice || "")
    const [stock, setStock] = useState(location?.state?.stock || "")
    const [isAvailable, setIsAvailable] = useState(location?.state?.isAvailable ?? true)
    const [category, setCategory] = useState(location?.state?.category || "Laptop")
    const [brand, setBrand] = useState(location?.state?.brand || "")
    const [model, setModel] = useState(location?.state?.model || "")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    if (!location?.state) {
        navigate("/admin/products")
        return null
    }

    async function handleUpdate() {
        setLoading(true)
        const token = localStorage.getItem("token")
        if (token == null) {
            toast.error("You are not logged in")
            navigate("/login")
            return
        }

        const productData = {
            productId, name,
            altNames: [],
            description,
            images: [],
            price, labledPrice: labelledPrice,
            stock, isAvailable, category, brand, model
        }

        try {
            const imageUploadPromises = []
            for (let i = 0; i < images.length; i++) {
                imageUploadPromises[i] = uploadMedia(images[i])
            }

            const uploadImageURLs = await Promise.all(imageUploadPromises)
            productData.images = uploadImageURLs.length > 0 ? uploadImageURLs : (location?.state?.images || [])
            productData.altNames = altNames.split(",")

            const res = await api.put("/products/" + productId, productData, {
                headers: { Authorization: "Bearer " + token }
            })

            toast.success("Product updated successfully!")
            setLoading(false)
            navigate("/admin/products")

        } catch (err) {
            console.log(err)
            toast.error("Failed to update product (" + (err.response?.data?.error) + ")")
            setLoading(false)
        }
    }

    return (
        <div className="w-full min-h-full bg-[#020817] text-white relative overflow-hidden flex flex-col p-4 sm:p-8">
            {/* Ambient Glows */}
            <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-blue-600/15 blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] bg-purple-600/15 blur-[150px] rounded-full pointer-events-none" />

            {loading && <LoadingAnimation />}

            <div className="relative z-10 w-full max-w-[1000px] mx-auto">

                {/* Header */}
                <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 mb-8 shadow-xl">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black">
                            Edit <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Product</span>
                        </h1>
                        <p className="text-xs text-gray-400 mt-1 font-mono">ID: {productId}</p>
                    </div>
                    <div className="w-full sm:w-auto flex gap-3">
                        <button
                            onClick={handleUpdate}
                            className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold rounded-xl cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all"
                        >
                            Update
                        </button>
                        <Link
                            to="/admin/products"
                            className="px-5 py-2 bg-red-500/20 border border-red-400/30 text-red-300 text-sm font-semibold rounded-xl hover:bg-red-500/30 transition-all"
                        >
                            Cancel
                        </Link>
                    </div>
                </div>

                {/* Current Images Preview */}
                {location?.state?.images?.length > 0 && (
                    <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 mb-6 shadow-xl">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">Current Images</p>
                        <div className="flex flex-wrap gap-3">
                            {location.state.images.map((img, i) => (
                                <img key={i} src={img} alt={`img-${i}`} className="w-20 h-20 object-contain rounded-xl bg-white/10 p-1 border border-white/10" />
                            ))}
                        </div>
                    </div>
                )}

                {/* Form Grid */}
                <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-wrap gap-5">

                    <div className="w-full sm:w-[18%] flex flex-col">
                        <label className={labelClass}>Product ID</label>
                        <input type="text" value={productId} disabled className={fieldDisabledClass} />
                    </div>

                    <div className="w-full sm:w-[38%] flex flex-col">
                        <label className={labelClass}>Product Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={fieldClass} />
                    </div>

                    <div className="w-full sm:w-[38%] flex flex-col">
                        <label className={labelClass}>
                            <span className="flex items-center gap-1.5">
                                Alternative Names
                                <span className="text-gray-500 flex items-center gap-1 font-normal normal-case">
                                    <CiCircleInfo /> comma separated
                                </span>
                            </span>
                        </label>
                        <input type="text" value={altNames} onChange={(e) => setAltNames(e.target.value)} className={fieldClass} />
                    </div>

                    <div className="w-full flex flex-col">
                        <label className={labelClass}>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full h-[130px] rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 p-3 text-sm focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-all resize-none"
                        />
                    </div>

                    <div className="w-full sm:w-[calc(50%-10px)] flex flex-col">
                        <label className={labelClass}>Replace Images <span className="text-gray-500 font-normal normal-case">(leave empty to keep current)</span></label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setImages(e.target.files)}
                            className="w-full h-[42px] rounded-xl bg-white/5 border border-white/10 text-gray-400 p-2 text-sm cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:text-cyan-300 file:text-xs file:cursor-pointer hover:border-cyan-400/40 transition-all"
                        />
                    </div>

                    <div className="w-full sm:w-[calc(16.66%-10px)] flex flex-col">
                        <label className={labelClass}>Price (LKR)</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className={fieldClass} />
                    </div>

                    <div className="w-full sm:w-[calc(16.66%-10px)] flex flex-col">
                        <label className={labelClass}>Labeled Price (LKR)</label>
                        <input type="number" value={labelledPrice} onChange={(e) => setLabelledPrice(e.target.value)} className={fieldClass} />
                    </div>

                    <div className="w-full sm:w-[calc(16.66%-10px)] flex flex-col">
                        <label className={labelClass}>Stock</label>
                        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className={fieldClass} />
                    </div>

                    <div className="w-full sm:w-[calc(25%-10px)] flex flex-col">
                        <label className={labelClass}>Availability</label>
                        <select value={isAvailable} onChange={(e) => setIsAvailable(e.target.value)} className={fieldClass}>
                            <option value={true}>Available</option>
                            <option value={false}>Not Available</option>
                        </select>
                    </div>

                    <div className="w-full sm:w-[calc(25%-10px)] flex flex-col">
                        <label className={labelClass}>Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className={fieldClass}>
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="w-full sm:w-[calc(25%-10px)] flex flex-col">
                        <label className={labelClass}>Brand</label>
                        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className={fieldClass} />
                    </div>

                    <div className="w-full sm:w-[calc(25%-10px)] flex flex-col">
                        <label className={labelClass}>Model</label>
                        <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className={fieldClass} />
                    </div>

                </div>
            </div>
        </div>
    )
}