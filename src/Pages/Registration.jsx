/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import HeadingBox from "../components/HeadingBox";
import InputBox from "../components/InputBox";
import Button from "../Layout/Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const auth = getAuth();
  let [loading, setLoading] = useState(false);
  let [show, setShow] = useState(false);
  let navigate = useNavigate();

  const reGexEmail =
    /[a-zA-Z0-9]{0,}([.]?[a-zA-Z0-9]{1,})[@](gmail.com|hotmail.com|yahoo.com)/;
  const demoReGex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const reGexPass =
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

  let [info, setInfo] = useState({
    email: "",
    name: "",
    password: "",
  });

  let [regErr, setRegErr] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
    setRegErr({ ...regErr, [e.target.name]: "" });
  };

  let handleSignUp = () => {
    if (!info.email) {
      setRegErr({ ...regErr, email: "Email is required" });
    } else if (!demoReGex.test(info.email)) {
      setRegErr({ ...regErr, email: "Please Enter a valid email" });
    } else if (!info.name) {
      setRegErr({ ...regErr, name: "Please enter your name" });
    } else if (!info.password) {
      setRegErr({ ...regErr, password: "please enter a password" });
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, info.email, info.password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser).then(() => {
            setLoading(false);
            toast.success(
              "Registration successful, please check your email to verify your account",
              {
                position: "top-center",
                autoClose: 3000,
                theme: "dark",
              }
            );
            setInfo({ email: "", name: "", password: "" });
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error.message);
          if (error.message.includes("email-already-in-use")) {
            setRegErr({ ...regErr, email: "This email is already exist." });
            setLoading(false);
          }
        });
    }
  };

  return (
    <>
      <div className="mt-14 bg-white w-[600px] mx-auto text-center py-10 rounded-2xl">
        <HeadingBox
          heading={"Get started with easily register"}
          pera={"Free register and you can enjoy it"}
        />
       <div className="mt-14">
       <div className="flex flex-col justify-center items-center gap-y-[42px] mb-[50px]">
          <div>
            <InputBox
              value={info.email}
              name={"email"}
              onChange={handleChange}
              label={"Email Addres"}
              type={"Email"}
            />
            {regErr.email && (
              <p className="bg-red-600 text-white text-base font-normal">
                {regErr.email}
              </p>
            )}
          </div>

          <div>
            <InputBox
              value={info.name}
              name={"name"}
              onChange={handleChange}
              label={"Full Name"}
              type={"text"}
            />
            {regErr.name && (
              <p className="bg-red-600 text-white text-base font-normal">
                {regErr.name}
              </p>
            )}
          </div>
          <div className="relative">
            {show ? (
              <p
                className="absolute top-[50%] translate-y-[-50%] right-5 z-50 text-2xl"
                onClick={() => setShow(!show)}
              >
                <IoMdEyeOff />
              </p>
            ) : (
              <p className="absolute top-[50%] translate-y-[-50%] right-5 z-50 text-2xl">
                <IoMdEye onClick={() => setShow(!show)} />
              </p>
            )}
            <div>
              <InputBox
                value={info.password}
                name={"password"}
                onChange={handleChange}
                label={"Password"}
                type={show ? "text" : "password"}
              />
              {regErr.password && (
                <p className="bg-red-600 text-white text-base font-normal">
                  {regErr.password}
                </p>
              )}
            </div>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center">
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
          <Button text={"Sign Up"} onClick={handleSignUp} />
        )}
       </div>
      </div>
    </>
  );
};

export default Registration;
