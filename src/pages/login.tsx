import { Button } from '@/compoenents/Button'
import { Page } from '@/layouts/Page'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Login = () => {
  const { push } = useRouter()
  return (
    <Page background name=''>
      <div className='flex flex-col items-center '>
        <Image
          src='/assets/images/login.png'
          height={58}
          width={135}
          alt=''
          style={{ marginTop: '98px' }}
        />
        <div className='text-6xl font-bold'>
          Heavens<span className='text-blue-100'>Table</span>
        </div>
        <div className='text-base' style={{ marginTop: '26px' }}>
          Don’t have an account?
          <a className='text-blue-200 cursor-pointer'> Create an account here</a>
        </div>

        <div style={{ width: '450px', marginTop: '36px', padding: '14px 28px' }}>
          <div className='text-5xl font-bold'>Account Login</div>
          <div className='text-base' style={{ marginTop: '5px' }}>
            Username or Email
          </div>
          <input
            style={{ marginTop: '7px' }}
            type='text'
            className='h-10 p-2 border border-grey-100 border-2 focus:border-gray-900 w-full'
          />
          <div className='text-base' style={{ marginTop: '17px' }}>
            Password
          </div>
          <input
            style={{ marginTop: '5px' }}
            type='password'
            className='h-10 p-2 border border-grey-100 border-2 focus:border-gray-900 w-full'
          />

          <div className='form-check' style={{ marginTop: '16px' }}>
            <input
              className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-100 checked:border-blue-100 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
              type='checkbox'
            />
            <label className='form-check-label inline-block text-gray-800'>Remember me</label>
          </div>
          <div className='w-full' style={{ marginTop: '16px' }}>
            <Button name='Login' onClick={() => push('/')} />
          </div>
          <div style={{ marginTop: '16px' }} className='text-center'>
            <a className='text-blue-200 cursor-pointer'>Forgot your password?</a>
          </div>
          <div style={{ marginTop: '72px' }} className='text-center'>
            <a className='text-gray-900 cursor-pointer decoration-underline'>
              Terms of Service - Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Login
