import { PillButton } from '@/compoenents/PillButton'
import { Page } from '@/layouts/Page'
import { useRouter } from 'next/router'
import Carousel from '@/compoenents/Slider'
import { useEffect, useState } from 'react'
import { Service } from '@/axios/config'
import { useQuery } from 'react-query'
import { useGlobalsContenxt } from '@/context/GlobalContext'


const useCategory = () => {
  return useQuery('Categories',async () => {
    const data = await Service.get('/category')
    return data.data
  })
}

const useProducts = (parent:string|undefined) => {
  return useQuery(['Products',parent], async () => {
    const data = await Service.get('/products/cat',{params:{
      parent
    }})
    return data.data
  },{enabled: !!parent})
}

export const useDistribution = () => {
  return useQuery(
    ['Distribution'],
    async () => {
      const data = await Service.get('/distribution/currentDistribution')
      return data.data
    }
  )
}

export const useNext = () => {
  return useQuery(['Distribution1'], async () => {
    const data = await Service.get('/distribution/nextDistribution')
    return data.data
  })
}

export function similarity(s1: string, s2: string) {
  var longer = s1
  var shorter = s2
  if (s1.length < s2.length) {
    longer = s2
    shorter = s1
  }
  var longerLength: number = longer.length
  if (longerLength == 0) {
    return 1.0
  }
  return (longerLength - editDistance(longer, shorter)!) / longerLength
}

function editDistance(s1: string, s2: string) {
  s1 = s1.toLowerCase()
  s2 = s2.toLowerCase()
  var costs = new Array<number>()
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j
      else {
        if (j > 0) {
           var newValue = costs[j - 1]
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue!, lastValue), costs[j]!) + 1
          costs[j - 1] = lastValue
          lastValue = newValue as any
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue
  }
  return costs[s2.length]
}

const Index = () => {
  const { push } = useRouter()
  const { data: Categories } = useCategory()
  
  const {Cart:[selectedItems, setSelectedItems]} = useGlobalsContenxt()


  const [selectedCategory, setSelectedCategory] = useState()

  const [search, setSearch] = useState('')
  
  const { data: dist } = useDistribution()
  const { data:next} = useNext()
   const limit = dist && dist.length > 0 ? dist[0].limit : 0

  const { data: Products } = useProducts(selectedCategory)

  useEffect(() => {
    const cart = window.localStorage.getItem('cart')
    if (cart && cart.length > 0)
    {
         setSelectedItems( JSON.parse(cart))
    }
 
  }, [])
  
  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(selectedItems))
      , [selectedItems]
  })
  
  useEffect(() => { if(!window.localStorage.getItem('token')) push('/login')})
  


  useEffect(() => {
    if(Categories) 
    {
      setSelectedCategory(Categories[0].parent)
    }
  }, [Categories])

 
  return (
    <Page name='Dashboard'>
      <div className='mt-0 '>
        <div className='p-4 mb-4 text-sm text-green-700 bg-green-100 items-center rounded-lg dark:bg-green-200 dark:text-green-800 mt-5 grid grid-cols-2 md:grid-cols-4 gap-5 '>
          <span className='font-medium mx-10'>Current Distribution End Date!</span>
          {dist && dist.length > 0 && new Date(dist[0].end).toISOString().slice(0, 10)}
          <span className='font-medium mx-10'>Next Distribution Start Date!</span>{' '}
          {next && next.length > 0 && new Date(next[0].start).toISOString().slice(0, 10)}
        </div>
        <div className='flex justify-between items-center flex-wrap ' style={{ paddingTop: '65px' }}>
          <div className='text-4xl font-semibold'>Food Categories</div>
          <input
            type='text'
            value={search}
            className='min-w-[200px]'
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search Food Items... '
            style={{ border: '1px solid #D0D1D7', padding: '9px 25px', borderRadius: '5px ' }}
          />
        </div>
        {Categories && (
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
          </Carousel>
        )}

        <div style={{ marginTop: '48px' }}>
          <div className='text-4xl font-semibold'>Fruits</div>
          <div
            className='grid md:grid-cols-5 grid-cols-1 sm:grid-cols-2 place-items-center md:place-item-stretch md:gap-10 gap-3'
            style={{ rowGap: '25px', marginTop: '25px' }}
          >
            {Products?.filter(
              (v: any) =>
                v.title
                  .toLowerCase()
                  .replace('-', '')
                  .replace("'", '')
                  .includes(search.toLowerCase()) ||
                similarity(v.title.toLowerCase(), search.toLowerCase()) > 0.5 ||
                search === ''
            ).map((I: any) => {
              return (
                <ListingItem
                  image={I.image}
                  selected={!!selectedItems.find((l) => I._id === l._id)}
                  key={I._id}
                  name={I.title}
                  onClick={() => {
                    !!selectedItems.find((l) => I._id === l._id)
                      ? setSelectedItems(selectedItems.filter((F) => F._id !== I._id))
                      : selectedItems.length >= limit
                      ? alert('Can not add more items')
                      : setSelectedItems([...selectedItems, I])
                  }}
                />
              )
            })}
          </div>
          <div className='flex justify-end' style={{ marginTop: '44px' }}>
            <PillButton
              name={`Card(${selectedItems.length}/${limit}) - Place Order`}
              onClick={() => selectedItems.length && push('complete')}
            />
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
      className={`bg-white h-max w-max flex flex-col items-center justify-center text-center rounded-xl cursor-pointer hover:border border-blue-100 ${selected && 'border'} `}
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
      <div className='flex justify-between items-center w-full gap-x-2' style={{ marginTop: '16px' }}>
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
