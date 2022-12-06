import { Service } from '@/axios/config'
import { PillButton } from '@/compoenents/PillButton'
import { useGlobalsContenxt } from '@/context/GlobalContext'

import jwt from 'jsonwebtoken'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const Header = ({ name }: { name: string }) => {
  const { push } = useRouter()

  const [userName, setUsername] = useState('')
const [image, setImage] = useState('')


  useEffect(() => {
const token = window.localStorage.getItem('token')
    if (token) {
      const res: any = jwt.decode(token)
      if (res)
      {
        setUsername(res.name)
        setImage(res.image)
      }
     
    }
     const cart = window.localStorage.getItem('cart')
     if (cart && cart.length > 0) {
       setSelectedItems(JSON.parse(cart))
     }
  }, [])



 
  

const {
  Cart: [selectedItems, setSelectedItems],
} = useGlobalsContenxt()
  
  
  
  
  const placeOrder = async () => {
    const token = window.localStorage.getItem('token')
    if (token && token.length > 0) {
      const { name, email, phone } = jwt.decode(token) as any
      if (selectedItems.length > 0) {
        const res = await Service.post(
          '/order/add',
          { cart: selectedItems, name, email, contact: phone + '#', address: 'PWD' },
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: 'Bearer ' + window.localStorage.getItem('token'),
            },
          }
        )

        push('/success' + '?invoice=' + res.data.invoice)
      }
    }
  }
  
   useEffect(() => {
       window.localStorage.setItem('cart', JSON.stringify(selectedItems)), [selectedItems]
   }, [selectedItems])

  return (
    <div
      className='bg-white mx-auto relative flex items-center justify-center w-full'
      style={{ minHeight: '72px' }}
    >
      <div className='flex items-center justify-between' style={{ width: '1400px' }}>
        <div className='flex items-center gap-[2rem]'>
          <div className='text-6xl font-bold cursor-pointer' onClick={() => push('/')}>
            Heavens<span className='text-blue-100'>Table</span>.
          </div>
          <div className='text-[#F3F3F3] text-5xl'>/</div>
          <div>{name}</div>
          <div>
            <div
              className='peer text-blue-300 flex justify-center items-center w-max h-min py-2 px-2 cursor-pointer'
              onClick={() => push('complete')}
              style={{
                backgroundColor: '#EFFFEC',
                fontSize: '12px',
                border: ' 1px solid #07A32A',
                borderRadius: '60px',
              }}
            >
              Cart <span className='font-bold'>({selectedItems.length}/5)</span>
            </div>
            <div className='hidden peer-hover:flex hover:flex absolute py-2'>
              <div
                className='w-[200px]
         flex-col bg-white drop-shadow-lg border-blue-100 border rounded-lg transition-all duration-1000'
                style={{ minWidth: '230px', padding: '17px' }}
              >
                <div className='flex flex-col '>
                  {selectedItems.map((I) => (
                    <div style={{ marginTop: '10px' }}>
                      <CheckoutListItem
                        key='1'
                        name={I.title}
                        onClick={() =>
                          setSelectedItems(selectedItems.filter((l) => I._id !== l._id))
                        }
                      />
                    </div>
                  ))}
                  <div className='flex justify-center' style={{ marginTop: '12px' }}>
                    <PillButton name='Place Order' onClick={() => placeOrder()} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-center cursor-pointer gap-[2rem]'>
          <div
            style={{
              color: '#005AE0',
              textDecoration: 'underline',
              fontWeight: 600,
              fontSize: '16px',
            }}
            onClick={() => push('pastOrders')}
          >
            Past Orders
          </div>

          <div>
            <div className='peer relative'>
              <div className='flex justify-center items-center '>
                <img src={image} height={40} width={40} alt='' />
                <div className='flex flex-col ml-3 '>
                  <div className='text-base'>{userName}</div>
                  <div className='text-xs'>Profile Details</div>
                </div>
              </div>
            </div>

            <div className='hidden peer-hover:block hover:block pt-2 absolute'>
              <div
                className=' 
            flex-col bg-white drop-shadow-lg rounded-lg  border-blue-100 border transition-all duration-1000'
                style={{ padding: '9px 15px' }}
              >
                <div className='flex flex-col '>
                  <div className='text-sm font-medium'>Profile Setting</div>
                  <div
                    className='text-sm font-medium'
                    style={{ marginTop: '11px' }}
                    onClick={() => push('pastOrders')}
                  >
                    Order History
                  </div>
                  <div
                    className='text-sm font-medium'
                    style={{ marginTop: '11px' }}
                    onClick={() => {
                      window.localStorage.removeItem('token')
                      push('/login')
                    }}
                  >
                    Logout
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const CheckoutListItem = ({ name, onClick }: {  name: string, onClick:any }) => {
  return (
    <div className='bg-white flex items-center justify-between px-2 w-full'>
      <div className='flex'>
        <div>
          <div className='text-base font-medium'>{name}</div>
          <div style={{ color: '#858585', fontSize: '10px' }}>1</div>
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
