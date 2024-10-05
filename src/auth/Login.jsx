import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { signInFailure,signInStart,signInSuccess } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
 const user = useSelector((state) => state.auth.user)
 const navigate = useNavigate()
 console.log(user)

 useEffect(() => {
    if(user){
        navigate("/user")
    }
 },[])





const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    dispatch(signInStart()); // Dispatch signInStart action to set loading state
    

    try {
      const response = await axios.post('https://ohm-audits-webiste-backend.onrender.com/api/admins/login', {
        email,
        password
      });
      
      dispatch(signInSuccess(response.data)); // Dispatch signInSuccess action with user data
      navigate("/users")
      console.log(response.data);
      setLoading(false)
    } catch (error) {
    //   dispatch(signInSuccess(data));// Dispatch signInFailure action with error message
      toast.error('Login failed, please try again.');
      // localStorage.setItem('role', role);
      // navigate("/rfq/open")
      console.error('Login error:', error);
      setLoading(false)
    } 
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center logo text-blue-600">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-semibold text-sm  text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='enter email'
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block  text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder='enter password'
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0019.9 12a10.05 10.05 0 00-6.025-6.825M9.75 5.25a10.05 10.05 0 00-5.025 6.75A10.05 10.05 0 009.75 18.75m0 0l-4.5-4.5m4.5 4.5l4.5-4.5" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.5-4.5m-9 9L4.5 15M19.5 4.5l-9 9m-2.1 2.6a3 3 0 114.3 0 3 3 0 01-4.3 0zM9.7 5.5a3 3 0 014.2 0l.3.3M14 15.7a3 3 0 00-4.2 0l-.3.3m5.2-4.3A3 3 0 0114 10.7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <p className="ps-2">don't have an account ? <span className="text-blue-600 underline">Register </span></p>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white p-2 rounded-lg focus:outline-none ${loading?" select-none bg-zinc-600":""} `}
            disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
