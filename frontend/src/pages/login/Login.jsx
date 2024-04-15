import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import useLogin from '../../hooks/useLogin';

const Login = () => {
  
  const [username, setUsername]= useState('');
  const [password, setPassword]= useState('');
  const {loading, login}=useLogin()

  const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto '>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
          <h1 className='text-2xl font-semibold text-center text-orange-500 '>Login 
          <span className='text-gray-500'>
             ChatApp
          </span>

          </h1>


          <form onSubmit={handleSubmit}>
            <div>
              <label className='label p-2'>
                <span className='text-base label-text text-gray-600'>Username</span>
              </label>
              <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs h-10"
              value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label className='label p-2'>
                <span className='text-base label-text text-gray-600'>Password</span>
              </label>
              <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs h-10"
              value={password}
               onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Link to='/signup' className='text-ms hover:underline text-gray-500 hover:text-gray-600 mt-2 inline-block' >
            {"Don't have an account? Sign Up"}
            </Link>
            
            <div>
            <button className='btn btn-block btn-sm mt-2' disabled={loading}>
							{loading ? <span className='loading loading-spinner '></span> : "Login"}
						</button>
            </div>
          </form>


        </div>
      
    </div>
  )
}

export default Login
// import React from 'react'

// const Login = () => {
//   return (
//     <div className='flex flex-col items-center justify-center min-w-96 mx-auto '>
//         <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//           <h1 className='text-2xl font-semibold text-center text-orange-500 '>Login 
//           <span className='text-gray-500'>
//              ChatApp
//           </span>

//           </h1>


//           <form>
//             <div>
//               <label className='label p-2'>
//                 <span className='text-base label-text text-gray-600'>Username</span>
//               </label>
//               <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs h-10" />
//             </div>
//             <div>
//               <label className='label p-2'>
//                 <span className='text-base label-text text-gray-600'>Password</span>
//               </label>
//               <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs h-10" />
//             </div>
//             <a href="http://" className='text-ms hover:underline text-gray-500 hover:text-gray-600 mt-2 inline-block'>
//               {"Don't have an account? Sign Up"}
//             </a>
//             <div>
//             <button className="btn btn-block btn-sm mt-2">Login</button>
//             </div>
//           </form>


//         </div>
      
//     </div>
//   )
// }

// export default Login
