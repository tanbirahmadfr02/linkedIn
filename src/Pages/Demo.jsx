/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import InputBox from "../components/InputBox";

const Demo = () => {
  let [data, setData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const handleClick = () => {
    setData({ email: "", name: "", password: "" });
  };

  return (
    <>
      <div className="mt-20 flex flex-col gap-y-5 items-center">
        <InputBox
          value={data.email}
          name={"email"}
          label={"Email Addres"}
          type={"Email"}
          onchange={handleChange}
        />
        <InputBox
          value={data.name}
          name="name"
          label={"Email Addres"}
          type={"text"}
          onchange={handleChange}
        />
        <InputBox
          value={data.password}
          name={"password"}
          label={"Email Addres"}
          type={"text"}
          onchange={handleChange}
        />
        <button
          className="py-5 px-10 bg-primary mt-10 mx-auto"
          onClick={handleClick}
        >
          submit
        </button>
      </div>
    </>
  );
};

export default Demo;
