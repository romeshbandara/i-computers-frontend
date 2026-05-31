import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ProductCard from './components/productCard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ProductCard name="Apple iPhone 5s" price="$100" image="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-5s-ofic.jpg" />
    <ProductCard name="Samsung Galaxy S5" price="$200" image="https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s5-g900f-1.jpg" />
    <ProductCard name="Google Pixel 2" price="$300" image="https://fdn2.gsmarena.com/vv/pics/google/google-pixel-2-1.jpg" />
    </>
  )
}

export default App
