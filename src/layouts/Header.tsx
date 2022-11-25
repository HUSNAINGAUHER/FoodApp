import { PillButton } from '@/compoenents/PillButton'
import { items } from '@/pages'
import Image from 'next/image'
import { useRouter } from 'next/router'

export const Header = ({ name }: { name: string }) => {
  const { push } = useRouter()
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
              Cart <span className='font-bold'>(3/5)</span>
            </div>
            <div className='hidden peer-hover:flex hover:flex absolute py-2'>
              <div
                className='w-[200px]
         flex-col bg-white drop-shadow-lg border-blue-100 border rounded-lg transition-all duration-1000'
                style={{ minWidth: '230px', padding: '17px' }}
              >
                <div className='flex flex-col '>
                  {items.slice(0, 5).map((I) => (
                    <div style={{ marginTop: '10px' }}>
                      <CheckoutListItem key='1' name={I.name} />
                    </div>
                  ))}
                  <div className='flex justify-center' style={{ marginTop: '12px' }}>
                    <PillButton name='Place Order' onClick={() => push('/success')} />
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

          <div
            style={{
              backgroundColor: '#ECEDEE',
              borderRadius: '100%',
              height: '40px',
              width: '40px',
            }}
            className='flex justify-center items-center'
          >
            <Image src='/assets/images/plus.svg' height={25} width={25} alt='' />
          </div>
          <div>
            <div className='peer relative'>
              <div className='flex justify-center items-center '>
                <Image src='/assets/images/profile.svg' height={40} width={40} alt='' />
                <div className='flex flex-col ml-3 '>
                  <div className='text-base'>John Doe</div>
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
                  <div className='text-sm font-medium' style={{ marginTop: '11px' }}>
                    Order History
                  </div>
                  <div className='text-sm font-medium' style={{ marginTop: '11px' }}>
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

export const CheckoutListItem = ({ name }: {  name: string }) => {
  return (
    <div className='bg-white flex items-center justify-between px-2 w-full'>
      <div className='flex'>
        <div>
          <div className='text-base font-medium'>{name}</div>
          <div style={{ color: '#858585', fontSize: '10px' }}>4 - 6</div>
        </div>
      </div>
      <div className='cursor-pointer w-5 h-5 bg-red-500 flex items-center justify-center rounded-full'>
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
