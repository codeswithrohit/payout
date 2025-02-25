"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
     const authValue = crypto.randomUUID();
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [showpassword, setShowPassword] = useState(false);

     const loginEmail = process.env.NEXT_PUBLIC_LOGIN_EMAIL;
     const loginPassword = process.env.NEXT_PUBLIC_LOGIN_PASSWORD;

     const handleSubmit = async (e) => {
          e.preventDefault();

          if (!email || !password) {
               toast.error("Please enter email and password");
               return;
          }

          if (email !== loginEmail) {
               toast.error("Invalid email");
               return;
          }
          if (password !== loginPassword) {
               toast.error("Invalid password");
               return;
          }

          sessionStorage.setItem("auth", authValue);
          toast.success("Login successful");
          redirect("/admin");
     };

     return (
          <>
               <ToastContainer />
               <div className="h-screen grid place-items-center login-page-bg">
                    <div className="lg:px-24 lg:py-12 px-8 py-6 shadow-[8px_8px_0_1px_rgb(0,0,0,1)] bg-white rounded-xl grid place-content-center gap-4">
                         <h1 className="text-2xl text-center font-bold">
                              Admin Login
                         </h1>

                         <div className="flex flex-col space-y-2 w-full">
                              <label
                                   htmlFor="email"
                                   className="bg-slate-100 rounded-md  flex items-center w-full"
                              >
                                   <input
                                        className="bg-slate-100 border-none  px-4 py-2 w-full"
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Email"
                                        onChange={(e) =>
                                             setEmail(e.target.value)
                                        }
                                        required
                                   />
                              </label>
                              <label
                                   htmlFor="password"
                                   className="bg-slate-100 rounded-md  flex items-center relative"
                              >
                                   <input
                                        className="bg-slate-100 border-none  px-4 py-2 w-full"
                                        type={
                                             showpassword ? "text" : "password"
                                        }
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        onChange={(e) =>
                                             setPassword(e.target.value)
                                        }
                                        required
                                   />
                                   <span className="absolute right-3">
                                        <button
                                             onClick={() =>
                                                  setShowPassword(!showpassword)
                                             }
                                        >
                                             {showpassword ? "Hide" : "Show"}
                                        </button>
                                   </span>
                              </label>
                              <button
                                   className="w-full bg-[#004aad] text-white px-4 py-2 rounded-md "
                                   type="submit"
                                   onClick={(e) => handleSubmit(e)}
                              >
                                   Login
                              </button>
                         </div>
                    </div>
               </div>
          </>
     );
};

export default Login;
