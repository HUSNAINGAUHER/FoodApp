import { Service } from '@/axios/config'
import { Button } from '@/compoenents/Button'
import { Page } from '@/layouts/Page'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'

const useLogin = (email?: string, password?: string, image?: string, name?: string, phone?: string, address?: string, zip?: string, id?: string) => {
  
  console.log(id)
  return useQuery(
    ['update', email,password, image, address, zip, id],
    async () => {
     
      const token = 
        {
          password: password,
          email: email,
          name,
          phone,
          address,
          zipCode: zip
      }
      
      console.log(token)
      const data = await Service.put(`/user/${id}`, { ...token })
      return data.data
    },
    { enabled: !!email && !!password && !!id }
  )
}








const SignUp = () => {


 

  const [email, setEmail] = useState<string | undefined>(undefined)
  const [password, setPassword] = useState<string | undefined>(undefined)
  const [phone, setPhone] = useState<string | undefined>(undefined)
  const [name, setName] = useState<string | undefined>(undefined)
  const [address, setAddress] = useState<string | undefined>(undefined)
  const [zip, setZip] = useState<string | undefined>(undefined)
  const [err, setError] = useState<any>(undefined)

  
  

  const [cred, setCred] = useState<{email:string, password:string, image:string, phone:string,name:string, address:string, zip:string, id: string} | undefined>(undefined)

  const { data: user, isLoading } = useLogin(cred?.email, cred?.password, cred?.image, cred?.name, cred?.phone, cred?.address, cred?.zip, cred?.id) 
  useEffect(() => {
    if (user?.token) {
      window.localStorage.setItem('token', user?.token)
      push('/')
    }
  }, [isLoading])
  const { push } = useRouter()
  
  useEffect(() => {
    const t = window.localStorage.getItem('token')
    
    if (t)
    {

      const user = jwt.decode(t) as any
      console.log(user)
      setEmail(user.email)
      setName(user.name)
      setPhone(user.phone)
      setZip(user.zipCode)
      setAddress(user.address)
      }

    
  },[])

  



  

  return (
    <Page name=''>
      <div className='flex flex-col items-center'>
        <div className='text-6xl font-bold'>
          Heavens<span className='text-blue-100'>Table</span>
        </div>

        <div style={{ maxWidth: '450px', marginTop: '36px', padding: '14px 28px' }} className='md:w-[450px] w-full'>
          <div className='text-5xl font-bold'>Edit Profile</div>

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
            Email
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

          <div className='text-base' style={{ marginTop: '17px' }}>
            Address
          </div>
          <input
            style={{ marginTop: '5px' }}
            type='text'
            className='h-10 p-2 border border-grey-100 border-2 focus:border-gray-900 w-full'
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />

          <div className='text-base' style={{ marginTop: '17px' }}>
            Zip Code
          </div>
          <input
            style={{ marginTop: '5px' }}
            type='text'
            className='h-10 p-2 border border-grey-100 border-2 focus:border-gray-900 w-full'
            onChange={(e) => setZip(e.target.value)}
            value={zip}
          />

         

          {err && <div className='text-red-500 mt-2'>{err}</div>}

          {!isLoading ? (
            <div className='w-full' style={{ marginTop: '16px' }}>
              <Button
                name='Update'
                onClick={() => {
                  if (email && password && phone && name && address && zip) {
                    const t = window.localStorage.getItem('token')
                    const id = t ? (jwt.decode(t) as any)._id : ''
                    setCred({
                      email,
                      password,
                      image: 'sj',
                      phone: phone,
                      name: name,
                      address,
                      zip,
                      id,
                    })
                  } else {
                    setError('Some Fields are missing')
                  }
                }}
              />{' '}
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
        </div>
      </div>
    </Page>
  )
}

export default SignUp
