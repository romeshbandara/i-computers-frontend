import { useContext, useState } from "react"
import UserContext from "../src/context/userContext"
import toast from "react-hot-toast"
import api from "../lib/api"
import uploadMedia from "../lib/uploadMedia"
import LoadingAnimation from "../src/components/loadingAnimation"
import { useNavigate } from "react-router-dom"

export default function SettingsPage() {

    const userInfo = useContext(UserContext)

    const [firstName, setFirstName] = useState(userInfo.user?.firstName || "")
    const [lastName, setLastName] = useState(userInfo.user?.lastName || "")
    const [image, setImage] = useState(null)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()


    async function handleProfileUpdate() {
        setIsLoading(true)
        const token = localStorage.getItem("token")
        if (token == null) {
            toast.error("Please login first!")
        }

        try {
            const data = {
                firstName: firstName,
                lastName: lastName,
                image: userInfo.user?.image
            }
            if (image != null) {
                data.image = await uploadMedia(image)

            }
            await api.put("/users/profile", data, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((res => {
                //window.location.reload();
                userInfo.setUserLoadingFinished(false)
                toast.success("Profile Updated Successfully!")
                setIsLoading(false)



            })).catch((err) => {
                toast.error("Profile couldn't be update!" + err.response.data.message)
                console.log(err.response.data.error)
                setIsLoading(false)
            })
        } catch (err) {
            toast.error(err.response.data)
            setIsLoading(false)
        }
    }

    async function handlePasswordUpdate() {
        const token = localStorage.getItem("token")

        if (password != confirmPassword) {
            toast.error("Password is not matching!")
            return
        }
        if (token == null) {
            toast.error("Please login first!")
            return
        }
        const data = {
            password: password
        }
        try {
            await api.put("/users/password", data, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((res) => {
                toast.success("Password Changed Successfully!")
                localStorage.removeItem("token")
                userInfo.setUser(null)
                setIsLoading(false)
                navigate("/login")


            }).catch((err) => {
                toast.error("Password Update Failed!")
                console.log(err)
                setIsLoading(false)
            })
        } catch (err) {
            toast.error("Password Update Failed!")
            console.log(err)
            setIsLoading(false)
        }
    }

    return (
        <>
            {isLoading && <LoadingAnimation />}

            <div className="w-full min-h-full pt-10 bg-primary flex flex-wrap justify-evenly p-4">

                <div className="w-[450px] h-[450px] rounded-md bg-white shadow-xl flex flex-col relative">
                    <h1 className="text-xl font-semibold p-4">Update Profile</h1>
                    <div className="w-full flex flex-col px-4 py-2 gap-y-2">
                        <label className="text-lg font-semibold text-secondary">First Name</label>
                        <input type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} className="w-full h-[50px] border-2 border-accent rounded-lg p-2 outline-none" />
                    </div>
                    <div className="w-full flex flex-col px-4 py-2 gap-y-2">
                        <label className="text-lg font-semibold text-secondary">Last Name</label>
                        <input type="text" value={lastName} onChange={(e) => { setLastName(e.target.value) }} className="w-full h-[50px] border-2 border-accent rounded-lg p-2 outline-none" />
                    </div>
                    <div className="w-full flex flex-col px-4 py-2 gap-y-2">
                        <label className="text-lg font-semibold text-secondary">Image</label>
                        <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} className="w-full h-[50px] border-2 border-accent rounded-lg p-2 outline-none" />
                    </div>

                    <div className="w-full bg-white  flex flex-col rounded-md absolute bottom-2">
                        <button onClick={handleProfileUpdate} className="px-4 py-2 mx-4 bg-accent text-white shadow-md rounded-full cursor-pointer hover:bg-black transition-colors duration-100 ">Update Profile</button>
                    </div>
                </div>

                <div className="w-[450px] h-[450px] rounded-md bg-white shadow-xl flex flex-col items-center gap-y-4 p-4">

                    <div className="w-full h-[200px] flex flex-col justify-center items-center gap-4 pb-4">
                        <img src={userInfo.user.image} alt={userInfo.user.firstName} className="w-30 h-30 rounded-full object-cover"/>
                        <h1 className="text-3xl text-secondary">Welcome {userInfo.user.firstName}!</h1>
                    </div>

                    <table>
                        <tbody>
                            <tr className="text-lg h-[40px]">
                                <td className="pr-4">Email :-</td>
                                <td>{userInfo.user.email}</td>
                            </tr>
                            <tr className="text-lg h-[40px]">
                                <td className="pr-4">First Name :-</td>
                                <td>{userInfo.user.firstName}</td>
                            </tr>
                            <tr className="text-lg h-[40px]">
                                <td className="pr-4">Last Name :-</td>
                                <td>{userInfo.user.lastName}</td>
                            </tr>
                            <tr className="text-lg h-[40px]">
                                <td className="pr-4">Role :-</td>
                                <td> {userInfo.user.isAdmin ? "Admin":"User"}</td>
                            </tr>
                            <tr className="text-lg h-[40px]">
                                <td className="pr-4">Status :-</td>
                                <td> {userInfo.user.isBlocked ? "Blocked":"Active"}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <div className="w-[450px] h-[450px] rounded-md bg-white shadow-xl relative flex flex-col items-">
                    <h1 className="text-xl font-semibold p-4">Change Password</h1>
                    <div className="w-full flex flex-col px-4 py-2 gap-y-2">
                        <label className="text-lg font-semibold text-secondary">New Password</label>
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="w-full h-[50px] border-2 border-accent rounded-lg p-2 outline-none" />
                    </div>
                    <div className="w-full flex flex-col px-4 py-2 gap-y-2">
                        <label className="text-lg font-semibold text-secondary">Confirm Password</label>
                        <input type="password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} className="w-full h-[50px] border-2 border-accent rounded-lg p-2 outline-none" />
                    </div>

                    <div className="w-full bg-white  flex flex-col rounded-md absolute bottom-2">
                        <button onClick={handlePasswordUpdate} className="px-4 py-2 mx-4 bg-accent text-white shadow-md rounded-full cursor-pointer hover:bg-black transition-colors duration-100 ">Update Password</button>
                    </div>
                </div>
            </div>
        </>
    )
}