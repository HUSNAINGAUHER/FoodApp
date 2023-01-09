import { Service } from '@/axios/config'
import { Button } from '@/compoenents/Button'
import { Page } from '@/layouts/Page'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

const useLogin = (email?: string, password?: string) => {
  return useQuery(
    ['Login', email, password],
    async () => {
      console.log(email, password)
      const data = await Service.post('/user/login', {
        registerEmail: email,
        password: password,
      })
      return data.data
    },
    { enabled: !!email && !!password }
  )
}

const Login = () => {
  const { push } = useRouter()
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [password, setPassword] = useState<string | undefined>(undefined)

  const [cred, setCred] = useState<{ email: string; password: string } | undefined>(undefined)

  const { data: user, isLoading, error, isError } = useLogin(cred?.email, cred?.password)

  useEffect(() => {
    if (user?.token) {
      window.localStorage.setItem('token', user?.token)
      push('/')
    } else {
      isError && alert('User not Verified')
    }
  }, [isLoading])

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (token) {
      push('/')
    }
  }, [])

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

        <div
          style={{ maxWidth: '450px', marginTop: '36px', padding: '14px 28px' }}
          className='md:w-[450px]'
        >
          <div className='text-5xl font-bold'>Account Sign Login</div>
          <div className='text-base' style={{ marginTop: '5px' }}>
            Username or Email
          </div>
          <input
            style={{ marginTop: '7px' }}
            type='text'
            className='h-10 p-2 border border-grey-100 border-2 focus:border-gray-900 w-full'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className='text-base' style={{ marginTop: '17px' }}>
            Password
          </div>
          <input
            style={{ marginTop: '5px' }}
            type='password'
            className='h-10 p-2 border border-grey-100 border-2 focus:border-gray-900 w-full'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <div className='form-check' style={{ marginTop: '16px' }}>
            <input
              className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-100 checked:border-blue-100 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
              type='checkbox'
            />
            <label className='form-check-label inline-block text-gray-800'>Remember me</label>
          </div>
          {!isLoading ? (
            <div className='w-full' style={{ marginTop: '16px' }}>
              <Button
                name='Login'
                onClick={() => {
                  if (email && password) {
                    setCred({ email, password })
                  }
                }}
              />
            </div>
          ) : (
            <div role='status' className='mt-5'>
              <svg
                className='inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500'
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

          <div className=' mt-10'>
            <a
              className='text-gray-900 cursor-pointer decoration-underline'
              onClick={() => push('/signUp')}
            >
              Don't have account? Sign Up
            </a>
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
