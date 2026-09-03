import { Route, Routes } from "react-router-dom";
import Header from "../src/components/header.jsx";
import ProductsPage from "./productsPage.jsx";
import ProductOverview from "./productOverview.jsx";
import CartPage from "./cartPage.jsx";
import CheckOutPage from "./checkOut.jsx";
import MyOrdersPage from "./myOrdersPage.jsx";


export default function HomePage(){

    return(
        <div className="min-h-full w-full bg-primary">
            <Header/>
            <Routes>
                <Route path="/" element={<h1>Home Page</h1>} />
                <Route path="/about" element={<h1>About Page</h1>} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/overview/:productId" element={<ProductOverview />} />
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/*" element={<h1>404 Not Found</h1>} />
                <Route path="/checkout" element={<CheckOutPage/>} />
                <Route path="/my-orders" element={<MyOrdersPage/>} />
            </Routes>
        </div>
        
    )


}