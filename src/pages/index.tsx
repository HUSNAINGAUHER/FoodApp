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

const useAllProducts = (search:string|undefined) => {
  return useQuery(
    ['ProductsAll',search],
    async () => {
      
      const data = await Service.get('/products', {
        params: {
          title: search,
        },
      })
      return data.data.products
    }
  ,{enabled: !!search})
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
  const { data: AllProducts ,isLoading: productsLoading} = useAllProducts(search)


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
          <span className='font-medium'>Current Distribution End Date!</span>
          {dist && dist.length > 0 && new Date(dist[0].end).toISOString().slice(0, 10)}
          <span className='font-medium'>Next Distribution Start Date!</span>{' '}
          {next && next.length > 0 && new Date(next[0].start).toISOString().slice(0, 10)}
        </div>
        <div
          className='flex justify-between items-center flex-wrap '
          style={{ paddingTop: '20px' }}
        >
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
        <div className='hidden md:block'>
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
        </div>

        <div className='md:hidden block flex overflow-x-scroll gap-5 mt-5 overflow-y-hidden'>
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
        </div>

        {/* .filter(
              (v: any) =>
                v.title
                  .toLowerCase()
                  .replace('-', '')
                  .replace("'", '')
                  .includes(search.toLowerCase()) ||
                similarity(v.title.toLowerCase(), search.toLowerCase()) > 0.5 ||
                search === ''
            ) */}

        <div style={{ marginTop: '48px' }}>
          {!search && (
            <>
              <div className='text-4xl font-semibold'>{selectedCategory}</div>
              <div
                className='grid md:grid-cols-5 grid-cols-2 sm:grid-cols-2 place-items-center md:place-item-stretch md:gap-10 gap-5'
                style={{ rowGap: '25px', marginTop: '25px' }}
              >
                {Products?.map((I: any) => {
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
            </>
          )}

          {search && (
            <>
              <div className='text-4xl font-semibold'>Search Result : {search}</div>
              {productsLoading && (
                <div className='w-full flex justify-center mt-5 '>
                  <svg
                    aria-hidden='true'
                    className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 '
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
              <div
                className='grid md:grid-cols-5 grid-cols-2 sm:grid-cols-2 place-items-center md:place-item-stretch md:gap-10 gap-5'
                style={{ rowGap: '25px', marginTop: '25px' }}
              >
                {AllProducts?.map((I: any) => {
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
              {AllProducts?.length === 0 && (
                <div
                  className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
                  role='alert'
                >
                  <strong className='font-bold'>Oops! </strong>
                  <span className='block sm:inline'>No result found</span>
                  <span
                    className='absolute top-0 bottom-0 right-0 px-4 py-3'
                    onClick={() => setSearch('')}
                  >
                    <svg
                      className='fill-current h-6 w-6 text-red-500'
                      role='button'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <title onClick={() => setSearch('')}>Close</title>
                      <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
                    </svg>
                  </span>
                </div>
              )}
            </>
          )}
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
      className={`bg-white w-max min-w-[120px] p-[15px] h-[120px] w-[180px] flex flex-col items-center justify-center text-center rounded-xl hover:border hover:border-blue-100 cursor-pointer ${
        selected && 'border border-blue-100'
        
      }`}
     
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
      className={`bg-white h-max w-full flex flex-col items-center justify-center text-center rounded-xl cursor-pointer hover:border border-blue-100 ${selected && 'border'} `}
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
