import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authservice from '../../Appwrite/Auth'  // Adjust path if needed
import { Logout } from '../../Store/Authslice'
import toast from 'react-hot-toast'

const Logoutbtns = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await authservice.logout() // Clear session on Appwrite
      dispatch(Logout())         // Clear user in Redux
            toast.success("Logout successful ")

      navigate("/")              // Redirect to homepage or login
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <div>
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-gradient-to-br from-red-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
      >
        🔒 Logout
      </button>
    </div>
  )
}

export default Logoutbtns
