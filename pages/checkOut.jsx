import { useState } from "react"
import { getCartTotal } from "../lib/cart"
import getFormattedPrice from "../lib/priceFormat"
import { FaTrash } from "react-icons/fa"
import { Link, useLocation, useNavigate } from "react-router-dom"
import OrderModal from "../src/components/orderModal"

export default function CheckOutPage() {

    const location = useLocation()
    const navigate = useNavigate()
    const [cart, setCart] = useState(location.state)



    return (
        <div className="w-full h-[calc(100vh-100px)]  overflow-y-scroll flex flex-col items-center pb-[180px]">
            {cart.map(
                (item, index) => {
                    return (
                        <div key={index} className="w-[700px] min-h-[150px] shadow-md rounded p-2 overflow-hidden bg-white my-4 flex relative">
                            <img src={item.product.image} alt={item.product.name} className="h-full w-[130px] object-cover" />
                            <div className="w-[calc(700px-130px)] h-full flex flex-col ml-4 ">
                                <button className="right-0 top-0 absolute mr-4 mt-2 cursor-pointer hover:text-red-600" onClick={
                                    () => {
                                        navigate("/products")
                                    }
                                }><FaTrash /></button>
                                <h1 className="text-xs text-gray-600">PID:- {item.product.productId}</h1>
                                <h1 className="text-md ">{item.product.name}</h1>
                                {
                                    item.product.labledPrice > item.product.price && <span className="line-through text-xs">
                                        {getFormattedPrice(item.product.labledPrice)}
                                    </span>
                                }
                                <h1 className="text-accent font-semibold text-lg">{getFormattedPrice(item.product.price)}</h1>
                                <div className=" w-full  h-full flex items-center justify-between">
                                    <div className="w-[120px] h-[50px] border border-accent rounded-md overflow-hidde flex flex-row">
                                        <button className="bg-accent text-white w-[50px] rounded-l-md  hover:bg-black transition-colors duration-100 cursor-pointer" onClick={
                                            () => {

                                                if (item.qty > 1) {
                                                    const newCart = [...cart]
                                                    newCart[index].qty -= 1
                                                    setCart(newCart)
                                                }


                                            }
                                        }>-</button>
                                        <span className="w-[50px] flex items-center justify-center">{item.qty}</span>
                                        <button className="bg-accent text-white w-[50px] rounded-r-md  hover:bg-black cursor-pointer transition-colors duration-100" onClick={
                                            () => {
                                                const newCart = [...cart]
                                                newCart[index].qty += 1
                                                setCart(newCart)
                                            }
                                        }>+</button>
                                    </div>

                                    <h1 className="text-xl">Total :- <span className="text-accent font-semibold">{getFormattedPrice(item.product.price * item.qty)}</span></h1>
                                </div>



                            </div>
                        </div>
                    )
                }
            )}

            <div className="w-[1000px] min-h-[100px] shadow-md rounded p-2 overflow-hidden  my-4 flex fixed bottom-4 bg-accent justify-between items-center px-4">
                <div className="flex gap-4">
                    <OrderModal cart={cart}/>
                    <Link to={"/overview/"+cart[0].product.productId} className="bg-red-500 flex justify-center items-center shadow-md  rounded-md text-white border-2 border-transparent hover:bg-black hover:border-white cursor-pointer transition-colors duration-200 px-2 py-2">Cancel</Link>
                </div>

                <div>
                    <h1 className="text-white text-lg">Total</h1>
                    <h1 className="text-white text-2xl">{getFormattedPrice(getCartTotal(cart))}</h1>
                </div>

            </div>

        </div>
    )
}