import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [dashData, setDashData] = useState(false);

    const getAllDoctors = async () => {
        // BYPASS BACKEND: Mock Data
        setDoctors([
            { _id: '1', name: 'Dr. Richard James', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Richard', email: 'doc1@test.com', speciality: 'General physician', degree: 'MBBS', experience: '4 Years', fees: 50, address: {line1: '123 Fake St', line2: 'City'}, available: true, date: Date.now() },
            { _id: '2', name: 'Dr. Emily Larson', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily', email: 'doc2@test.com', speciality: 'Gynecologist', degree: 'MD', experience: '6 Years', fees: 80, address: {line1: '456 Dummy Rd', line2: 'Town'}, available: false, date: Date.now() }
        ]);
    }

    const getAllAppointments = async () => {
        // BYPASS BACKEND: Mock Data
        setAppointments([
            { _id: '1', docData: {name: 'Dr. Richard James', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Richard', fees: 50}, userData: {name: 'John Doe', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', dob: '1990-01-01'}, slotDate: '20_10_2026', slotTime: '10:00 AM', amount: 50, cancelled: false, isCompleted: false, payment: true },
            { _id: '2', docData: {name: 'Dr. Emily Larson', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily', fees: 80}, userData: {name: 'Jane Smith', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane', dob: '1995-05-15'}, slotDate: '21_10_2026', slotTime: '02:30 PM', amount: 80, cancelled: true, isCompleted: false, payment: false }
        ]);
    }

    const cancelAppointment = async (appointmentId) => {
        // BYPASS BACKEND: Mock Data
        toast.success("Dummy Appointment Cancelled")
        getAllAppointments()
    }

    const getDashData = async () => {
        // BYPASS BACKEND: Mock Data
        setDashData({
            doctors: 14,
            appointments: 120,
            patients: 80,
            latestAppointments: [
               { _id: '1', docData: {name: 'Dr. Richard James', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Richard', fees: 50}, userData: {name: 'John Doe', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', dob: '1990-01-01'}, slotDate: '20_10_2026', slotTime: '10:00 AM', amount: 50, cancelled: false, isCompleted: false, payment: true }
            ]
        });
    }

    const value = {
        aToken, setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        appointments, setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData, getDashData
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
