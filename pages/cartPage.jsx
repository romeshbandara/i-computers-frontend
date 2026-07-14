import { useState } from "react"
import { addToCart, getCart } from "../lib/cart"
import getFormattedPrice from "../lib/priceFormat"
import { FaTrash } from "react-icons/fa"

export default function CartPage(){

    const [cart,setCart] = useState(getCart())

    console.log(cart)

    return(
        <div className="w-full h-[calc(100vh-100px)]  overflow-y-scroll flex flex-col items-center">
            {cart.map(
                (item,index)=>{
                    return(
                        <div key={index} className="w-[700px] min-h-[150px] shadow-md rounded p-2 overflow-hidden bg-white my-4 flex relative">
                            <img src={item.product.image} alt={item.product.name} className="h-full w-[130px] object-cover"/>
                            <div className="w-[calc(700px-130px)] h-full flex flex-col ml-4 ">
                                <button className="right-0 top-0 absolute mr-4 mt-2 cursor-pointer hover:text-red-600" onClick={
                                    ()=>{
                                        addToCart(item.product, -item.qty)
                                        setCart(getCart())
                                    }
                                }><FaTrash /></button>
                                <h1 className="text-xs text-gray-600">PID:- {item.product.productId}</h1>
                                <h1 className="text-md ">{item.product.name}</h1>
                                {
                                    item.product.labledPrice>item.product.price&&<span className="line-through text-xs">
                                        {getFormattedPrice(item.product.labledPrice)}
                                    </span>
                                }
                                <h1 className="text-accent font-semibold text-lg">{getFormattedPrice(item.product.price)}</h1>
                                <div className=" w-full  h-full flex items-center justify-between">
                                        <div className="w-[120px] h-[50px] border border-accent rounded-md overflow-hidde flex flex-row">
                                        <button className="bg-accent text-white w-[50px] rounded-l-md  hover:bg-black transition-colors duration-100 cursor-pointer" onClick={
                                            ()=>{
                                                if (item.qty>1) {
                                                    addToCart(item.product , -1)
                                                }
                                                
                                                setCart(getCart())
                                            }
                                        }>-</button>
                                        <span className="w-[50px] flex items-center justify-center">{item.qty}</span>
                                        <button className="bg-accent text-white w-[50px] rounded-r-md  hover:bg-black cursor-pointer transition-colors duration-100" onClick={
                                            ()=>{
                                                addToCart(item.product , 1)
                                                setCart(getCart())
                                            }
                                        }>+</button>
                                        </div>

                                        <h1 className="text-xl">Total :- <span className="text-accent font-semibold">{getFormattedPrice(item.product.price*item.qty)}</span></h1>
                                </div>
                                
                            </div>
                        </div>
                    )
                }
            )}
        </div>
    )
}