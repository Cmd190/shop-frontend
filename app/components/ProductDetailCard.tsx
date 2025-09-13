import React from 'react'
import type { Product } from '~/types/types'

interface ProductDetailProps {
    p : Product
}

export const  ProductDetailCard : React.FC<ProductDetailProps> = ({ p }) => {
  const price = p.discount > p.price - p.price * (p.discount/100) ? 0 : p.price
  return (
    <div className='max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-xl rounded-2xl'>
              <div className='flex justify-center items-center'>
                <img src='/veganlargeheart.jpg' 
                alt={p.name}
                className='rounded-xl max-h-[500px] object-cover'  />
              </div>

              <div className='flex flex-col space-y-4'>
                <h2 className='text-3xl font-bold text-gray-900'>{p.name}</h2>
                <p className='text-gray-500 text-sm'>
                    By <span className='font-semibold'>{p.manufacturer}</span>
                </p>
              </div>

                //categories
              <div className='flex flex-wrap gap-2'>
                {p.categories.map(c =>(
                    <span key={c} 
                    className='bg-gray-200 text-gray-700 px-3 py-1 text-xs rounded-full'>
                        {c}
                    </span>
                ))}
              </div>

              //price
              <div className='flex items-center space-x-3'>
                {p.discount > 0 && (
                    <span>{p.price.toFixed(2)}€</span>
                )}
                <span className='text-2xl font-bold text-green-600'>{price.toFixed(2)}€</span>
                {p.discount > 0 && (
                    <span className='bg-red-500 text-white text-xs px-2 py-1 rounded-full'>-{p.discount}%</span>
                )}
              </div>

              <p className='text-gray-700'>{p.description}</p>
              <p 
                className={`text-sm font-semibold 
                ${p.stockCount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {p.stockCount > 0 ? 'Available' : 'Out of stock'}
              </p>
              <p className='text-gray-500 text-sm'>Ships in {p.shipDuration} days</p>
    </div>
  )
}
