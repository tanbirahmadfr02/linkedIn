/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Button from "../Layout/Button";
import InputBox from "../components/InputBox";
import HeadingBox from "../components/HeadingBox";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPass = () => {
  const auth = getAuth();
  let [loading, setLoading] = useState(false);
  let [email, setEmail] = useState("")
  let navigate = useNavigate()

const handleChange = (e) => {
    setEmail(e.target.value)
}

  const handleSubmit = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
       setTimeout(()=>{
        navigate("/login")
       }, 2000)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      
    });
  };
  return (
    <>
      <div className="mt-14 bg-white w-[600px] mx-auto text-center py-10 rounded-2xl">
        <div>
          <HeadingBox heading={"Forgot Password"} />
        </div>
        <div className="flex flex-col justify-center items-center gap-y-[25px] mb-[50px]">
          <div className="mt-14">
            <InputBox name={"email"} value={email} onChange={handleChange} label={"Email Addres"} type={"Email"} />
          </div>
          <div>
            {loading ? (
              <div className="flex justify-center items-center">
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#086fa4"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : (
              <Button onClick={handleSubmit} text={"Submit"} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPass;
