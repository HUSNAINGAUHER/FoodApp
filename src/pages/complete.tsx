import { PillButton } from '@/compoenents/PillButton'
import { Page } from '@/layouts/Page'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { items } from '.'

const CompleteOrder = () => {
  const { push } = useRouter()
  return (
    <>
      <Page name='Place Order'>
        <div
          style={{ marginTop: '70px', width: '600px', paddingBottom: '48px' }}
          className='bg-white mx-auto px-20 py-5 rounded-lg'
        >
          <div className='text-4xl font-semibold'>Complete Your Order</div>
          <div className='flex flex-col gap-y-4' style={{ marginTop: '22px' }}>
            {items.slice(0, 5).map((I) => (
              <CheckoutListItem image={`/assets/images/${I.image}`} key='1' name={I.name} />
            ))}
          </div>

          <div className='form-check' style={{ marginTop: '26px' }}>
            <input
              className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-100 checked:border-blue-100 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
              type='checkbox'
            />
            <label className='form-check-label inline-block text-gray-800'>Pickup Yourself</label>
          </div>

          <div style={{ marginTop: '36px' }}>
            <PillButton name='Complete Order' onClick={() => push('success')} />
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

const CheckoutListItem = ({ image, name }: ListingItemProps) => {
  return (
    <div className='bg-white flex items-center justify-between px-2 py-2 border border-blue-100 rounded-xl w-full'>
      <div className='flex'>
        <Image src={image} height={34} width={56} alt='' />
        <div style={{ marginLeft: '18px' }}>
          <div className='text-base'>{name}</div>
          <div className='text-sm text-gray-300'>4 - 6</div>
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
