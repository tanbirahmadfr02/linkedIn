/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const Lable = ({text, className}) => {
  return (
    <>
    <p className={`inline-block px-[45px] bg-white font-nunito font-normal text-[13px] text-secondary absolute top-[-10px] left-12 ${className}`}>{text}</p>
    </>
  )
}

export default Lable