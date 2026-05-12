import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">

      {/* Logo */}
      <img
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Prescripto Logo"
        onClick={() => navigate('/')}
      />

      {/* Desktop Nav Links */}
      <ul className="md:flex items-start gap-5 font-medium hidden">
        {[
          { label: 'HOME',        to: '/' },
          { label: 'ALL DOCTORS', to: '/doctors' },
          { label: 'ABOUT',       to: '/about' },
          { label: 'CONTACT',     to: '/contact' },
        ].map(({ label, to }) => (
          <NavLink key={to} to={to}>
            {({ isActive }) => (
              <li className={`py-1 ${isActive ? 'text-primary border-b-2 border-primary' : 'text-gray-700 hover:text-primary'} transition-colors duration-200`}>
                {label}
              </li>
            )}
          </NavLink>
        ))}
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        <button onClick={() => window.open('http://localhost:5175', '_blank')} className="border text-gray-600 px-5 py-2 rounded-full hidden md:block hover:bg-gray-50 transition-colors text-sm">
          Admin Panel
        </button>

        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full object-cover" src={userData.image || assets.profile_pic} alt="profile" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="dropdown" />
            {/* Dropdown */}
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-lg">
                <p onClick={() => navigate('/my-profile')} className="hover:text-black cursor-pointer">My Profile</p>
                <p onClick={() => navigate('/my-appointments')} className="hover:text-black cursor-pointer">My Appointments</p>
                <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block hover:bg-blue-700 transition-colors duration-200"
          >
            Create account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="menu"
        />
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300`}>
        <div className="flex items-center justify-between px-5 py-6">
          <img src={assets.logo} className="w-36" alt="logo" />
          <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className="w-7 cursor-pointer" alt="close" />
        </div>
        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
          {[
            { label: 'HOME',        to: '/' },
            { label: 'ALL DOCTORS', to: '/doctors' },
            { label: 'ABOUT',       to: '/about' },
            { label: 'CONTACT',     to: '/contact' },
          ].map(({ label, to }) => (
            <NavLink key={to} onClick={() => setShowMenu(false)} to={to}>
              <li className="px-4 py-2 rounded inline-block">{label}</li>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
