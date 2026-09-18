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



    if (!cart || cart.length === 0) {
        return (
            <main className="w-full min-h-[calc(100vh-85px)] bg-[#020817] text-white flex flex-col justify-center items-center p-6 text-center">
                <h1 className="text-2xl font-bold mb-3">No Items to Checkout</h1>
                <p className="text-gray-400 text-sm mb-6">Your checkout list is empty.</p>
                <Link
                    to="/products"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-semibold text-sm text-white shadow-lg shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all"
                >
                    Return to Products
                </Link>
            </main>
        )
    }

    return (
        <main className="w-full min-h-[calc(100vh-85px)] bg-[#020817] text-white relative overflow-hidden flex flex-col items-center pb-36 pt-6 px-4">
            {/* Ambient Background Glows */}
            <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] bg-blue-600/15 blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] bg-purple-600/15 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-6">
                    <h1 className="text-2xl sm:text-3xl font-black">
                        Review & <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Checkout</span>
                    </h1>
                    <span className="text-xs text-cyan-400 font-mono tracking-wider px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                        {cart.length} item{cart.length > 1 ? "s" : ""}
                    </span>
                </div>

                <div className="w-full flex flex-col gap-4">
                    {cart.map((item, index) => (
                        <div
                            key={index}
                            className="w-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-cyan-400/40 rounded-2xl p-4 sm:p-5 shadow-xl relative flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center transition-all"
                        >
                            <button
                                className="absolute right-4 top-4 text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 active:scale-90 transition-all cursor-pointer"
                                onClick={() => navigate("/products")}
                                aria-label="Cancel item"
                            >
                                <FaTrash className="text-sm" />
                            </button>

                            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-xl bg-white/[0.04] p-2 flex items-center justify-center border border-white/5 shrink-0">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="h-full w-full object-contain"
                                />
                            </div>

                            <div className="flex-1 pr-8">
                                <span className="text-[11px] text-cyan-400 font-mono uppercase tracking-wider block">
                                    PID: {item.product.productId}
                                </span>
                                <h2 className="text-base font-bold text-white mt-0.5 line-clamp-1">
                                    {item.product.name}
                                </h2>
                                <div className="flex items-center gap-2 mt-1">
                                    {item.product.labledPrice > item.product.price && (
                                        <span className="line-through text-xs text-gray-500">
                                            {getFormattedPrice(item.product.labledPrice)}
                                        </span>
                                    )}
                                    <span className="text-cyan-400 font-semibold text-sm">
                                        {getFormattedPrice(item.product.price)}
                                    </span>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-4 mt-3">
                                    {/* Quantity controls */}
                                    <div className="h-9 border border-white/15 bg-white/5 rounded-xl overflow-hidden flex items-center">
                                        <button
                                            className="w-9 h-full flex items-center justify-center bg-white/5 hover:bg-cyan-500/20 text-gray-300 hover:text-cyan-300 transition-colors cursor-pointer text-sm font-bold"
                                            onClick={() => {
                                                if (item.qty > 1) {
                                                    const newCart = [...cart]
                                                    newCart[index].qty -= 1
                                                    setCart(newCart)
                                                }
                                            }}
                                        >
                                            -
                                        </button>
                                        <span className="w-10 h-full flex items-center justify-center text-xs font-semibold text-white">
                                            {item.qty}
                                        </span>
                                        <button
                                            className="w-9 h-full flex items-center justify-center bg-white/5 hover:bg-cyan-500/20 text-gray-300 hover:text-cyan-300 transition-colors cursor-pointer text-sm font-bold"
                                            onClick={() => {
                                                const newCart = [...cart]
                                                newCart[index].qty += 1
                                                setCart(newCart)
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="text-right">
                                        <span className="text-xs text-gray-400 block">Subtotal</span>
                                        <span className="text-lg font-bold text-cyan-400">
                                            {getFormattedPrice(item.product.price * item.qty)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Checkout Actions Bar */}
            <div className="fixed bottom-20 lg:bottom-6 w-[92%] max-w-3xl bg-[#020817]/90 backdrop-blur-xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.6)] rounded-2xl p-4 flex flex-row justify-between items-center z-30">
                <div className="flex items-center gap-3">
                    <OrderModal cart={cart} />
                    <Link
                        to={"/overview/" + cart[0].product.productId}
                        className="px-4 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 font-semibold text-xs sm:text-sm transition-all"
                    >
                        Cancel
                    </Link>
                </div>

                <div className="text-right">
                    <span className="text-xs text-gray-400 block">Final Total</span>
                    <span className="text-xl sm:text-2xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                        {getFormattedPrice(getCartTotal(cart))}
                    </span>
                </div>
            </div>
        </main>
    )
}