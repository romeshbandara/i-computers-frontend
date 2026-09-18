import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ProductCard from './components/productCard'
import LoginPage from '../pages/loginPage'
import HomePage from '../pages/homePage'
import RegisterPage from '../pages/registerPage'
import AdminPage from '../pages/adminPage'
import TestPage from '../pages/testPage'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import UserContext from './context/userContext'
import api from '../lib/api.js'
import toast from 'react-hot-toast'
import { BiLogoQuora } from 'react-icons/bi'
import LoadingAnimation from './components/loadingAnimation.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ResetPasswordPage from '../pages/resetPassword.jsx'


 function App() {


  const [user, setUser] = useState(null);
  const [userLoadingFinished, setUserLoadingFinished] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setUser(res.data.user);
        setUserLoadingFinished(true);

      })
      .catch(() => {
        toast("Please login",{icon:"🚀"});
        localStorage.removeItem("token");
        setUser(null);
        setUserLoadingFinished(true);

      });
  }, [userLoadingFinished]);


  return (
    <>
    <GoogleOAuthProvider clientId='784541890940-rad2bsar9n5e9vgpvim2iikteb8sehh4.apps.googleusercontent.com'>
    {userLoadingFinished &&
      <UserContext value={{
        user: user,
        setUser: setUser,
        userLoadingFinished: userLoadingFinished,
        setUserLoadingFinished: setUserLoadingFinished

      }}>
        <div className='w-full min-h-screen bg-[#020817] text-white'>

          <Toaster position="top-right" />

          <Routes>
            <Route path="/*" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage/>} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </div>
      </UserContext>
      }
      </GoogleOAuthProvider>
    </>
  )
}

export default App

//784541890940-rad2bsar9n5e9vgpvim2iikteb8sehh4.apps.googleusercontent.com