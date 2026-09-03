import { useState } from "react";
import toast from "react-hot-toast";
import { CgBlock, CgUnblock } from "react-icons/cg";
import Modal from "react-modal";
import api from "../../lib/api";

export default function BlockUserModal(props) {

    const user = props.user
    const refresh = props.refresh
    const [modalIsOpen, setModalIsOpen] = useState(false)

    async function blockUser() {
        const token = localStorage.getItem("token")

        try {
            await api.put("/users/status", {
                email: user.email,
                isBlocked: !user.isBlocked
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            toast.success("User status changed successfully")
            refresh()
            setModalIsOpen(false)
        } catch (err) {
            toast.error(err.response.data.message || "Something went wrong")
        }
    }

    return (
        <>
            <button onClick={() => setModalIsOpen(true)} className="cursor-pointer">
                {
                    user.isBlocked ?
                        <CgUnblock className="text-xl text-green-600" />
                        :
                        <CgBlock className="text-xl text-red-600" />
                }
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => (setModalIsOpen(false))}
                style={
                    {
                        content: {

                            width: '450px',
                            height: '200px',
                            margin: 'auto',
                            padding: '0px',
                            backgroundColor: 'transparent',
                            border: 'none',


                        }
                    }
                }
            >

                <div className="w-full h-full  min-h-full  bg-primary flex flex-col rounded-2xl" >
                    <div className="w-full h-[50px] bg-accent rounded-t-2xl flex justify-center items-center ">
                        <h1 className="text-xl text-white font-semibold">{user.isBlocked ? "Unblock" : "Block"} User</h1>
                    </div>
                    <div className="w-full h-full flex justify-center items-center gap-4 p-4">
                        <button onClick={blockUser} className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 cursor-pointer">
                            {user.isBlocked ? "Unblock" : "Block"} User
                        </button>
                        <button className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 cursor-pointer" onClick={() => setModalIsOpen(false)}>
                            Cancel
                        </button>
                    </div>
                </div>

            </Modal>

        </>
    )
}