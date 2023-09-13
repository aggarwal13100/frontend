import React from 'react';
import './Spinner.css';
const Spinner = () => {
  return (
    <div className='flex justify-center items-center fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 '>
        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <div className='font-bold text-2xl'>
          Loading...
        </div>
    </div>
  )
}

export default Spinner