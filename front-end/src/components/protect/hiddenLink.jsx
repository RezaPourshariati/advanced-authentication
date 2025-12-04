import { useSelector } from 'react-redux'
import { selectIsLoggedIn, selectUser } from '../../redux/features/auth/authSlice'

export function ShowOnLogin({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  if (isLoggedIn)
    return <>{children}</>
  return null
}

export function ShowOnLogout({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  if (!isLoggedIn)
    return <>{children}</>
  return null
}

export function AdminAuth({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const user = useSelector(selectUser)
  if (isLoggedIn && (user?.role === 'admin' || user?.role === 'author'))
    return <>{children}</>
  return null
}
