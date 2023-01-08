import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getAllProducts } from '../api'
import assets from '../assets'
import ProductCard from '../components/products/ProductCard'
import Footer from '../components/shared/Footer'
import LoadingCard from '../components/shared/LoadingCard'

const Home = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    
    async function getProducts() {
      try {
        const { data } = await getAllProducts()
        setProducts(data.products)
      } catch (error) {
        toast.error('Could not fetch products')
      } finally {
        setLoading(false)
      }
    }

    getProducts()
  }, [])

  if (loading) return <LoadingCard />
  return (
    <div className='container mx-auto'>
      {/* banner */}
      <img
        className='w-full'
        src={assets.adBanner}
        alt="ad" />

      <div className="mt-8">
        <h1 className='text-neutral-700 font-semibold mb-6'>Our Trending Products</h1>

        <div className="grid grid-cols-4 gap-6">
          {
            products.length > 0 && products.map((product) => {
              return <ProductCard key={product._id} {...product} />
            })
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home