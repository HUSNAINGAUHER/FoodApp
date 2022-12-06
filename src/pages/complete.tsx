import { Service } from '@/axios/config'
import { PillButton } from '@/compoenents/PillButton'
import { useGlobalsContenxt } from '@/context/GlobalContext'
import { Page } from '@/layouts/Page'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'


const CompleteOrder = () => {
  const { push } = useRouter()

  const {
    Cart: [selectedItems, setSelectedItems],
  } = useGlobalsContenxt()

  useEffect(() => {
   
    const cart = window.localStorage.getItem('cart')
    if (cart && cart.length > 0) {
      setSelectedItems(JSON.parse(cart))
    }
  }, [])

   useEffect(() => {
       window.localStorage.setItem('cart', JSON.stringify(selectedItems)), [selectedItems]
   }, [selectedItems])
  useEffect(() => {
    if (!window.localStorage.getItem('token')) push('/login')
  })
  
  
  const [self, setSelf] = useState(false)
  const [address, setAddress] = useState('')
  
  
  const placeOrder = async () => {
    
    const token = window.localStorage.getItem('token')
    if (token && token.length > 0 && (self || address)) {
      const { name, email,phone } = jwt.decode(token) as any
      if (selectedItems.length > 0) {
        const res = await Service.post(
          '/order/add',
          {
            cart: selectedItems,
            name,
            email,
            contact: phone,
            address: address,
            shippingOption: self ? 'Self Pickup' : 'Delivery',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: 'Bearer ' + window.localStorage.getItem('token'),
            },
          }
        )
        push('/success'+'?invoice='+res.data.invoice)
      }
    }
    else {
      alert('Login required')
      push('/login')
    }
  }


  return (
    <>
      <Page name='Place Order'>
        <div
          style={{ marginTop: '70px', width: '600px', paddingBottom: '48px' }}
          className='bg-white mx-auto px-20 py-5 rounded-lg'
        >
          <div className='text-4xl font-semibold'>Complete Your Order</div>
          <div className='flex flex-col gap-y-4' style={{ marginTop: '22px' }}>
            {selectedItems.map((I) => (
              <CheckoutListItem
                image={I.image}
                key='1'
                name={I.title}
                onClick={() => setSelectedItems(selectedItems.filter((l) => I._id !== l._id))}
              />
            ))}
          </div>

          <div className='form-check' style={{ marginTop: '26px' }}>
            <input
              className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-100 checked:border-blue-100 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
              type='checkbox'
              checked={self}
              onChange={(e) => setSelf(e.target.checked)}
            />
            <label className='form-check-label inline-block text-gray-800'>Pickup Yourself</label>
          </div>
          {!self && (
            <>
              <div className='text-xs' style={{ marginTop: '5px' }}>
                Address
              </div>
              <input
                style={{ marginTop: '7px' }}
                type='text'
                className='h-10 p-2 border border-grey-100 border-2 focus:border-gray-900 w-full'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </>
          )}

          <div style={{ marginTop: '36px' }}>
            <PillButton name='Complete Order' onClick={() => placeOrder()} />
          </div>
        </div>
      </Page>
    </>
  )
}

export default CompleteOrder
type ListingItemProps = {
  image: string
  name: string
  key: string
  selected?: boolean
  onClick?: () => void
}

export const CheckoutListItem = ({ image, name, onClick }: ListingItemProps) => {
  return (
    <div className='bg-white flex items-center justify-between px-2 py-2 border border-blue-100 rounded-xl w-full'>
      <div className='flex'>
        <img src={image} height={34} width={56} alt='' />
        <div style={{ marginLeft: '18px' }}>
          <div className='text-base'>{name}</div>
          <div className='text-sm text-gray-300'>1</div>
        </div>
      </div>
      <div className='cursor-pointer w-5 h-5 bg-red-500 flex items-center justify-center rounded-full' onClick={onClick}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={4}
          stroke='currentColor'
          className='w-3 h-3 text-white'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
        </svg>
      </div>
    </div>
  )
}
