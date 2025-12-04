import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authService from '../redux/features/auth/authService'

function useRedirectLoggedOutUser(path) {
  const navigate = useNavigate()

  useEffect(() => {
    let isLoggedIn
    const redirectLoggedOut = async () => {
      try {
        isLoggedIn = await authService.getLoginStatus()
      }
      catch (error) {
        console.log(error.message)
      }
      if (!isLoggedIn) {
        toast.info('Session expired, please login to continue.')
        navigate(path)
      }
    }
    redirectLoggedOut().then(() => console.log('redirecting to login with logged out hook'))
  }, [path, navigate])
}

export default useRedirectLoggedOutUser
