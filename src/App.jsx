import { useState } from 'react'
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


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='w-full h-screen'>

    <Toaster position="top-right"/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </div>
    </>
  )
}

export default App
