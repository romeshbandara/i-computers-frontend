import { Navigate, NavLink, Route, Routes } from "react-router-dom"
import { useContext } from "react"
import { BsBox } from "react-icons/bs"
import { LuUsersRound } from "react-icons/lu"
import { IoCartOutline } from "react-icons/io5"
import { FaRegMessage } from "react-icons/fa6"
import AdminProductsPage from "./admin/adminProductsPage"
import AddProductForm from "./admin/adminAddProductForm"
import EditProductForm from "./admin/adminEditProductForm"
import AdminOrdersPage from "./admin/adminOrders"
import AdminUsersPage from "./admin/adminUsersPage"
import UserContext from "../src/context/userContext"
import AdminContactPage from "./admin/adminContactPage"

const navigationItems = [
    { to: "/admin", label: "Orders", Icon: IoCartOutline, end: true },
    { to: "/admin/products", label: "Products", Icon: BsBox },
    { to: "/admin/users", label: "Users", Icon: LuUsersRound },
    { to: "/admin/contact", label: "Messages", Icon: FaRegMessage },
]

function AdminNavigation({ mobile = false }) {
    return (
        <nav className={mobile ? "flex flex-1 items-center justify-end gap-1 overflow-x-auto" : "flex flex-col p-3 gap-1 mt-2"}>
            {navigationItems.map(({ to, label, Icon, end }) => (
                <NavLink
                    key={to}
                    to={to}
                    end={end}
                    className={({ isActive }) => `${mobile
                        ? "shrink-0 flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg text-[10px]"
                        : "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
                    } font-semibold transition-all duration-150 ${isActive ? "bg-cyan-500/15 text-cyan-300 border border-cyan-400/20" : "text-gray-400 hover:text-white hover:bg-white/10"}`}
                >
                    <Icon className={mobile ? "text-lg shrink-0" : "text-xl shrink-0"} />
                    <span>{label}</span>
                </NavLink>
            ))}
        </nav>
    )
}

export default function AdminPage() {
    const userInfo = useContext(UserContext)

    if (!userInfo?.user?.isAdmin) {
        return <Navigate to="/login" replace />
    }

    return (
        <div className="w-full min-h-screen flex flex-col lg:flex-row bg-[#020817]">
            <header className="lg:hidden sticky top-0 z-40 w-full min-h-[64px] bg-[#020817]/95 backdrop-blur-xl border-b border-white/10 flex items-center gap-2 px-3 shadow-2xl">
                <a href="/" className="shrink-0">
                    <img src="/logo.webp" alt="i-Computers home" className="h-20 w-auto object-cover" />
                </a>
                <AdminNavigation mobile />
            </header>

            <aside className="hidden lg:flex w-[240px] shrink-0 min-h-screen bg-[#020817] border-r border-white/10 flex-col shadow-2xl">
                <div className="w-full h-[90px] flex justify-center items-center border-b border-white/10 px-4">
                    <a href="/">
                        <img src="/logo.webp" alt="i-Computers home" className="h-40 w-auto object-contain" />
                    </a>
                </div>
                <AdminNavigation />
            </aside>

            <main className="min-w-0 flex-1 bg-[#020817]">
                <Routes>
                    <Route path="/" element={<AdminOrdersPage />} />
                    <Route path="/products" element={<AdminProductsPage />} />
                    <Route path="/users" element={<AdminUsersPage />} />
                    <Route path="/add-product" element={<AddProductForm />} />
                    <Route path="/edit-product/" element={<EditProductForm />} />
                    <Route path="/contact/" element={<AdminContactPage />} />
                </Routes>
            </main>
        </div>
    )
}