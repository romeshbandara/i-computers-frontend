import { Route, Routes } from "react-router-dom";
import Header from "../src/components/header.jsx";
import ProductsPage from "./productsPage.jsx";
import ProductOverview from "./productOverview.jsx";
import CartPage from "./cartPage.jsx";
import CheckOutPage from "./checkOut.jsx";
import MyOrdersPage from "./myOrdersPage.jsx";
import SettingsPage from "./settingsPage.jsx";
import LandingPage from "./landingPage.jsx";
import AboutPage from "./aboutPage.jsx";
import ContactPage from "./contactPage.jsx";
import NotFoundPage from "./notFoundPage.jsx";

export default function HomePage() {
    return (
        <div className="min-h-screen w-full bg-[#020817] text-white flex flex-col">
            <Header />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/overview/:productId" element={<ProductOverview />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckOutPage />} />
                <Route path="/my-orders" element={<MyOrdersPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/*" element={<NotFoundPage />} />
            </Routes>
        </div>
    )
}