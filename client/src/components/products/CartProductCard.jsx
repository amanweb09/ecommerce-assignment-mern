import React from 'react'

const CartProductCard = ({
    product,
    qty
}) => {

console.log(product);

    const { _id, title, price, images } = product
    const thumbnailSrc = images.thumbnail.location === 'local' ? `/images/${images.thumbnail.src}` : images.thumbnail.src

    return (
        <div className="h-24 flex items-center my-4 py-4 px-2 sm:w-max w-full">
            <img
                className='w-12 sm:w-20 mr-8'
                src={thumbnailSrc}
                alt="product image" />
            <div className='w-28 sm:w-48'>
                <h3 className='font-semibold block sm:text-base text-sm'>{title}</h3>
                <h4 className='text-red-500'>&#8377;{price}</h4>
            </div>

            <div className='font-bold text-neutral-600 ml-20 mr-10 text-sm'>
                Qty: {qty}
            </div>

            <button className="text-red-600 bg-red-100 font-bold px-4 py-1 text-xs rounded-full">remove</button>
        </div>
    )
}

export default CartProductCard