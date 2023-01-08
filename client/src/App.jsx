import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cart from './pages/Cart'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getProfile } from './api'
import { setAuth } from './store/authSlice'
import LoadingCard from './components/shared/LoadingCard'
import { initCart } from './store/cartSlice'

function App() {

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getAuthDetails() {
      try {
        const { data } = await getProfile()
        dispatch(setAuth({
          isAuthenticated: true,
          user: data.user
        }))
        dispatch(initCart({ counter: data.cartCounter }))
      } catch (error) { }
      finally {
        setLoading(false)
      }
    }
    getAuthDetails()
  }, [])

  if (loading) return <LoadingCard text='Getting the best products for you...' />

  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer
          closeOnClick
          autoClose={3000} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/cart' element={
            <AuthRoute>
              <Cart />
            </AuthRoute>
          } />
        </Routes>
      </Router>
    </>
  )
}

const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)

  if (isAuthenticated) return children;

  const location = useLocation()

  return <Navigate to={'/login'} state={{ from: location }} />
}

export default App
