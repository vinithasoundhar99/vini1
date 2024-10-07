// LoginComponent.jsx
import React from 'react';
import Navbar from './Navbar';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../Action/User';

const LoginComponent = () => {

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    
    };

    
    const handleSubmit =(e:React.FormEvent)=>{
        e.preventDefault()
        dispatch(login(data.email,data.password) as any);
    }










    return (
      <div className="">
       <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-gray-100 shadow-sm shadow-orange-400 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <img 
                    src="/home.png" 
                    alt="Login" 
                    className="w-full h-32 object-cover rounded-t-lg"
                />
                <h2 className="text-2xl font-semibold text-center mt-4">Login</h2>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name='email'
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" 
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name='password'
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" 
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center mt-4">
                    <a href="#" className="text-sm text-blue-500 hover:underline">Forgot your password?</a>
                    {/* <a href="#" className="text-sm text-blue-500 hover:underline">new User?</a> */}
                </div>
            </div>
        </div>
      </div>
    );
};

export default LoginComponent;

