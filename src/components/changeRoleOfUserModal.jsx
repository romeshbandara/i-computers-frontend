import { useState } from "react"
import toast from "react-hot-toast"
import Modal from "react-modal"
import api from "../../lib/api"
import { RiAdminFill, RiUserFill } from "react-icons/ri"

Modal.setAppElement("#root")

export default function ChangeRoleOfUserModal({ user, refresh }) {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const isAdmin = Boolean(user.isAdmin)

    async function changeRole() {
        setIsSaving(true)
        try {
            const token = localStorage.getItem("token")
            await api.put("/users/role", {
                email: user.email,
                isAdmin: !isAdmin,
            }, {
                headers: { Authorization: "Bearer " + token },
            })
            toast.success(`Admin rights ${isAdmin ? "revoked" : "granted"} successfully`)
            setModalIsOpen(false)
            refresh()
        } catch (err) {
            toast.error(err.response?.data?.message || "Unable to update this user's role.")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <>
            <button type="button" onClick={() => setModalIsOpen(true)} className="cursor-pointer p-1 rounded-md hover:bg-white/10 transition-colors" aria-label={isAdmin ? `Revoke admin rights from ${user.email}` : `Make ${user.email} an admin`} title={isAdmin ? "Revoke admin rights" : "Make admin"}>
                {isAdmin ? <RiUserFill className="text-xl text-green-500" /> : <RiAdminFill className="text-xl text-red-500" />}
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => !isSaving && setModalIsOpen(false)}
                shouldCloseOnOverlayClick={!isSaving}
                shouldCloseOnEsc={!isSaving}
                contentLabel={`${isAdmin ? "Revoke admin rights" : "Make admin"} confirmation`}
                style={{
                    overlay: { backgroundColor: "rgba(2, 8, 23, 0.78)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" },
                    content: { position: "relative", inset: "auto", width: "calc(100% - 2rem)", maxWidth: "450px", margin: 0, padding: 0, background: "transparent", border: "none", overflow: "visible" },
                }}
            >
                <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#020817] text-white shadow-2xl">
                    <div className="px-5 py-4 bg-white/5 border-b border-white/10">
                        <h2 className="text-lg font-bold">{isAdmin ? "Revoke Admin Rights" : "Make Admin"}</h2>
                        <p className="mt-1 text-sm text-gray-400 break-all">{user.email}</p>
                    </div>
                    <div className="p-5">
                        <p className="text-sm text-gray-300">{isAdmin ? "This user will lose access to the admin dashboard and its management tools." : "This user will gain access to the admin dashboard and its management tools."}</p>
                        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                            <button type="button" disabled={isSaving} onClick={() => setModalIsOpen(false)} className="px-4 py-2 rounded-xl bg-white/10 text-white text-sm font-semibold hover:bg-white/15 transition-all disabled:opacity-50 cursor-pointer">Cancel</button>
                            <button type="button" disabled={isSaving} onClick={changeRole} className={`px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all disabled:opacity-50 cursor-pointer ${isAdmin ? "bg-gradient-to-r from-red-500 to-rose-600" : "bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600"}`}>{isSaving ? "Saving..." : isAdmin ? "Revoke Admin Rights" : "Make Admin"}</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}