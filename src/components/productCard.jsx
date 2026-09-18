import { Link } from "react-router-dom"
import getFormattedPrice from "../../lib/priceFormat"
import { FiArrowRight } from "react-icons/fi"

export default function ProductCard(props) {
    const product = props.product

    return (
        <Link
            to={"/overview/" + product.productId}
            state={product}
            className="group bg-white/5 backdrop-blur-md border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] rounded-2xl w-full max-w-[340px] sm:max-w-[360px] m-3 sm:m-4 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        >
            <div className="w-full h-[280px] sm:h-[300px] relative bg-white/[0.03] p-4 flex items-center justify-center border-b border-white/5 overflow-hidden">
                <img
                    src={product.images[0]}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    alt={product.name}
                />

                {product.images?.[1] && (
                    <img
                        src={product.images[1]}
                        className="w-full h-full absolute inset-0 object-contain p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#070d1e]"
                        alt={product.name}
                    />
                )}
            </div>

            <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-cyan-400 font-mono tracking-wider uppercase">{product.productId}</span>
                        {product.brand && (
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-medium">
                                {product.brand}
                            </span>
                        )}
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mt-2 line-clamp-2">
                        {product.name}
                    </h2>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-end justify-between">
                    <div>
                        {product.labledPrice > product.price && (
                            <span className="text-xs text-gray-500 line-through block">
                                {getFormattedPrice(product.labledPrice)}
                            </span>
                        )}
                        <span className="text-xl font-black text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
                            {getFormattedPrice(product.price)}
                        </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-300 group-hover:text-cyan-400 transition-colors">
                        <span>Details</span>
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </span>
                </div>
            </div>
        </Link>
    )
}

