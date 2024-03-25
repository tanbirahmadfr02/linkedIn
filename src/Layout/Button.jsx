/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const Button = ({text, onClick}) => {
  return (
    <>
    <div className='text-center'>
    <button className='font-nunito font-semibold text-xl text-white w-[500px] rounded-[86px] bg-primary py-5' onClick={onClick}>{text}</button>
    </div>
    </>
  )
}

export default Button