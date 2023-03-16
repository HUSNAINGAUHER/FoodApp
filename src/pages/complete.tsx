import { Service } from '@/axios/config'
import { PillButton } from '@/compoenents/PillButton'
import { useGlobalsContenxt } from '@/context/GlobalContext'
import { Page } from '@/layouts/Page'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useDistribution } from '.'
import { usePastOrders } from './pastOrders'
import { t } from 'i18next'


const CompleteOrder = () => {
  const { push,query } = useRouter()

  const {
    Cart: [selectedItems, setSelectedItems],
  } = useGlobalsContenxt()

  useEffect(() => {
   
    const cart = window.localStorage.getItem('cart')
  
    if (cart && JSON.parse(cart).length > 0) {
      setSelectedItems(JSON.parse(cart))
    }
    else{
      console.log('klsdjksl')
      push('/')
    }
  }, [])

   useEffect(() => {
       window.localStorage.setItem('cart', JSON.stringify(selectedItems)), [selectedItems]
   }, [selectedItems])
  useEffect(() => {
    if (!window.localStorage.getItem('token')) push('/login')
  })
  
  
  const [self, setSelf] = useState('Delivery')
  const [load, setLoad] = useState(false)

   const { data: dist } = useDistribution()
  
  const { data: orders } = usePastOrders()
 useGlobalsContenxt()

  

  

  const isAllowed = () => {
    
    return !orders?.orders.find((order:any) =>  order.createdAt >= dist[0]?.start &&  order.createdAt <= dist[0]?.end )
  }  
  const placeOrder = async () => {
    
    if (!isAllowed() && !query._id) {
      alert(t('You have already placed order in current distribution'))
      return
    }



    const token = window.localStorage.getItem('token')
    setLoad(true)
    if (token && token.length > 0) {
      console.log(jwt.decode(token))
      const { name, email, phone, address } = jwt.decode(token) as any
      if (selectedItems.length > 0) {
        try {

          if (!query._id) {
            const res = await Service.post(
              '/order/add',
              {
                cart: selectedItems,
                name,
                email,
                contact: phone,
                address,
                shippingOption: self,
                token: window.localStorage.getItem('token'),
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            )
          

            setSelectedItems([])
            push('/success' + '?invoice=' + res.data.invoice)
          }
          else {

            const res = await Service.put(
              `/orders/${query._id}`,
              {
                cart: selectedItems,
                name,
                email,
                contact: phone,
                address,
                shippingOption: self,
                token: window.localStorage.getItem('token'),
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            )

            setSelectedItems([])
            push('/success' + '?invoice=' + res.data.invoice)
          }
        }
        catch (err) {
          window.localStorage.removeItem('token')
          push('/login')
          setLoad(false)
        }
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
          style={{ marginTop: '70px', maxWidth: '600px', paddingBottom: '48px' }}
          className='bg-white mx-auto px-2 md:px-20 py-5 rounded-lg md:w-[600px]'
        >
          <div className='text-4xl font-semibold'>{t('Complete Your Order')}</div>
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

          <div className='' style={{ marginTop: '26px' }}>
            <label className='block mb-2 text-sm font-medium  text-gray-900'>
              {t('Select an option')}
            </label>
            <select
              value={self}
              onChange={(e) => setSelf(e.target.value)}
              id='countries'
              className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            >
              <option value='Self Pickup'>{t('Pickup Your Self')}</option>
              <option value='Delivery'>{t('Deliver to my address')}</option>
            </select>
          </div>

          {!load ? (
            <div style={{ marginTop: '36px' }}>
              <PillButton
                name={query._id ? t('Update Order') : t('Place Order')}
                onClick={() => placeOrder()}
              />
            </div>
          ) : (
            <div role='status' className='mt-5'>
              <svg
                className='inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>
          )}
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
