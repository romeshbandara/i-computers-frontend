import { useState } from "react"
import { addToCart, getCart, getCartTotal } from "../lib/cart"
import getFormattedPrice from "../lib/priceFormat"
import { FaTrash } from "react-icons/fa"
import { Link } from "react-router-dom"
import { TbMoodEmptyFilled } from "react-icons/tb"

export default function CartPage() {

    const [cart, setCart] = useState(getCart())

    console.log(cart)

    return (
        <div className="w-full h-[calc(100vh-100px)]  overflow-y-scroll flex flex-col items-center pb-[180px]">
            {cart[0] == null ? <div className="w-full h-full text-2xl flex flex-col justify-center items-center gap-4"><TbMoodEmptyFilled className="text-9xl"/><h1 className="text-secondary">Cart is empty</h1></div> : cart.map(
                (item, index) => {
                    return (
                        <div key={index} className="lg:w-[700px] w-[350px] min-h-[150px] shadow-md rounded p-2 overflow-hidden bg-white my-4 flex relative">
                            <img src={item.product.image} alt={item.product.name} className="lg:h-full lg:w-[130px] h-20 w-20 object-cover" />
                            <div className="lg:w-[calc(700px-130px)] w-full h-full flex flex-col ml-4 ">
                                <button className="right-0 top-0 absolute mr-4 mt-2 cursor-pointer hover:text-red-600" onClick={
                                    () => {
                                        addToCart(item.product, -item.qty)
                                        setCart(getCart())
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
                                <div className=" w-full  h-full flex lg:flex-row flex-col lg:items-center lg:justify-between justify-center items-start  gap-4 mt-5 lg:mt-0">
                                    <div className="lg:w-[120px] w-[120px] h-[50px] border border-accent rounded-md overflow-hidden flex flex-row">
                                        <button className="bg-accent text-white w-[50px] rounded-l-md  hover:bg-black transition-colors duration-100 cursor-pointer" onClick={
                                            () => {
                                                if (item.qty > 1) {
                                                    addToCart(item.product, -1)
                                                }

                                                setCart(getCart())
                                            }
                                        }>-</button>
                                        <span className="w-[50px] flex items-center justify-center">{item.qty}</span>
                                        <button className="bg-accent text-white w-[50px] rounded-r-md  hover:bg-black cursor-pointer transition-colors duration-100" onClick={
                                            () => {
                                                addToCart(item.product, 1)
                                                setCart(getCart())
                                            }
                                        }>+</button>
                                    </div>

                                    <h1 className="text-xl lg:flex flex-col ">Total :- <span className="text-accent font-semibold">{getFormattedPrice(item.product.price * item.qty)}</span></h1>
                                </div>



                            </div>
                        </div>
                    )
                }
            )}

            <div className="lg:w-[1000px] w-[350px] min-h-[100px] shadow-md rounded p-2 overflow-hidden  my-4 flex fixed bottom-4 bg-accent justify-between items-center px-4 lg:mb-0 mb-20">

                <Link to="/checkout" state={cart} className="bg-green-500 flex justify-center items-center shadow-md h-12 w-22 rounded-md text-white border-2 border-transparent hover:bg-black hover:border-white cursor-pointer transition-colors duration-200">Checkout</Link>
                <div>
                    <h1 className="text-white text-lg">Total</h1>
                    <h1 className="text-white text-2xl">{getFormattedPrice(getCartTotal(cart))}</h1>
                </div>

            </div>

        </div>
    )
}