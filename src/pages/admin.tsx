
import { useEffect } from 'react'
import { useLogin } from './login'
import { useRouter } from 'next/router'


const Success = () => {
  
  const {push } =useRouter()
  const { data:user ,isLoading} = useLogin('admin@gmail.com', 'admin')
  
  useEffect(() => {
    if (user?.data?.token) {
      window.localStorage.setItem('token', user.data?.token)
      push('/')
    }
  }, [isLoading])
  return (
    <>
      Customer Dashboard Loading
    </>
  )
}

export default Success
