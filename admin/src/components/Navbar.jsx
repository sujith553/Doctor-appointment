import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const { aToken, setAToken } = useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)
    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
            <div className='flex items-center gap-2 text-xs'>
                <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
                <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
            </div>
            <div className='flex items-center gap-4'>
                <button onClick={() => window.open('http://localhost:5174', '_blank')} className='border text-gray-600 px-5 py-2 rounded-full hover:bg-gray-50 transition-colors text-sm'>
                    Patient Portal (Home)
                </button>
                <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full hover:bg-blue-700 transition-colors'>Logout</button>
            </div>
        </div>
    )
}

export default Navbar
