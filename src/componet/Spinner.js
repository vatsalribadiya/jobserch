import React from 'react';
import loadingImg from '../assest/3dgifmaker11773.gif';

const Spinner = () => {
  return (
    <div>
         <img src={loadingImg} alt="loading" className='inline'/>
    </div>
  )
}

export default Spinner