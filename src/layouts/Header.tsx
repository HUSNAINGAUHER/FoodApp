import Image from 'next/image'
import { useRouter } from 'next/router'

export const Header = ({ name }: { name: string }) => {
  const { push } = useRouter()
  return (
    <div className='bg-white mx-auto relative flex justify-center w-full'>
      <div className='flex items-center justify-between' style={{ width: '1400px' }}>
        <div className='flex items-center gap-12'>
          <div className='text-6xl font-bold cursor-pointer' onClick={() => push('/')}>
            Heavens<span className='text-blue-100'>Table</span>
          </div>
          <div>{name}</div>

          <div
            className='text-blue-300 flex justify-center items-center w-max h-min py-2 px-2 cursor-pointer'
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
        </div>
        <div className='flex items-center cursor-pointer  gap-12'>
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

          <div className='flex justify-center items-center'>
            <Image src='/assets/images/profile.svg' height={40} width={40} alt='' />
            <div className='flex flex-col ml-3'>
              <div className='text-base'>John Doe</div>
              <div className='text-xs'>Profile Details</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
