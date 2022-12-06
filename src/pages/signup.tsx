import { Service } from '@/axios/config'
import { Button } from '@/compoenents/Button'
import { Page } from '@/layouts/Page'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import jwt from 'jsonwebtoken'
import { useRouter } from 'next/router'

const useLogin = (email?:string, password?: string, image?:string, name?:string, phone?:string) => {
  return useQuery(
    ['signup', email,password, image],
    async () => {

      const token = jwt.sign(
        {
          password: password,
          email: email,
          name,
          phone,
          image
        },
        'lfjfjasjfsdfsfr09ri09wfsdfsdfrilfdjdj'
      )
      const data = await Service.post(`/user/register/${token}`,{email: email, password: password,image:image, name})
      return data.data
    },
    { enabled: !!email && !!password }
  )
}



const getBase64 = (file:any) => {
  return new Promise((resolve) => {
    let fileInfo
    let baseURL:any
    // Make new FileReader
    let reader = new FileReader()

    // Convert the file to base64 text
    reader.readAsDataURL(file)

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      console.log('Called', reader)
      baseURL = reader.result
      console.log(baseURL)
      resolve(baseURL)
    }
    console.log(fileInfo)
  })
}


const SignUp = () => {
 

  const [email, setEmail] = useState<string | undefined>(undefined)
  const [password, setPassword] = useState<string | undefined>(undefined)
  const [phone, setPhone] = useState<string | undefined>(undefined)
  const [name, setName] = useState<string | undefined>(undefined)
  const [file, setFile] = useState<any>(null)
  const [err, setError] = useState<any>(undefined)

  const [cred, setCred] = useState<{email:string, password:string, image:string, phone:string,name:string} | undefined>(undefined)

  const { data: user, isLoading } = useLogin(cred?.email, cred?.password, cred?.image, cred?.name, cred?.phone) 
  useEffect(() => {
    if (user?.token) {
      window.localStorage.setItem('token', user?.token)
      push('/')
    }
  }, [isLoading])
  const {push } = useRouter()

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
        <div className='text-base' style={{ marginTop: '26px' }}>
          Have an account?
          <a className='text-blue-200 cursor-pointer' href='/login'>
            {' '}
            Continue Login
          </a>
        </div>

        <div style={{ width: '450px', marginTop: '36px', padding: '14px 28px' }}>
          <div className='text-5xl font-bold'>Account SignUp</div>

          <div className='text-base' style={{ marginTop: '5px' }}>
            Full Name
          </div>
          <input
            style={{ marginTop: '7px' }}
            type='text'
            className='h-10 p-2 border border-grey-100 border-2 focus:border-gray-900 w-full'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className='text-base' style={{ marginTop: '5px' }}>
            Phone
          </div>
          <input
            style={{ marginTop: '7px' }}
            type='text'
            className='h-10 p-2 border border-grey-100 border-2 focus:border-gray-900 w-full'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className='text-base' style={{ marginTop: '5px' }}>
            Username or Email
          </div>
          <input
            style={{ marginTop: '7px' }}
            type='email'
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

         

          <div style={{ marginTop: '16px' }}>
            <label className='form-check-label inline-block text-gray-800'>
              Upload Profile Pic
            </label>
            <input
              className='h-10 p-2 focus:border-gray-900 w-full mt-2'
              type='file'
              onChange={async (e) =>
                setFile(e.target.files?.length ? await getBase64(e.target.files[0]) : null)
              }
            />
          </div>

          {err && <div className='text-red-500 mt-2'>{err}</div>}

          <div className='w-full' style={{ marginTop: '16px' }}>
            <Button
              name='Sign Up'
              onClick={() => {
                if (email && password && phone && name) {
                  setCred({ email, password, image: file, phone: phone, name: name })
                } else {
                  setError('Some Fields are missing')
                }
              }}
            />
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

export default SignUp
