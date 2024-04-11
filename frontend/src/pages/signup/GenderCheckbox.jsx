import React from 'react';

const GenderCheckbox = () => {
  return (
    <div className='flex'>
      <div className='form-control'> 
        <label className='label gap-2 cursor-pointer'> 
          <span className='label-text text-gray-600'>Male</span>
          <input type="checkbox" className="checkbox border-slate-900" id="maleCheckbox" />
        </label>
      </div>
      
      <div className='form-control'> 
        <label className='label gap-2 cursor-pointer'> 
          <span className='label-text text-gray-600'>Female</span>
          <input type="checkbox" className="checkbox border-slate-900" id="femaleCheckbox" />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;

// import React from 'react';

// const GenderCheckbox = () => {
//   return (
//     <div className='flex'>
//       <div className='form-control'> 
//         <label className='label gap-2 cursor-pointer'> 
//           <span className='label-text text-gray-600'>Male</span>
//           <input type="checkbox" className="checkbox border-slate-900" id="maleCheckbox" />
//         </label>
//       </div>
      
//       <div className='form-control'> 
//         <label className='label gap-2 cursor-pointer'> 
//           <span className='label-text text-gray-600'>Female</span>
//           <input type="checkbox" className="checkbox border-slate-900" id="femaleCheckbox" />
//         </label>
//       </div>
//     </div>
//   );
// };

// export default GenderCheckbox;
