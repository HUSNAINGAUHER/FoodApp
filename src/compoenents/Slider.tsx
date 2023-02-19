import * as React from 'react'
import styled, { css } from 'styled-components'


interface ICarouselProps {
  currentSlide: number
}

const SCarouselSlides = styled.div<ICarouselProps>`
  display: flex;
  ${(props) => props.currentSlide && css``};
  transition: all 0.5s ease;
`

interface IProps {
  children: JSX.Element[]
}

const Carousel = ({ children }: IProps) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)

  const activeSlide = (
    <div className='grid grid-cols-2 md:grid-cols-6 place-items-center w-full gap-y-10'>
      {children.slice(currentSlide, currentSlide + 6)}
    </div>
  )

  React.useEffect(() => {
    console.log(currentSlide)
  },[currentSlide])

  return (
    <div style={{marginTop:'44px'}}>
      <div>
        <SCarouselSlides currentSlide={currentSlide}>
          <div className='flex justify-center items-center cursor-pointer hover:bg-gray-400 rounded-lg '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={3}
              stroke='currentColor'
              className='w-6 h-6'
              onClick={() => {
                setCurrentSlide((currentSlide - 2 + children.length) % (children.length - 6))
              }}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
            </svg>
          </div>
          {activeSlide}
          <div className='flex justify-center items-center cursor-pointer hover:bg-gray-400 rounded-lg'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={3}
              stroke='currentColor'
              className='w-6 h-6'
              onClick={() => {
                setCurrentSlide((currentSlide + 1) % (children.length - 6))
              }}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
            </svg>
          </div>
        </SCarouselSlides>
      </div>
    </div>
  )
}

export default Carousel
