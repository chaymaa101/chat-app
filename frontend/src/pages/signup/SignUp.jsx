import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useSignup from '../../hooks/useSignup';
import GenderCheckbox from './GenderCheckbox';

const SignUp = () => {
  // State for form inputs and loading state
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  // Destructure loading state and signup function from custom hook
  const { loading, signup } = useSignup();

  // Function to handle checkbox change for gender selection
  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return ( 
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 '>
        <h1 className='text-3xl font-semibold text-center text-orange-600'> Sign Up <span className='text-gray-500'>ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Fullname Input */}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-600'>Fullname</span>
            </label>
            <input 
              type="text" 
              placeholder="Type here" 
              className="input input-bordered input-warning w-full max-w-xs h-10" 
              value={inputs.fullName}
              onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
            />
          </div>
          {/* Username Input */}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-600'>Username</span>
            </label>
            <input 
              type="text" 
              placeholder="Type here" 
              className="input input-bordered input-warning w-full max-w-xs h-10" 
              value={inputs.username}
              onChange={(e) => setInputs({...inputs, username: e.target.value})}
            />
          </div>
          {/* Password Input */}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-600'>Password</span>
            </label>
            <input 
              type="password" 
              placeholder="Type here" 
              className="input input-bordered input-warning w-full max-w-xs h-10" 
              value={inputs.password}
              onChange={(e) => setInputs({...inputs, password: e.target.value})}
            />
          </div>
          {/* Confirm Password Input */}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-600'>Confirm Password</span>
            </label>
            <input 
              type="password" 
              placeholder="Type here" 
              className="input input-bordered w-full max-w-xs h-10 input-warning" 
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
            />
          </div>
          {/* Gender Checkbox */}
          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
          {/* Link to Login */}
          <Link to="/login" className='text-sm hover:underline text-gray-500 hover:text-gray-600 mt-2 inline-block' href='#'>
            Already have an account?
          </Link>
          {/* Signup Button */}
          <div> 
            <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
