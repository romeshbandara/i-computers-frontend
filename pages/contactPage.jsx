import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend } from "react-icons/fi"
import api from "../lib/api"
import UserContext from "../src/context/userContext"

export default function ContactPage() {
    const userInfo = useContext(UserContext)
    const [formData, setFormData] = useState({
        name: "",
        email: userInfo.user.email,
        subject: "",
        message: ""
    })
    const [sending, setSending] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.name || !formData.email || !formData.message) {
            return toast.error("Please fill in all required fields")
        }
        setSending(true)
        setTimeout(() => {
            
            
            setFormData({ name: "", email: userInfo.user.email, subject: "", message: "" })
            setSending(false)
        }, 600)
    }


    async function handleMessage(){
        const messageData = {
            name:formData.name,
            email:formData.email,
            subject:formData.subject,
            message:formData.message
        }
        await api.post("/contact/message",messageData).then((res)=>{toast.success(res.data)}).catch((err)=>{console.log(err); toast.error("Something went wrong!")})
        
    }

    return (
        <main className="min-h-screen bg-[#020817] text-white relative overflow-hidden pb-24">
            {/* Ambient Glows */}
            <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-cyan-600/15 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[20%] left-[10%] w-[450px] h-[450px] bg-blue-600/15 blur-[140px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-[1250px] mx-auto px-6 lg:px-12 pt-12">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-4">
                        Direct Support & Consultation
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black">
                        Get in <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Touch</span>
                    </h1>
                    <p className="text-gray-300 text-base sm:text-lg mt-4">
                        Have questions about a build, warranty, or custom parts? Our specialist technicians are ready to assist you.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Info Cards */}
                    <div className="space-y-4 lg:col-span-1">
                        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-cyan-400/40 transition-all flex items-start gap-4">
                            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xl shrink-0">
                                <FiPhone />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-400">Call / WhatsApp</h3>
                                <p className="text-base font-semibold text-white mt-1">+94 77 123 4567</p>
                                <p className="text-xs text-gray-500 mt-0.5">Mon - Sat: 9:00 AM - 7:00 PM</p>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-400/40 transition-all flex items-start gap-4">
                            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xl shrink-0">
                                <FiMail />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-400">Email Inquiries</h3>
                                <p className="text-base font-semibold text-white mt-1">support@isuricomputers.com</p>
                                <p className="text-xs text-gray-500 mt-0.5">Average reply time &lt; 2 hours</p>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-400/40 transition-all flex items-start gap-4">
                            <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xl shrink-0">
                                <FiMapPin />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-400">Main Tech Hub</h3>
                                <p className="text-base font-semibold text-white mt-1">Isuri Computers Showroom</p>
                                <p className="text-xs text-gray-500 mt-0.5">High Level Road, Colombo, Sri Lanka</p>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-cyan-400/40 transition-all flex items-start gap-4">
                            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xl shrink-0">
                                <FiClock />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-400">Opening Hours</h3>
                                <p className="text-base font-semibold text-white mt-1">Open 6 Days a Week</p>
                                <p className="text-xs text-gray-500 mt-0.5">Sunday Closed for Inventory</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 p-8 sm:p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl relative">
                        <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
                        <p className="text-gray-400 text-sm mb-8">
                            Fill out the details below and our team will get back to you with specs and advice.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="John Doe"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-sm transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        required
                                        disabled
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="you@domain.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-sm transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                                <input
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    placeholder="Custom PC inquiry, part availability, warranty..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-sm transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Tell us what hardware or assistance you need..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-sm transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                onClick={handleMessage}
                                disabled={sending}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-semibold text-white shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                            >
                                <FiSend />
                                <span>{sending ? "Sending Message..." : "Send Message"}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
