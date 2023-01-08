import React from 'react'

const LoadingCard = ({ text = "Setting up everything for you..." }) => {
    return (
        <div className='w-full h-screen fixed inset-0 bg-white flex-center border border-red-500'>
            <div className='flex-col flex-center'>
                <div
                    style={{ zIndex: '9999' }}
                    className="w-20 h-20 shadow-xl flex-center rounded-full">
                    <div className="loading rounded-full w-12 h-12 border-4 border-solid border-t-sky-500 border-x-sky-500">
                    </div>
                </div>
                <h1 className='font-semibold'>{text}</h1>
            </div>
        </div>
    )
}

export default LoadingCard