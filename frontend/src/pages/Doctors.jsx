import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist',
  ]

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">

        {/* Filter Button (mobile) */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}
        >
          Filters
        </button>

        {/* Sidebar Filters */}
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {specialities.map((spec, idx) => (
            <p
              key={idx}
              onClick={() =>
                speciality === spec
                  ? navigate('/doctors')
                  : navigate(`/doctors/${spec}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer transition-all hover:bg-indigo-50 ${
                speciality === spec ? 'bg-[#E2E5FF] text-black' : ''
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctor Cards Grid */}
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }}
              className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 group"
              key={index}
            >
              <img className="bg-[#EAEFFF] w-full group-hover:bg-primary transition-colors duration-500" src={item.image} alt={item.name} />
              <div className="p-4">
                <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                  <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                  <p>{item.available ? 'Available' : 'Not Available'}</p>
                </div>
                <p className="text-[#262626] text-lg font-medium">{item.name}</p>
                <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
