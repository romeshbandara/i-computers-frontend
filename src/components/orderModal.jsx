import { Link, useNavigate } from "react-router-dom";
import Modal from 'react-modal'
import { useState } from "react";
import getFormattedPrice from "../../lib/priceFormat";
import { getCartTotal } from "../../lib/cart";
import { SiAssemblyscript } from "react-icons/si";
import toast from "react-hot-toast";
import api from "../../lib/api";

export default function OrderModal(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [addressLine1, setAddressLine1] = useState("")
    const [addressLine2, setAddressLine2] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [secondaryPhoneNumber, setSecondaryPhoneNumber] = useState("")
    const [specialNote, setSpecialNote] = useState("")
    const navigate = useNavigate()

    async function handleConfirmOrder() {
        const token = localStorage.getItem("token")

        if (token == null) {
            toast.error("Please Login")
            navigate("/login")
            return
        }

        const orderData = {
            firstName: firstName,
            lastName: lastName,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            postalCode: postalCode,
            phone: phoneNumber,
            secondaryPhone: secondaryPhoneNumber,
            customerNote: specialNote,
            items: [],
        }

        for (let i = 0; i < props.cart.length; i++) {
            orderData.items.push({
                productId:props.cart[i].product.productId,
                qty: props.cart[i].qty
            })
        }

        try {

            await api.post("/orders", orderData, {
                headers:{
                    Authorization: "Bearer " + token
                }
            }).then(()=>{
                toast.success("Order Placed Successfully!")
                localStorage.removeItem("cart")
                setModalIsOpen(false)
                navigate("/products")
            })
            
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <>
            <button onClick={
                () => {
                    setModalIsOpen(true)
                }
            } className="bg-green-500 flex justify-center items-center shadow-md  rounded-md text-white border-2 border-transparent hover:bg-black hover:border-white cursor-pointer transition-colors duration-200 px-2 py-2">Place Order</button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => (setModalIsOpen(false))}
                style={
                    {
                        content: {
                            width: '500px',
                            margin: 'auto',
                            padding: '0px',
                            backgroundColor: 'transparent',
                            border: 'none',

                        }
                    }
                }
            >
                <div className="w-full min-h-full bg-primary flex flex-col rounded-2xl ">

                    <div className="w-full h-[50px] bg-accent rounded-t-2xl flex justify-center items-center">
                        <h1 className="text-xl text-white font-semibold">Order Summary</h1>
                    </div>

                    <div className="w-full h-[50px] flex  justify-evenly items-center bg-white text-secondary sticky top-0 shadow-md">
                        <div className=" flex gap-4 justify-center items-center ">
                            <h1 className="text-xl  font-semibold">Total :</h1>
                            <span className="text-lg ">{getFormattedPrice(getCartTotal(props.cart))}</span>
                        </div>

                        <div className=" flex gap-4 justify-center items-center ">
                            <h1 className="text-xl  font-semibold">Items :</h1>
                            <span className="text-lg ">{props.cart.length}</span>
                        </div>
                    </div>
                    <div className="w-full gap-[10%] p-4 flex flex-wrap">
                        <div className="w-[45%]  flex flex-col">
                            <label className="text-secondary text-md">First Name</label>
                            <input value={firstName} onChange={(e) => { setFirstName(e.target.value) }} type="text" placeholder="Jhon" className="w-full h-[40px] border-2 border-secondary rounded-md p-2" />
                        </div>

                        <div className="w-[45%]  flex flex-col">
                            <label className="text-secondary text-md">Last Name</label>
                            <input value={lastName} onChange={(e) => { setLastName(e.target.value) }} type="text" placeholder="Doe" className="w-full h-[40px] border-2 border-secondary rounded-md p-2" />
                        </div>

                        <div className="w-full mt-3 flex flex-col">
                            <label className="text-secondary text-md">Address Line 1</label>
                            <input value={addressLine1} onChange={(e) => { setAddressLine1(e.target.value) }} type="text" placeholder="No:21/B" className="w-full h-[40px] border-2 border-secondary rounded-md p-2" />
                        </div>

                        <div className="w-full mt-3 flex flex-col">
                            <label className="text-secondary text-md">Address Line 2</label>
                            <input value={addressLine2} onChange={(e) => { setAddressLine2(e.target.value) }} type="text" placeholder="TB Jaya Mawatha, Colombo 07" className="w-full h-[40px] border-2 border-secondary rounded-md p-2" />
                        </div>

                        <div className="w-[45%] mt-3  flex flex-col">
                            <label className="text-secondary text-md">City</label>
                            <input value={city} onChange={(e) => { setCity(e.target.value) }} type="text" placeholder="Colombo" className="w-full h-[40px] border-2 border-secondary rounded-md p-2" />
                        </div>

                        <div className="w-[45%] mt-3  flex flex-col">
                            <label className="text-secondary text-md">Postal Code</label>
                            <input value={postalCode} onChange={(e) => { setPostalCode(e.target.value) }} type="text" placeholder="50300" className="w-full h-[40px] border-2 border-secondary rounded-md p-2" />
                        </div>

                        <div className="w-[45%] mt-3  flex flex-col">
                            <label className="text-secondary text-md">Phone</label>
                            <input value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} type="text" placeholder="+94 71 123 4562" className="w-full h-[40px] border-2 border-secondary rounded-md p-2" />
                        </div>

                        <div className="w-[45%] mt-3  flex flex-col">
                            <label className="text-secondary text-md">Secondary Phone</label>
                            <input value={secondaryPhoneNumber} onChange={(e) => { setSecondaryPhoneNumber(e.target.value) }} type="text" placeholder="+94 71 123 4562" className="w-full h-[40px] border-2 border-secondary rounded-md p-2" />
                        </div>


                        <div className="w-full mt-3 flex flex-col">
                            <label className="text-secondary text-md">Special Note</label>
                            <textarea value={specialNote} onChange={(e) => { setSpecialNote(e.target.value) }} type="text" placeholder="Write your Special note" className="w-full min-h-[130px] border-2 border-secondary rounded-md p-2" />
                        </div>


                    </div>

                    <div className="w-full h-[80px] bg-accent rounded-b-2xl sticky bottom-0 justify-center flex flex-row items-center gap-4 p-4">
                        <button onClick={handleConfirmOrder} className="bg-green-600 px-4 py-2 text-white rounded-md hover:bg-green-800 cursor-pointer transition-colors duration-100">Purchase</button>
                        <button onClick={() => { setModalIsOpen(false) }} className="bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-800 cursor-pointer transition-colors duration-100">Cancel</button>
                    </div>



                </div>
            </Modal>

        </>
    )
}