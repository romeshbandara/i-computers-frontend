import {Link} from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function AdminProudctsPage(){
    return(
        <div className="w-full h-full flex flex-col ">
            <Link to="/admin/add-product" className="w-[60px] h-[60px] bg-accent text-white text-2xl rounded-full flex items-center justify-center fixed right-[35px] bottom-[35px]">
                <FaPlus/>
            </Link>
        </div>
    )
}