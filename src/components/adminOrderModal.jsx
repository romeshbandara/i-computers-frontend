import { FaEye } from "react-icons/fa"
import Modal from "react-modal"
import { useState } from "react"
import getFormattedPrice from "../../lib/priceFormat"
import formatTimestamp from "../../lib/dateFormat"

export default function AdminOrdersModal(props) {
    const refresh = props.refresh
    const order = props.order
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [orderStatus, setOrderStatus] = useState(order.status)

    return (
        <>
            <FaEye onClick={() => { setModalIsOpen(true) }} />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => (setModalIsOpen(false))}
                style={
                    {
                        content: {
                            width: '600px',
                            margin: 'auto',
                            padding: '0px',
                            backgroundColor: 'transparent',
                            border: 'none',

                        }
                    }
                }
            >

                <div className="w-full min-h-full bg-primary flex flex-col rounded-2xl relative">

                    <div className="w-full h-[50px] bg-accent rounded-t-2xl flex justify-center items-center ">
                        <h1 className="text-xl text-white font-semibold">Order Summary :-</h1>
                        <h1 className="text-xl text-white font-semibold pl-1">({order.orderId})</h1>
                    </div>

                    <div className="w-full flex flex-wrap justify-center items-center bg-white text-secondary sticky top-0 shadow-md px-2 gap-x-6">
                        <div className=" flex gap-4 justify-center items-center ">
                            <h1 className="text-lg  font-semibold">Total :</h1>

                            <span className="text-lg ">{getFormattedPrice(order.totalAmount)}</span>
                        </div>

                        <div className=" flex gap-4 justify-center items-center ">
                            <h1 className="text-lg  font-semibold">Items :</h1>
                            <span className="text-lg ">{order.items.length}</span>
                        </div>

                        <div className="w-full flex gap-4 justify-center items-center border-t-2 border-black">

                            <span className="text-lg ">{formatTimestamp(order.date)}</span>
                        </div>

                        <div className="w-full flex gap-x-4 justify-center items-center border-t-2 border-black">

                            <span className="text-lg text-center">{order.firstName} {order.lastName} {order.addressLine1} {order.addressLine2} ({order.phone} | {order.secondaryPhone})</span>
                        </div>
                        <div className="w-full h-[50px] flex gap-x-4 justify-center items-center border-t-2 border-black">
                            <label>Order Status :-</label>
                            <select value={orderStatus} onChange={(e)=>{
                                setOrderStatus(e.target.value)
                            }}>
                                <option value="pending" selected={order.status === "pending"}>Pending</option>
                                <option value="processing" selected={order.status === "processing"}>Processing</option>
                                <option value="shipped" selected={order.status === "shipped"}>Shipped</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full h-[100px] gap-[10%] p-4 flex flex-wrap">
                        {
                            order.customerNote == "" ? <h1 className="text-lg text-center">No Customer Note</h1> : <h1 className="text-lg text-center">Customer Note :- {order.customerNote}</h1>
                        }
                    </div>
                    {
                        order.items.map((item, index) => {
                            return (
                                <>
                                    <div key={index} className="w-full h-[100px] flex gap-x-4 justify-between items-center border-t-2 border-black overflow-y-scroll p-4">

                                        <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover" />
                                        <div className="w-[calc(100%-100px)] flex flex-col gap-y-2">
                                            <h1 className="text-lg font-semibold">{item.product.name}</h1>
                                            <span className="text-md text-secondary ">{getFormattedPrice(item.product.price)} x {item.qty} = {getFormattedPrice(item.qty * item.product.price)}</span>
                                        </div>

                                    </div>

                                </>
                            )
                        })
                    }
                    {orderStatus !== order.status && 
                        <button className="absolute bottom-3 right-3 p-2 bg-green-600 rounded-2xl flex justify-center items-center text-white font-semibold">
                            Update Status
                        </button>
                    }
                </div>

            </Modal>
        </>
    )
}