import React from 'react';
import Customernavbar from './Customernavbar';

const Profile = () => {
    // Dummy profile data
    const userProfile = {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        phone: "+1234567890",
        address: "456 Elm St, Metropolis, USA",
        image: "https://via.placeholder.com/150", // Replace with actual image URL if available
    };

    const user = JSON.parse(localStorage.getItem('userInfo') || '{}');

    return (
        <div className="">
            <Customernavbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center p-4 max-w-md mx-auto bg-white rounded-lg shadow-lg">
                <img
                    src={`http://localhost:9000/uploads/customer/${user.image}`} // Placeholder if no image
                    alt="Profile"
                    className="w-32 h-32 rounded-full mb-4 object-cover"
                />
                <h2 className="text-2xl font-bold text-center">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{user.phone}</p>
                <p className="text-gray-600">{user.address}</p>
            </div>
        </div>
        </div>
    );
};

export default Profile;
