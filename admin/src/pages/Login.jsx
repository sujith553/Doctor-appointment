import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (state === 'Admin') {
        // BYPASS BACKEND: Hardcoded dummy login
        if (email.trim().toLowerCase() === 'sujithp012005@gmail.com' && password.trim() === 'sujith') {
          localStorage.setItem('aToken', 'dummy_admin_token')
          setAToken('dummy_admin_token')
          toast.success("Logged in with Dummy Admin Token (Backend Bypassed)")
        } else {
          toast.error("Invalid dummy credentials (try sujithp012005@gmail.com / sujith)")
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          localStorage.setItem('dToken', data.token)
          setDToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'> {state} </span> Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1 outline-none focus:border-primary transition-colors' type="email" required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <div className='relative'>
            <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1 outline-none focus:border-primary transition-colors pr-14' type={showPassword ? "text" : "password"} required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-gray-500 font-medium hover:text-gray-800 transition-colors'>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base hover:opacity-90 transition-opacity'>Login</button>

        {state === 'Admin'
          ? <p>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p>
          : <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
