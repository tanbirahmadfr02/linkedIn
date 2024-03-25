/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Lable from "../Layout/Lable";
import Input from "../Layout/Input";

const InputBox = ({ label, type, onChange, value , name}) => {
  return (
    <>
      <div className="relative w-[500px]">
        <Lable text={label} />
        <Input type={type} onChange={onChange} value={value} name={name}/>
      </div>
    </>
  );
};

export default InputBox;
