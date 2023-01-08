import React from 'react'
import { HeartIcon, MagnifyingGlassIcon, UserIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../api'
import { toast } from 'react-toastify'
import { setAuth } from '../../store/authSlice'

const Navbar = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { counter } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.auth)

    async function handleLogout() {
        try {
            await logoutUser()
            dispatch(setAuth({
                isAuthenticated: false,
                user: null
            }))
            toast.success('logged out...')

        } catch (error) {
            toast.error('server error')
        }
    }

    return (
        <nav className='container mx-auto pb-4'>

            {/* banner */}
            <div className='w-full bg-neutral-100 py-2 text-xs sm:text-sm text-neutral-700 font-semibold px-4'>
                Upto 50% off on entire store
            </div>

            {/* nav main */}
            <div className='flex items-center justify-between border-b-[2px] border-b-solid border-b-neutral-200 sm:px-0 px-2'>
                {/* logo */}
                <NavLink to={'/'}>
                    <div className='sm:mr-12'>
                        <h1 className='text-xl sm:text-3xl font-bold'>
                            shop<span className='text-orange-500 text-3xl sm:text-6xl'>.</span>mart
                        </h1>
                    </div>
                </NavLink>

                <div className='hidden sm:flex items-center ml-10'>
                    <input
                        placeholder='Search a product'
                        type="text"
                        className="w-80 px-4 h-10 outline-none border border-neutral-300" />
                    <select
                        name="category"
                        className='w-40 text-neutral-600 text-sm bg-white h-10 border border-neutral-300 px-4'>
                        <option value="">All categories</option>
                        <option value="tech">Technology</option>
                        <option value="clothing">Clothing</option>
                        <option value="utilities">Utilities</option>
                    </select>
                    <button className='w-10 h-10 bg-sky-500 flex-center'>
                        <MagnifyingGlassIcon
                            className='w-6 h-6 text-white' />
                    </button>
                </div>

                <div className="flex-1 flex items-center justify-end">
                    {
                        user
                            ?
                            <div
                                onClick={handleLogout}
                                className='flex items-center cursor-pointer sm:mr-0 mr-4'>
                                <UserIcon className='w-6 h-6 sm:w-8 sm:h-8' />
                                <div className='text-sm'>
                                    <span className="text-xs block">{user.name}</span>
                                    <span className="sm:text-base text-sm">Logout</span>
                                </div>
                            </div>
                            : <div
                                onClick={() => navigate('/login')}
                                className='flex items-center cursor-pointer sm:mr-0 mr-4'>
                                <UserIcon className='w-8 h-8' />
                                <div className='text-sm'>
                                    <span className="text-xs block">Sign in</span>
                                    <span className="">Account</span>
                                </div>
                            </div>
                    }

                    <div
                        onClick={() => navigate('/login')}
                        className='relative mx-8 cursor-pointer sm:block hidden'>
                        <HeartIcon className='w-8 h-8' />
                        <div
                            className="w-5 h-5 rounded-full bg-red-500 text-white font-bold flex-center absolute top-0 right-[-5px]">
                            0
                        </div>
                    </div>
                    <div
                        onClick={() => navigate('/cart')}
                        className='relative cursor-pointer'>
                        <ShoppingBagIcon className='w-8 h-8' />
                        <div
                            className="w-5 h-5 rounded-full bg-red-500 text-white font-bold flex-center absolute top-0 right-[-5px]">
                            {counter}
                        </div>
                    </div>
                </div>
            </div>

            {/* links */}
            <div className="flex items-center sm:text-sm text-xs justify-end py-4 sm:px-0 px-2">
                <NavLink to={'/'}>
                    <span className='cursor-pointer'>Home</span>
                </NavLink>
                <NavLink className={'mx-6'} to={'/'}>
                    <span className='cursor-pointer'>Today's deals</span>
                </NavLink>
                <NavLink to={'/'}>
                    <span className='cursor-pointer'>Trending Products</span>
                </NavLink>
                <NavLink to={'/'} className="ml-6">
                    <span className='cursor-pointer'>Blog</span>
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar