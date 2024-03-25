/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const Input = ({type, onChange, value, name}) => {
  return (
    <>
    <input name={name} value={value} onChange={onChange} type={type} className='font-normal font-nunito text-xl text-secondary py-[26px] pl-[70px] border border-solid border-[#b8b9ce] rounded-lg w-full'/>
    </>
  )
}

export default Input