import { Link } from "react-router-dom"
import getFormattedPrice from "../../lib/priceFormat"


export default function ProductCard(props){

    const product = props.product
    
    

    return(
        <Link to={"/overview/"+product.productId} state={product} className="bg-white shadow-2xl  w-[390px] h-[500px] m-6 rounded-xl cursor-pointer hover:[&_.primary-image]:opacity-0  flex flex-col  overflow-hidden">
            <div className="w-full h-[350px] relative ">
                <img
                    src={product.images[0]}
                    className="w-full h-full absolute object-contain"
                    alt={product.name}
                />

                {product.images?.[1] && (
                    <img
                        src={product.images[1]}
                        className="w-full h-full absolute object-contain primary-image transition-opacity duration-700 bg-white"
                        alt={product.name}
                    />
                )}
            </div>
            <span className="text-sm text-secondary font-thin mt-4 px-4">{product.productId}</span>
            <h1 className="text-lg font-semibold mt-2 px-4">{product.name}</h1>
            {product.labledPrice > product.price && <span className="text-sm text-secondary mt-2 px-4 line-through">{getFormattedPrice(product.labledPrice)}</span>}
            <span className="text-lg mt-2 px-4">{getFormattedPrice(product.price)}</span>
        </Link>
    )

}

