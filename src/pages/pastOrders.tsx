import { Service } from '@/axios/config'
import { useGlobalsContenxt } from '@/context/GlobalContext'
import { Page } from '@/layouts/Page'
import { t } from 'i18next'
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
            {t('Past Orders')}
          </div>

          <div style={{ marginTop: '25px' }} className='overflow-scroll'>
            {orders &&
              orders.orders.map((PO: any, index: number) => (
                <div
                  className='grid grid-cols-5 gap-10 border-b pb-3 w-max'
                  style={{ marginTop: '27px', borderColor: '#E2E2E2' }}
                >
                  {index === 0 && (
                    <>
                      <div className='text-sm font-semibold'> {t('Order')} #</div>
                      <div className='text-sm font-semibold'> {t('Items Ordered')}</div>
                      <div className='text-sm font-semibold'> {t('Delivery/Pickup')}</div>
                      <div className='text-sm font-semibold'> {t('Status')}</div>
                      <div className='text-sm font-semibold'> {t('Action')}</div>
                    </>
                  )}
                  <div className='text-sm font-semibold text-blue-900'>
                    {' '}
                    {t('Order')}# {PO.invoice}
                  </div>
                  <div className='text-sm '>{PO.cart.length}</div>
                  <div className='text-sm '>{PO.shippingOption}</div>
                  <div
                    className='text-sm '
                    style={{ color: PO.status === 'Pending' ? '#F24500' : '#07A32A' }}
                  >
                    {PO.status}
                  </div>
                  {PO.status === 'Pending' ? (
                    <div
                      className='text-sm font-semibold text-blue-900 underline cursor-pointer'
                      onClick={() => {
                        setCart(PO.cart)
                        push('/?_id=' + PO._id)
                      }}
                    >
                      {t('Edit Order')}
                    </div>
                  ) : (
                    <div
                      className='text-sm font-semibold text-blue-900 underline cursor-pointer'
                      onClick={() => {
                        setCart(PO.cart)
                        push('/complete')
                      }}
                    >
                      {t('View / Re-Order')}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </Page>
    </>
  )
}

export default Success
