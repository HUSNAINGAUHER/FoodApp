import { Page } from '@/layouts/Page'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Success = () => {

  const { query, push } = useRouter()

  useEffect(() => {
    if (!window.localStorage.getItem('token')) push('/login')
  })
  
  useEffect(() => {
    window.localStorage.setItem('cart',JSON.stringify([]))
  },[])
  return (
    <>
      <Page name='Place Order'>
        <div
          style={{ marginTop: '70px', width: '600px', paddingBottom: '48px' }}
          className='bg-white mx-auto px-20 py-5 rounded-lg text-center'
        >
          <div className='text-4xl font-semibold' style={{ marginTop: '98px' }}>
            Thank You
          </div>
          <div className='flex flex-col gap-y-4 text-base' style={{ marginTop: '11px' }}>
            We appreciate your order, we're currently processing it. So hang tight and we'll send
            you confirmation very soon!yarn 
          </div>

          <div
            className='bg-white flex-col items-center justify-center px-2 py-2 border border-blue-100 rounded-xl w-full'
            style={{ marginTop: '24px', padding: '15px' }}
          >
            <div style={{ fontSize: '19px' }}>Order Code</div>
            <div style={{ marginTop: '9px', fontSize: '13px' }}>
              This number will be used when picking up your items.
            </div>
            <div
              style={{ marginTop: '11px' }}
              className='bg-gray-400 mx-auto px-8 py-2 border border-blue-100 rounded-xl w-max h-max'
            >
              <div className='text-center mx-auto'>{query['invoice']}</div>
            </div>
          </div>
        </div>
      </Page>
    </>
  )
}

export default Success
