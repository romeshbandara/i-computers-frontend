import { FaEye } from "react-icons/fa"
import Modal from "react-modal"
import { useState } from "react"
import getFormattedPrice from "../../lib/priceFormat"
import formatTimestamp from "../../lib/dateFormat"
import toast from "react-hot-toast"
import api from "../../lib/api"
import { Link } from "react-router-dom"

export default function MyOrderModal(props) {
    const refresh = props.refresh
    const order = props.order
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [orderStatus, setOrderStatus] = useState(order.status)

    async function updateOrderStatus() {
        try {
            const token = localStorage.getItem("token")
            await api.put("/orders/" + order.orderId + "/" + orderStatus, {}, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            toast.success("Order status updated successfully")
            refresh()
            setModalIsOpen(false)
        } catch (err) {
            toast.error("Failed to update order status" + err)
        }
    }

    return (
        <>
            <button
                onClick={() => setModalIsOpen(true)}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 transition-all cursor-pointer"
                title="View order details"
            >
                <FaEye />
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                        zIndex: 1000,
                    },
                    content: {
                        width: "min(620px, 92vw)",
                        maxHeight: "90vh",
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        transform: "translate(-50%, -50%)",
                        margin: "0",
                        padding: "0px",
                        backgroundColor: "transparent",
                        border: "none",
                        overflow: "hidden",
                    },
                }}
            >
                <div className="w-full max-h-[90vh] overflow-y-auto bg-primary flex flex-col rounded-2xl">

                    {/* Header */}
                    <div className="w-full h-[55px] bg-accent rounded-t-2xl flex justify-center items-center gap-2 px-4 shrink-0">
                        <h1 className="text-lg text-white font-semibold">Order Summary</h1>
                        <span className="text-sm text-white/70 font-mono">({order.orderId})</span>
                    </div>

                    {/* Info Bar */}
                    <div className="w-full flex flex-wrap justify-center items-center bg-white text-secondary sticky top-0 shadow-md px-4 py-2 gap-x-6 gap-y-1">
                        <div className="flex gap-2 items-center">
                            <span className="font-semibold">Total:</span>
                            <span>{getFormattedPrice(order.totalAmount)}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <span className="font-semibold">Items:</span>
                            <span>{order.items.length}</span>
                        </div>
                        <div className="w-full flex justify-center border-t border-black/10 pt-1">
                            <span className="text-sm text-gray-500">{formatTimestamp(order.date)}</span>
                        </div>
                        <div className="w-full flex justify-center border-t border-black/10 pt-1 pb-1">
                            <span className="text-sm text-center">
                                {order.firstName} {order.lastName} — {order.addressLine1}{order.addressLine2 ? ", " + order.addressLine2 : ""} &nbsp;|&nbsp; {order.phone}{order.secondaryPhone ? " / " + order.secondaryPhone : ""}
                            </span>
                        </div>
                        <div className="w-full flex justify-center border-t border-black/10 pt-1 pb-1">
                            <span className="text-sm font-semibold text-accent">
                                Status: {order.status}
                            </span>
                        </div>
                    </div>

                    {/* Customer Note */}
                    {order.customerNote ? (
                        <div className="w-full px-4 py-3 bg-yellow-50 border-b border-black/10">
                            <p className="text-sm text-gray-600"><span className="font-semibold">Note:</span> {order.customerNote}</p>
                        </div>
                    ) : (
                        <div className="w-full px-4 py-3 bg-gray-50 border-b border-black/10">
                            <p className="text-sm text-gray-400 italic text-center">No customer note</p>
                        </div>
                    )}

                    {/* Order Items */}
                    {order.items.map((item, index) => (
                        <Link
                            key={index}
                            to={`/overview/${item.product.productId}`}
                            className="w-full flex gap-4 items-center border-t border-black/10 p-4 hover:bg-accent/10 transition-colors duration-200"
                        >
                            <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-16 h-16 object-contain rounded-lg bg-gray-100 p-1 shrink-0"
                            />
                            <div className="flex-1 flex flex-col gap-0.5">
                                <h2 className="text-sm font-semibold text-secondary line-clamp-2">{item.product.name}</h2>
                                <span className="text-xs text-gray-500">
                                    {getFormattedPrice(item.product.price)} × {item.qty} = <strong>{getFormattedPrice(item.qty * item.product.price)}</strong>
                                </span>
                            </div>
                        </Link>
                    ))}

                    {/* Bottom padding */}
                    <div className="h-4" />
                </div>
            </Modal>
        </>
    )
}