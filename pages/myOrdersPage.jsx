import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import api from "../lib/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiEdit, CiTrash } from "react-icons/ci";
import LoadingAnimation from "../src/components/loadingAnimation.jsx";
import getFormattedPrice from "../lib/priceFormat.js";
import formatTimestamp from "../lib/dateFormat.js";
import AdminOrdersModal from "../src/components/adminOrderModal.jsx";
import MyOrderModal from "../src/components/myOrderModal.jsx";



export default function MyOrdersPage() {



    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const token = localStorage.getItem("token")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalOrders, setTotalOrders] = useState(0)
    const [pageSize, setPageSize] = useState(10)



    useEffect(() => {
        api.get(`/orders/${pageSize}/${currentPage}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((response) => {

            if (isLoading) {

                setOrders(response.data.orders)
                setTotalPages(response.data.totalPages)
                setTotalOrders(response.data.totalCount)
                setIsLoading(false)
            }

        })
    }, [isLoading])



    return (
        <div className="w-full max-h-full flex flex-col p-4 items-start overflow-y-scroll">

            {
                isLoading && <LoadingAnimation />
            }

            <div className="w-full h-[100px] bg-white shadow-md rounded-md flex items-center p-4 justify-between mb-8">

                <h1 className="text-2xl font-semibold text-secondary">All Orders</h1>
                <h1>{totalOrders} Orders</h1>
                <div className="h-full px-4 flex items-center justify-center gap-2 bg-white text-black  rounded-md cursor-pointer ">
                        <label>Items per page:</label>
                        <select className="h-full  cursor-pointer " value={pageSize} onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setIsLoading(true);
                        }}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
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

            <table className="w-full bg-white shadow-md rounded-md text-center mb-[100px]">


                <thead className="bg-accent text-white h-[80px] ">
                    <tr className="text-lg font-semibold">
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>City</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Item Count</th>
                        <th>Total</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>

                <tbody >

                    {orders.map(
                        (item, index) => {
                            return (
                                <tr key={item.orderId} className="  hover:bg-accent transition-all duration-200 hover:text-white  odd:bg-secondary/20a even:bg-gray-100 ">

                                    <td>{item.orderId}</td>
                                    <td>{formatTimestamp(item.date)}</td>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.city}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.status}</td>
                                    <td>{item.items.length}</td>
                                    <td>{getFormattedPrice(item.totalAmount)}</td>
                                    <td>
                                        <div className="text-xl  cursor-pointer flex items-center justify-center gap-2">
                                            <MyOrderModal order={item} refresh={()=>{setIsLoading(true)}}/>
                                        </div>
                                        
                                    </td>
                                </tr>
                            )
                        }
                    )


                    }

                </tbody>


            </table>

            <div className="w-full h-[100px] fixed bottom-2  rounded-md flex items-center p-4 justify-center mt-8">
                <div className="w-[500px] h-[50px] bg-white shadow-2xl rounded-full flex items-center  overflow-hidden  justify-between mt-8">
                    <button className=" h-[50px] w-[120px] bg-white text-black px-4  rounded-md cursor-pointer hover:bg-accent hover:text-white transition-colors duration-100" onClick={
                        () => {
                            if (currentPage === 1) {
                                return
                            }
                            const newPageNumber = currentPage - 1
                            setCurrentPage(newPageNumber)
                            setIsLoading(true)
                        }
                    }>
                        &lt; Previous
                    </button>
                    
                    <div className="h-full px-4 flex items-center justify-center gap-2 bg-white text-black  rounded-md cursor-pointer ">
                        <span>{currentPage} of {totalPages}</span>
                    </div>

                    <button className="h-[50px] w-[120px] bg-white  text-black px-4  rounded-md cursor-pointer hover:bg-accent hover:text-white transition-colors duration-100" onClick={
                        () => {
                            if (totalPages === currentPage) {
                                return
                            }
                            const newPageNumber = currentPage + 1
                            setCurrentPage(newPageNumber)
                            setIsLoading(true)
                        }
                    }>
                        Next &gt;
                    </button>
                </div>
            </div>


        </div>
    )
}