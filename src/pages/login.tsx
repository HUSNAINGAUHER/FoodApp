import { Service } from '@/axios/config'
import { Button } from '@/compoenents/Button'
import { Page } from '@/layouts/Page'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

const useLogin = (email?:string, password?: string) => {
  return useQuery(
    ['Login', email,password],
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
 
  const { push} =useRouter()
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [password, setPassword] = useState<string | undefined>(undefined)

  const [cred, setCred] = useState<{email:string, password:string} | undefined>(undefined)

  const { data: user, isLoading } = useLogin(cred?.email, cred?.password) 

  useEffect(() => {
    if (user?.token) {
      window.localStorage.setItem('token', user?.token)
      push('/')
    }
  }, [isLoading])
  
  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (token) {
       push('/')
    }
  },[])
 
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
          <a className='text-blue-200 cursor-pointer' href='/signup'> Create an account here</a>
        </div>

        <div style={{ width: '450px', marginTop: '36px', padding: '14px 28px' }}>
          <div className='text-5xl font-bold'>Account Sign Up</div>
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
          <div className='w-full' style={{ marginTop: '16px' }}>
            <Button name='Login' onClick={() => {
              if (email && password) {
                setCred({ email, password });
              }
            }} />
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
