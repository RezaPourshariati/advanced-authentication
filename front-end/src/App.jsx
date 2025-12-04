import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLoginStatus, getUser, selectIsLoggedIn, selectUser } from './redux/features/auth/authSlice'
import 'react-toastify/dist/ReactToastify.css'

axios.defaults.withCredentials = true

function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const user = useSelector(selectUser)

  useEffect(() => {
    dispatch(getLoginStatus())
    if (isLoggedIn && user === null)
      dispatch(getUser())
  }, [dispatch, isLoggedIn, user])

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/resetPassword/:resetToken" element={<Reset />} />
            <Route path="/loginWithCode/:email" element={<LoginWithCode />} />
            <Route path="/verify/:verificationToken" element={<Layout><Verify /></Layout>} />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            <Route path="/changePassword" element={<Layout><ChangePassword /></Layout>} />
            <Route path="/users" element={<Layout><UserList /></Layout>} />
          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
