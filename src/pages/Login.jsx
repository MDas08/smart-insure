import React from 'react'
import { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        //hash the password
        
        console.log('Email:', email);
        console.log('Password:', password);

    };
    return (
        <div className='flex justify-center w-100'>
            <form onSubmit={handleSubmit} className="bg-color-turq shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                <p className='block text-white text-lg'>Please enter your email and password below</p>
                <div className="my-4">
                    <label className="block text-white mb-2" htmlFor="email">Email</label>
                    <input
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="abc@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-white mb-2" htmlFor="password">Password</label>
                    <input
                        className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login

