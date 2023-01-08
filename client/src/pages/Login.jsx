import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { loginUser } from '../api'
import Footer from '../components/shared/Footer'
import { setAuth } from '../store/authSlice'
import { toast } from 'react-toastify'


const Login = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [details, setDetails] = useState({ email: "", password: "" })

    function setInfo(e) {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }

    async function handleLogin(e) {
        e.preventDefault()
        if (!details.email || !details.password) {
            toast.error('Please fill all the fields')
            return;
        }

        // network call
        try {
            const { data } = await loginUser(details)
            dispatch(setAuth({
                isAuthenticated: true,
                user: data.user
            }))

            toast.success('Wuhooo.. Login successful')
            setTimeout(() => {
                navigate('/')
            }, 2000)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Something went wrong")
        }
    }

    return (
        <>
            <div className='container mx-auto pt-6 flex'>
                <div className='flex-1 sm:block hidden bg-sky-200'>

                </div>
                <div className='w-full sm:w-3/4 flex-center'>
                    <div className="w-full sm:w-96 sm:h-96 bg-white my-8">
                        <h1 className='text-2xl text-center mt-4 font-bold'>Welcome Back</h1>
                        <h3 className='text-center text-neutral-500'>Login to your account</h3>

                        <form action="#" className='flex-center flex-col mt-12'>
                            <label htmlFor="email">Email</label>
                            <input
                                name='email'
                                onChange={setInfo}
                                value={details.email}
                                placeholder='Email here...'
                                className='w-80 border-b-solid border-b-2 border-b-sky-200 focus:border-b-sky-500 px-4 py-2 block'
                                type="email" />
                            <label
                                className='block mt-4'
                                htmlFor="email">Password</label>
                            <input
                                name='password'
                                onChange={setInfo}
                                value={details.password}
                                placeholder='Password here...'
                                className='w-80 border-b-solid border-b-2 border-b-sky-200 focus:border-b-sky-500 px-4 py-2 block'
                                type="password" />

                            <button
                                onClick={handleLogin}
                                className='w-80 block mx-auto py-4 bg-sky-100 hover:bg-sky-200 text-sky-600 font-bold mt-10'
                                type="submit">
                                Login
                            </button>
                            <span className='text-sm'>
                                Don't have an account?
                                <NavLink
                                    to={'/signup'}
                                    className={'mt-4 inline-block font-semibold'}>
                                    signup
                                </NavLink>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
            <div className='mt-6'>
            <Footer />
            </div>
        </>
    )
}

export default Login