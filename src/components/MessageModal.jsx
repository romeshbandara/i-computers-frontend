import { useState } from "react"
import { createPortal } from "react-dom"
import { FaEye } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import { Link, useLocation } from "react-router-dom"

export default function MessageModal(props) {
    const [showModal, setShowModal] = useState(false)
    const item = props.item

    return (
        <>
            <button onClick={() => setShowModal(true)} type="button">
                <FaEye className="text-xl cursor-pointer" />
            </button>

            {/* createPortal forces the modal to escape table constraints and cover the whole screen */}
            {showModal && createPortal(
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
                    
                    <div className="w-[450px] h-[450px] bg-[#020817] border-4 border-white rounded-2xl text-white overflow-hidden p-4 flex flex-col gap-4 relative">
                        <button onClick={()=>{setShowModal(false)}}><ImCross className="absolute top-5 right-5 text-red-600 text-xl cursor-pointer hover:text-red-900" /></button>
                        <div className="w-full flex   p-2 ">
                            <h1 className="text-lg whitespace-nowrap">From :- {item.email}</h1>
                        </div>
                        <div className="w-full flex justify-center  p-2 ">
                            <h1 className="text-xl whitespace-nowrap">{item.subject}</h1>
                        </div>
                        <div className="w-full flex border-2 border-white rounded-lg px-4 py-2 ">
                            <p className="text-sm">{item.message}</p>
                        </div>
                        
                        
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}