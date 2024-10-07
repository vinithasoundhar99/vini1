import React, { useState } from 'react';
import Navbar from './Navbar';
import {register} from "../../Action/User";
import { useDispatch } from 'react-redux';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });

  const [image, setImage] = useState<File | null>(null);

  const handleimage = (e:any) => {
    setImage(e.target.files[0]);
  }

  const dispatch = useDispatch();


  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log(formData,"formdata");
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("conformPassword", formData.confirmPassword);
    data.append('phone', formData.phone);
    data.append('address', formData.address);
    data.append('image', image as Blob);
     console.log(formData)
    dispatch(register(data) as any);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
    });
    // setImage(null);
  };


  return (
    <div className="">
     <Navbar />
    <div className="flex flex-col md:flex-row items-center justify-center p-6">
        
        <div className=" hidden md:block md:w-1/2 w-full mt-6 md:mt-0">
        <img src="/great.png" alt="Registration" className="w-full h-auto" />
      </div>
      <div className="md:w-1/2 w-full md:mr-4 mt-24 ">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            value={formData.address}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="file"
            name="image"
            onChange={handleimage}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
      
    </div>
    </div>
  );
};

export default Register;
