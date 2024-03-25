/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import HeadingBox from "../components/HeadingBox";
import InputBox from "../components/InputBox";
import Button from "../Layout/Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  // =========reGax data=======
  const reGexEmail =
    /[a-zA-Z0-9]{0,}([.]?[a-zA-Z0-9]{1,})[@](gmail.com|hotmail.com|yahoo.com)/;
  const demoReGex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const reGexPass =
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
  // =========reGax data=======

  const auth = getAuth();
  let navigate = useNavigate();
  let [showPass, setShowPass] = useState(false);
  let [loading, setLoading] = useState(false);
  const provider = new GoogleAuthProvider();

  let [logData, setLogData] = useState({
    email: "",
    password: "",
  });

  let [logErr, setLogErr] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogData({ ...logData, [e.target.name]: e.target.value });
    setLogErr({ ...logErr, [e.target.name]: "" });
  };

  // ======login step start =======

  const handleSignIn = () => {
    setLoading(true);
    if (!logData.email) {
      setLogErr({ ...logErr, email: "Email is required" });
    } else if (!demoReGex.test(logData.email)) {
      setLogErr({ ...logErr, email: "Please enter a valid email." });
    } else if (!logData.password) {
      setLogErr({ ...logErr, password: "please Enter your password." });
    } else {
      signInWithEmailAndPassword(auth, logData.email, logData.password)
        .then((userCredential) => {
          if (!userCredential.user.emailVerified) {
            toast.error("Email is not verified", {
              position: "top-center",
              autoClose: 3000,
              theme: "dark",
            });
          } else {
            setLoading(false);
            toast.success("Login Successful", {
              position: "top-center",
              autoClose: 3000,
              theme: "dark",
            });
            setLogData({ email: "", password: "" });
            setTimeout(() => {
              navigate("/feed");
            }, 2000);
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (error.message.includes("invalid-credential")) {
            toast.error("Invalid email or password", {
              position: "top-center",
              autoClose: 3000,
              theme: "dark",
            });
            setLoading(false);
          }
        });
    }
  };
  // ======login step end =======

  // =======login with google start =======
  const handleGLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/feed");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // =======login with google end =======
  return (
    <>
      <div className="mt-14 bg-white w-[600px] mx-auto text-center py-10 rounded-2xl">
        <HeadingBox
          heading={"Login"}
          pera={"Free register and you can enjoy it"}
        />
        <div className="flex justify-center my-10">
          <div className="text-4xl">
            <FcGoogle className="cursor-pointer" onClick={handleGLogin} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-[25px] mb-[50px]">
          <div>
            <InputBox
              value={logData.email}
              onChange={handleChange}
              name={"email"}
              label={"Email Addres"}
              type={"Email"}
            />
            {logErr && (
              <p className="bg-red-600 text-white text-base font-normal">
                {logErr.email}
              </p>
            )}
          </div>

          <div></div>
          <div className="relative">
            {showPass ? (
              <p className="absolute top-[50%] translate-y-[-50%] right-5 z-50 text-2xl">
                <IoMdEyeOff onClick={() => setShowPass(!showPass)} />
              </p>
            ) : (
              <p className="absolute top-[50%] translate-y-[-50%] right-5 z-50 text-2xl">
                <IoMdEye onClick={() => setShowPass(!showPass)} />
              </p>
            )}
            <div>
              <InputBox
                value={logData.password}
                onChange={handleChange}
                name={"password"}
                label={"Password"}
                type={showPass ? "text" : "password"}
              />
              {logErr && (
                <p className="bg-red-600 text-white text-base font-normal">
                  {logErr.password}
                </p>
              )}
            </div>
          </div>
        </div>
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
          <Button onClick={handleSignIn} text={"Sign In"} />
        )}
        <div>
          <Link className="font-nunito font-semibold cursor-pointer mt-5 inline-block text-secondary text-base">
            Forgot Password
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
