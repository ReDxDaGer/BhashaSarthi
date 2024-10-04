"use client";

import { useContext, useEffect , useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "../context/AuthContext";

const login = () => {
    const {login} = useContext(AuthContext);
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const res = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",},
                body: new URLSearchParams({username, password}).toString(),
            });
            if (res.ok) {
                const data = await res.json();
                console.log('Login successful:', data);
                localStorage.setItem('token', data.access_token);
                router.push('/');
              } else {
                const errorData = await res.json();
                setError(errorData.detail || 'Login failed. Please try again.');
              }

        }catch(error){
            setError('Login failed. Please try again.');
          console.error('Login failed:', error);
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Login to BhashaSarthi</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input 
                        type="text" 
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input 
                        type="password" 
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="text-center">
                    <button 
                        type="submit" 
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out w-full"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>
    );


};

export default login;