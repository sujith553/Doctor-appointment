import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        {/* Left Section */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="Prescripto" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* Center */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <NavLink to="/"><li className="hover:text-primary cursor-pointer transition-colors">Home</li></NavLink>
            <NavLink to="/about"><li className="hover:text-primary cursor-pointer transition-colors">About us</li></NavLink>
            <NavLink to="/contact"><li className="hover:text-primary cursor-pointer transition-colors">Contact us</li></NavLink>
            <li className="hover:text-primary cursor-pointer transition-colors">Privacy policy</li>
          </ul>
        </div>

        {/* Right */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>greatstackdev@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center text-gray-500">
          Copyright © 2025 Prescripto — All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
