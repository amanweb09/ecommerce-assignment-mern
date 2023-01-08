import React from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Footer from '../components/shared/Footer'
import { toast } from 'react-toastify'
import { signupUser } from '../api'
import { useDispatch } from 'react-redux'
import { setAuth } from '../store/authSlice'

const Signup = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [details, setDetails] = useState({ name: "", email: "", password: "" })

    function setInfo(e) {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }

    async function handleLogin(e) {
        e.preventDefault()

        if (!details.name || !details.email || !details.password) {
            toast.error('Please fill all the fields')
            return;
        }

        // network call
        try {
            const { data } = await signupUser(details)
            dispatch(setAuth({
                isAuthenticated: true,
                user: data.user
            }))

            toast.success('Wuhooo.. Signup successful')
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
            <div className='container mx-auto flex'>
                <div className='flex-1 bg-sky-200 sm:block hidden'></div>
                <div className='flex-center w-full sm:w-3/4'>
                    <div className="w-full sm:w-96 mb-10 pb-6 bg-white shadow-md mt-8">
                        <h1 className='text-center mt-4 font-bold text-2xl'>Good to see you</h1>
                        <h3 className='text-neutral-500 text-center'>Create an account</h3>
                        <form action="#" className='flex-center flex-col mt-12'>
                            <label htmlFor="email">Name</label>
                            <input
                                name='name'
                                onChange={setInfo}
                                value={details.name}
                                placeholder='Email here...'
                                className='w-80 border-b-solid border-b-2 border-b-sky-200 focus:border-b-sky-500 px-4 py-2 block'
                                type="email" />

                            <label className='block mt-4' htmlFor="email">Email</label>
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
                                Signup
                            </button>
                            <span className='text-sm'>
                                Already have an account?
                                <NavLink
                                    to={'/login'}
                                    className={'mt-4 inline-block font-semibold'}>
                                    login
                                </NavLink>
                            </span>
                        </form>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <Footer />
            </div>
        </>
    )
}

export default Signup