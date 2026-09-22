import { useContext, useState } from "react"
import api from "../../lib/api"
import toast from "react-hot-toast"
import { FaStar } from "react-icons/fa"
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md"
import UserContext from "../context/userContext"
import uploadMedia from "../../lib/uploadMedia"

export default function ReviewProduct({ reviews, productId, refresh }) {
    const userInfo = useContext(UserContext)
    const user = userInfo?.user
    const reviewList = Array.isArray(reviews) ? reviews : []
    const [expandedReviewId, setExpandedReviewId] = useState(null)
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [firstName, setFirstName] = useState(user?.firstName ?? "")
    const [lastName, setLastName] = useState(user?.lastName ?? "")
    const [message, setMessage] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)
    const [images, setImages] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleReview() {
        if (!user) {
            toast.error("Please log in to submit a review.")
            return
        }
        if (!rating) {
            toast.error("Please select a rating.")
            return
        }

        setIsSubmitting(true)
        try {
            const uploadedImages = await Promise.all(Array.from(images).map((image) => uploadMedia(image)))
            await api.post("/review", {
                productId,
                email: user.email,
                message,
                image: uploadedImages,
                userImage: user.image,
                firstName,
                lastName,
                rate: rating,
            })
            toast.success("Review submitted!")
            setMessage("")
            setImages([])
            setRating(0)
            refresh?.()
        } catch (err) {
            console.error(err)
            toast.error("Failed to submit your review!")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <div className="w-full bg-white/10 backdrop-blur-2xl rounded-2xl overflow-hidden p-3 sm:p-4">
                <div className="w-full min-h-[50px] p-2 sm:p-4 flex justify-center items-center text-center">
                    <h1 className="text-xl sm:text-2xl font-semibold">Product Reviews</h1>
                </div>
                <div className="w-full flex flex-col p-3 sm:p-4 border-2 border-white rounded-2xl my-2">
                    {reviewList.length === 0 ? (
                        <p className="py-3 text-center text-sm text-gray-300">No reviews yet.</p>
                    ) : reviewList.map((item, index) => {
                        const reviewId = item.commentId ?? `${item.email ?? "review"}-${index}`
                        const isExpanded = expandedReviewId === reviewId
                        const rate = Math.min(5, Math.max(0, Number(item.rate) || 0))
                        const reviewImages = Array.isArray(item.image) ? item.image : []

                        return (
                            <div key={reviewId} className="w-full my-2 border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                                <div className="w-full flex items-start gap-3">
                                    {item.userImage ? (
                                        <img src={item.userImage} alt={`${item.firstName ?? "User"} profile`} className="w-8 h-8 shrink-0 object-cover rounded-full" />
                                    ) : <div className="w-8 h-8 shrink-0 rounded-full bg-white/20" aria-hidden="true" />}
                                    <div className="min-w-0 flex-1 flex flex-col">
                                        <h2 className="text-lg sm:text-xl break-words">{item.firstName} {item.lastName}</h2>
                                        <p className="text-sm break-all text-gray-300">{item.email}</p>
                                        <div className="w-full my-3 sm:my-4">
                                            <span className="flex gap-2" aria-label={`${rate} out of 5 stars`}>
                                                {Array.from({ length: 5 }, (_, starIndex) => <FaStar key={starIndex} className={starIndex < rate ? "text-yellow-500" : "text-white"} />)}
                                            </span>
                                            <button type="button" onClick={() => setExpandedReviewId(isExpanded ? null : reviewId)} className="text-md mt-4 inline-flex items-center outline-none cursor-pointer" aria-expanded={isExpanded}>
                                                {isExpanded ? <MdOutlineKeyboardArrowUp className="font-semibold" /> : <MdOutlineKeyboardArrowDown className="font-semibold" />}
                                                {isExpanded ? "Hide" : "View"}
                                            </button>
                                        </div>
                                        {isExpanded && <div className="w-full bg-white/20 backdrop-blur-2xl p-3 sm:p-4 rounded-2xl">
                                            <p className="break-words">{item.message}</p>
                                            {reviewImages.length > 0 && <div className="flex flex-wrap gap-3 sm:gap-4 mt-5">
                                                {reviewImages.map((image, imageIndex) => <img key={`${image}-${imageIndex}`} src={image} alt={`Review attachment ${imageIndex + 1}`} className="w-16 h-16 sm:w-20 sm:h-20 object-cover cursor-pointer hover:scale-105 transition-transform rounded-lg" onClick={() => setSelectedImage(image)} />)}
                                            </div>}
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {userInfo.user === null ?

                <div className="w-full bg-white/10 backdrop-blur-2xl rounded-2xl overflow-hidden p-3 sm:p-4 mt-10 flex flex-col justify-center items-center">
                    <div className="w-full min-h-[50px] p-2 sm:p-4 flex justify-center items-center text-center"><h1 className="text-xl sm:text-2xl font-semibold">Add Review</h1></div>
                    <h1 className="bg-red-600/60 w-full text-center backdrop-blur-2xl rounded-full p-2">Please login first to add review</h1>
                    </div>

                    :
                    <div className="w-full bg-white/10 backdrop-blur-2xl rounded-2xl overflow-hidden p-3 sm:p-4 mt-10">
                        <div className="w-full min-h-[50px] p-2 sm:p-4 flex justify-center items-center text-center"><h1 className="text-xl sm:text-2xl font-semibold">Add Review</h1></div>

                        <div className="w-full flex flex-col p-3 sm:p-4 border-2 border-white rounded-2xl">
                            <div className="w-full flex flex-col my-2"><label htmlFor="review-email">Email</label><input id="review-email" type="email" value={user?.email ?? ""} disabled className="w-full h-10 p-2 border-2 outline-none rounded-md mt-2" /></div>
                            <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
                                <div className="w-full sm:w-1/2 flex flex-col"><label htmlFor="review-first-name">First Name</label><input id="review-first-name" type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} className="w-full h-10 p-2 border-2 outline-none rounded-md mt-2" /></div>
                                <div className="w-full sm:w-1/2 flex flex-col"><label htmlFor="review-last-name">Last Name</label><input id="review-last-name" type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} className="w-full h-10 p-2 border-2 outline-none rounded-md mt-2" /></div>
                            </div>
                            <div className="w-full flex flex-col my-2"><label>Rate</label><div className="mt-2 flex gap-2">{Array.from({ length: 5 }, (_, index) => {
                                const starValue = index + 1
                                return <FaStar key={starValue} className={`cursor-pointer text-2xl transition-colors duration-200 ${starValue <= (hover || rating) ? "text-yellow-500" : "text-gray-400"}`} onClick={() => setRating(starValue)} onMouseEnter={() => setHover(starValue)} onMouseLeave={() => setHover(0)} />
                            })}</div></div>
                        </div>
                        <div className="w-full flex flex-col my-2"><label htmlFor="review-message">Message</label><textarea id="review-message" value={message} onChange={(event) => setMessage(event.target.value)} className="w-full min-h-20 h-10 p-2 border-2 outline-none rounded-md mt-2" /></div>
                        <div className="w-full flex flex-col my-2"><label htmlFor="review-images">Images</label><input id="review-images" type="file" multiple onChange={(event) => setImages(event.target.files ?? [])} className="w-full mt-2 rounded-xl border border-white text-gray-400 p-2 text-sm cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:text-cyan-300 file:text-xs file:cursor-pointer hover:border-cyan-400/40 transition-all" /></div>
                        <div className="flex justify-end mt-6 sm:mt-10"><button type="button" onClick={handleReview} disabled={isSubmitting} className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-bold text-white shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all text-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Submitting..." : "Submit"}</button></div>
                    </div>}

                    {selectedImage && <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer" onClick={() => setSelectedImage(null)}>
                        <div className="relative max-w-xl max-h-[65vh]" onClick={(event) => event.stopPropagation()}>
                            <img src={selectedImage} alt="Enlarged review attachment" className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl" />
                            <button type="button" aria-label="Close image preview" className="absolute -top-3 -right-3 bg-white text-black font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-200" onClick={() => setSelectedImage(null)}>✕</button>
                        </div>
                    </div>}

                </>
    )
}