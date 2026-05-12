import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { doctors as staticDoctors } from '../assets/assets'

export const AppContext = createContext()

const AppContextProvider = (props) => {

  const currencySymbol = '$'
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [doctors, setDoctors] = useState(staticDoctors)
  const [userData, setUserData] = useState(false)
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : false
  )

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/list')
      if (data.success && data.doctors.length > 0) {
        setDoctors(data.doctors)
      }
    } catch (error) {
      console.log("Using static doctors since backend is unavailable or empty.")
    }
  }

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })
      if (data.success) {
        setUserData(data.userData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getDoctorsData()
  }, [])

  useEffect(() => {
    if (token) {
      loadUserProfileData()
    } else {
      setUserData(false)
    }
  }, [token])

  const value = {
    doctors, setDoctors, getDoctorsData,
    currencySymbol,
    backendUrl,
    token, setToken,
    userData, setUserData,
    loadUserProfileData
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
