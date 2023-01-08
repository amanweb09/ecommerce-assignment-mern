import React, { useEffect, useState } from 'react'
import { getDbCart } from '../api'
import CartProductCard from '../components/products/CartProductCard'
import LoadingCard from '../components/shared/LoadingCard'

const Cart = () => {

  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function getCart() {
      try {
        const { data } = await getDbCart()
        setCart(data.cart)
        setLoading(false)
      } catch (error) {
        setCart({})
        setLoading(false)
      }
    }

    getCart()
  }, [])

  if (loading) return <LoadingCard text='Getting your cart for you...' />

  return (
    <div className='container mx-auto'>
      <h1 className='font-bold text-xl text-neutral-600'>Cart ({cart.totalQty} items)</h1>

      <div className="flex">

        {/* product list */}
        <div className="flex-1">
          {
            cart
            &&
            cart.items.map(({ product, qty }) => {
              return <CartProductCard product={product} qty={qty} />
            })
          }
        </div>

        {/* price */}
        <div className="w-64">
          <h1 className='font-bold text-lg text-neutral-600'>Billed Amount</h1>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <span>Total Amount</span>
              <span>&#8377;{cart.totalPrice}</span>
            </div>
            <div className="flex items-center justify-between mt-6">
              <span>Shipping</span>
              <span>&#8377;50</span>
            </div>

            <button className='w-full h-12 text-white bg-sky-600 hover:bg-sky-700 mt-12 font-bold'>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart