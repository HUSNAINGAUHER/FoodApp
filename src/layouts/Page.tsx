import { ReactNode } from 'react'
import bg from 'public/assets/images/Background.png'
import { Header } from './Header'

export const Page = ({
  children,
  background,
  name,
}: {
  children: ReactNode
  background?: boolean
  name: string
}) => (
  <div style={{ backgroundColor: '#F3F4F5' }} className='pb-10'>
    {!background && <Header name={name} />}
    <div
      style={{
        width: !background ? '1400px' : 'auto',
        backgroundImage: background ? `url(${bg.src})` : 'none',
        minHeight: '100vh',
        backgroundSize: 'cover',
      }}
      className='mx-auto h-max'
    >
      <div className='w-full h-full'>{children}</div>
    </div>
  </div>
)
