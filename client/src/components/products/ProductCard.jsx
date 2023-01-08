import React from 'react'
import { useDispatch } from 'react-redux'
import { setCounter } from '../../store/cartSlice'
import { toast } from 'react-toastify'
import { addToDbCart } from '../../api'

const ProductCard = ({
    _id,
    title,
    price,
    desc,
    images,
    availability,
    category
}) => {

    const dispatch = useDispatch()

    async function addToCart() {

        try {
            const { data } = await addToDbCart({ productId: _id })
            dispatch(setCounter())
            toast.success('Added to cart')
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong")
        }
    }

    const thumbnailSrc = images.thumbnail.location === 'local' ? `/images/${images.thumbnail.src}` : images.thumbnail.src

    return (
        <div className='w-80 bg-white shadow-md p-4 m-4'>
            <div className='h-40 block mx-auto w-max p-2'>
                <img
                    className='h-full'
                    src={thumbnailSrc}
                    alt="product image" />
            </div>
            <div className='h-40'>
                <span className="font-semibold text-sky-600 text-sm capitalize">{category}</span>
                <h1 className='font-black'>{title}</h1>
                <span className="text-red-500 font-bold">&#8377;{price}</span>
                <p className="text-neutral-500 mt-2 text-sm">{desc}</p>
            </div>
            <div>
                {
                    availability.inStock
                        ?
                        <button
                            onClick={addToCart}
                            className="text-sky-600 font-bold bg-sky-100 hover:bg-sky-200 w-full h-12">
                            Add to Bag
                        </button>
                        :
                        <button className="cursor-default text-red-600 font-bold bg-red-100 w-full h-12">Out of Stock</button>
                }
            </div>
        </div>
    )
}

export default ProductCard