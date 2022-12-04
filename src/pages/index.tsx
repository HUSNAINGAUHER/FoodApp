import { PillButton } from '@/compoenents/PillButton'
import { Page } from '@/layouts/Page'
import { useRouter } from 'next/router'
import Carousel from '@/compoenents/Slider'
import { useEffect, useState } from 'react'
import { Service } from '@/axios/config'
import { useQuery } from 'react-query'



export const items = [
  {
    image: '0777 1 (0).png',
    name: 'Lemon',
    key: '1',
  },
  {
    image: '0777 1 (1).png',
    name: 'Apple',
    key: '2',
  },
  {
    image: '0777 1 (2).png',
    name: 'Apple Juice',
    key: '3',
  },
  {
    image: '0777 1 (3).png',
    name: 'Apple Sauce',
    key: '4',
  },
  {
    image: '0777 1 (4).png',
    name: 'Appricot',
    key: '5',
  },
  {
    image: '0777 1 (5).png',
    name: 'Banana',
    key: '6',
  },
  {
    image: '0777 1 (6).png',
    name: 'Blackberries',
    key: '7',
  },
  {
    image: '0777 1 (7).png',
    name: 'Blueberries',
    key: '8',
  },
  {
    image: '0777 1 (8).png',
    name: 'Cantaloupe',
    key: '9',
  },
  {
    image: '0777 1 (9).png',
    name: 'Cherries - dried',
    key: '119',
  },
  {
    image: '0777 1 (10).png',
    name: 'Coconut',
    key: '10',
  },
  {
    image: '0777 1 (0).png',
    name: 'Lemon',
    key: '11',
  },
  {
    image: '0777 1 (1).png',
    name: 'Apple',
    key: '12',
  },
  {
    image: '0777 1 (2).png',
    name: 'Apple Juice',
    key: '13',
  },
  {
    image: '0777 1 (3).png',
    name: 'Apple Sauce',
    key: '14',
  },
  {
    image: '0777 1 (4).png',
    name: 'Appricot',
    key: '15',
  },
  {
    image: '0777 1 (5).png',
    name: 'Banana',
    key: '16',
  },
  {
    image: '0777 1 (6).png',
    name: 'Blackberries',
    key: '17',
  },
  {
    image: '0777 1 (7).png',
    name: 'Blueberries',
    key: '18',
  },
  {
    image: '0777 1 (8).png',
    name: 'Cantaloupe',
    key: '19',
  },
  {
    image: '0777 1 (9).png',
    name: 'Cherries - dried',
    key: '20',
  },
  {
    image: '0777 1 (10).png',
    name: 'Coconut',
    key: '21',
  },
]



const useCategory = () => {
  return useQuery('Categories',async () => {
    const data = await Service.get('/category')
    return JSON.parse(data.data)
  })
}

const useProducts = (parent:string|undefined) => {
  return useQuery(['Products',parent], async () => {
    const data = await Service.get('/products/cat',{params:{
      parent
    }})
    return JSON.parse(data.data)
  },{enabled: !!parent})
}

const Index = () => {
  const { push } = useRouter()
  const {data:Categories} = useCategory()
 
  const [selectedCategory, setSelectedCategory] = useState()

  const [selectedItems, setSelectedItems] = useState<string[]>([])
   const { data: Products } = useProducts(selectedCategory)


  useEffect(() => {
    if(Categories) 
    {
      setSelectedCategory(Categories[0].parent)
    }
  }, [Categories])

  return (
    <Page name='Dashboard'>
      <div className='mt-0'>
        <div className='flex justify-between items-center' style={{ paddingTop: '65px' }}>
          <div className='text-4xl font-semibold'>Food Categories</div>
          <input
            type='text'
            placeholder='Search Food Items... '
            style={{ border: '1px solid #D0D1D7', padding: '9px 25px', borderRadius: '5px ' }}
          />
        </div>
        {Categories &&
        <Carousel>
          {Categories?.map((C: any) => (
            <CarouselItem
              name={C.parent}
              image={C.icon}
              key={C.parent}
              selected={C.parent === selectedCategory}
              onClick={() => {
                setSelectedCategory(C.parent)
              }}
            />
          ))}
        </Carousel>}

        <div style={{ marginTop: '48px' }}>
          <div className='text-4xl font-semibold'>Fruits</div>
          <div
            className='grid grid-cols-5 place-items-stretch gap-10'
            style={{ rowGap: '25px', marginTop: '25px' }}
          >
            {Products?.map((I:any) => {
              return (
                <ListingItem
                  image={I.image}
                  selected={selectedItems.includes(I._id)}
                  key={I._id}
                  name={I.title}
                  onClick={() => {
                    selectedItems.includes(I._id)
                      ? setSelectedItems(selectedItems.filter((F) => F !== I._id))
                      : setSelectedItems([...selectedItems, I._id])
                  }}
                />
              )
            })}
          </div>
          <div className='flex justify-end' style={{ marginTop: '44px' }}>
            <PillButton name='Card(3/5) - Place Order' onClick={() => push('complete')} />
          </div>
        </div>
      </div>
    </Page>
  )
}

type Props = {
  image: string
  name: string
  onClick?: () => void
  selected: boolean
}
const CarouselItem = ({ image, name, selected, onClick }: Props) => {
  return (
    <div
      className={`bg-white w-max h-max flex flex-col items-center justify-center text-center rounded-xl hover:border hover:border-blue-100 cursor-pointer ${
        selected && 'border border-blue-100'
      }`}
      style={{ width: '125px', height: '98px' }}
      onClick={onClick}
    >
      <img src={image} height={40} width={40} alt='' />
      <div className='font-sm font-medium' style={{ marginTop: '11px' }}>
        {name}
      </div>
    </div>
  )
}

type ListingItemProps = {
  image: string
  name: string
  key: string
  selected?: boolean
  onClick?: () => void
}

const ListingItem = ({ image, name, selected, onClick }: ListingItemProps) => {
  return (
    <div
      className='bg-white h-max flex flex-col items-center justify-center text-center rounded-xl cursor-pointer'
      style={{ height: '197px', padding: '13px' }}
      onClick={onClick}
    >
      <img
        style={{ width: '200px', height: '130px' }}
        src={image}
        height={130}
        width={200}
        alt=''
      />
      <div className='flex justify-between items-center w-full' style={{ marginTop: '16px' }}>
        <div className='font-base'>{name}</div>
        <div className='cursor-pointer'>
          {!selected ? (
            <div className='bg-black rounded-full p-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={4}
                stroke='currentColor'
                className='w-3 h-3 text-white'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
              </svg>
            </div>
          ) : (
            <div className='bg-blue-100 rounded-full p-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={4}
                stroke='currentColor'
                className='w-3 h-3 text-white'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Index
