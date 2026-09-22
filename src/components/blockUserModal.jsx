import { useState } from "react"
import toast from "react-hot-toast"
import { CgBlock, CgUnblock } from "react-icons/cg"
import Modal from "react-modal"
import api from "../../lib/api"

Modal.setAppElement("#root")

export default function BlockUserModal({ user, refresh }) {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const isBlocked = Boolean(user.isBlocked)

    async function updateUserStatus() {
        setIsSaving(true)
        try {
            const token = localStorage.getItem("token")
            await api.put("/users/status", {
                email: user.email,
                isBlocked: !isBlocked,
            }, {
                headers: { Authorization: "Bearer " + token },
            })
            toast.success(`User ${isBlocked ? "unblocked" : "blocked"} successfully`)
            setModalIsOpen(false)
            refresh()
        } catch (err) {
            toast.error(err.response?.data?.message || "Unable to update this user's status.")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <>
            <button type="button" onClick={() => setModalIsOpen(true)} className="cursor-pointer p-1 rounded-md hover:bg-white/10 transition-colors" aria-label={isBlocked ? `Unblock ${user.email}` : `Block ${user.email}`} title={isBlocked ? "Unblock user" : "Block user"}>
                {isBlocked ? <CgUnblock className="text-xl text-green-500" /> : <CgBlock className="text-xl text-red-500" />}
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => !isSaving && setModalIsOpen(false)}
                shouldCloseOnOverlayClick={!isSaving}
                shouldCloseOnEsc={!isSaving}
                contentLabel={`${isBlocked ? "Unblock" : "Block"} user confirmation`}
                style={{
                    overlay: { backgroundColor: "rgba(2, 8, 23, 0.78)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" },
                    content: { position: "relative", inset: "auto", width: "calc(100% - 2rem)", maxWidth: "450px", margin: 0, padding: 0, background: "transparent", border: "none", overflow: "visible" },
                }}
            >
                <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#020817] text-white shadow-2xl">
                    <div className="px-5 py-4 bg-white/5 border-b border-white/10">
                        <h2 className="text-lg font-bold">{isBlocked ? "Unblock" : "Block"} User</h2>
                        <p className="mt-1 text-sm text-gray-400 break-all">{user.email}</p>
                    </div>
                    <div className="p-5">
                        <p className="text-sm text-gray-300">{isBlocked ? "This user will be able to sign in and use their account again." : "This user will no longer be able to sign in or use their account."}</p>
                        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                            <button type="button" disabled={isSaving} onClick={() => setModalIsOpen(false)} className="px-4 py-2 rounded-xl bg-white/10 text-white text-sm font-semibold hover:bg-white/15 transition-all disabled:opacity-50 cursor-pointer">Cancel</button>
                            <button type="button" disabled={isSaving} onClick={updateUserStatus} className={`px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all disabled:opacity-50 cursor-pointer ${isBlocked ? "bg-gradient-to-r from-green-500 to-emerald-600" : "bg-gradient-to-r from-red-500 to-rose-600"}`}>{isSaving ? "Saving..." : isBlocked ? "Unblock User" : "Block User"}</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}