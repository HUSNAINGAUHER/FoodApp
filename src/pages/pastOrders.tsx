import { Service } from '@/axios/config'
import { useGlobalsContenxt } from '@/context/GlobalContext'
import { Page } from '@/layouts/Page'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useQuery } from 'react-query'


export const usePastOrders = () => {
  return useQuery(['Products'], async () => {
    const data = await Service.post('/order/', {
      token: window.localStorage.getItem('token')
    })
    return data.data
  })
}

const Success = () => {

  const {push} = useRouter()

  useEffect(() => {
    if (!window.localStorage.getItem('token')) push('/login')
  })

  const { data: orders } = usePastOrders()
  
  const {Cart:[cart, setCart]} = useGlobalsContenxt()
  
  useEffect(() => {
    const cart1 = window.localStorage.getItem('cart')
    if (cart1 && cart1.length > 0) {
      setCart(JSON.parse(cart1))
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart)), [cart]
  })
  return (
    <>
      <Page name='Past Orders'>
        <div
          style={{ marginTop: '70px', paddingBottom: '48px' }}
          className='bg-white mx-auto px-2 md:px-20 py-5 rounded-lg w-max w-auto'
        >
          <div className='text-4xl font-semibold' style={{ marginTop: '98px' }}>
            Past Orders
          </div>

          <div style={{ marginTop: '25px' }} className='overflow-scroll'>
            <div
              className='grid grid-cols-5 gap-10 border-b pb-3 w-max'
              style={{ borderColor: '#E2E2E2' }}
            >
              <div className='text-sm font-semibold'>Order #</div>
              <div className='text-sm font-semibold'>Items Ordered</div>
              <div className='text-sm font-semibold'>Delivery/Pickup</div>
              <div className='text-sm font-semibold'>Status</div>
              <div className='text-sm font-semibold'>Action</div>
            </div>
            {orders &&
              orders.orders.map((PO: any) => (
                <div
                  className='grid grid-cols-5 gap-5 border-b pb-3 w-max'
                  style={{ marginTop: '27px', borderColor: '#E2E2E2' }}
                >
                  <div className='text-sm font-semibold text-blue-900'>Order# {PO.invoice}</div>
                  <div className='text-sm '>{PO.cart.length}</div>
                  <div className='text-sm '>{PO.shippingOption}</div>
                  <div
                    className='text-sm '
                    style={{ color: PO.status !== 'pending' ? '#F24500' : '#07A32A' }}
                  >
                    {PO.status}
                  </div>
                  <div className='text-sm font-semibold text-blue-900 underline cursor-pointer' onClick={() => { setCart(PO.cart); push('/complete') }}>
                    View / Re-Order
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Page>
    </>
  )
}

export default Success
