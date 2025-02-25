"use client";

import { initiatePayout } from "@/services/api";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function Admin() {
     const token = process.env.NEXT_PUBLIC_PAYOUT_TOKEN_KEY;
     const [formData, setFormData] = useState({});

     useEffect(() => {
          const auth = sessionStorage.getItem("auth");
          if (!auth) {
               redirect("/");
          }
     }, []);

     const handleFormData = (e) => {
          setFormData({
               ...formData,
               [e.target.name]: e.target.value,
               mode: "imps",
               RefId: crypto.randomUUID(),
          });
     };

     async function makePayment(e) {
          e.preventDefault();
          const res = await initiatePayout(formData, token);
     }
     return (
          <>
               <ToastContainer />
               <div className="h-screen px-4 grid place-items-center login-page-bg">
                    <div className="lg:px-24 lg:py-12 px-12 py-6 shadow-[8px_8px_0_1px_rgb(0,0,0,1)] bg-white rounded-xl grid place-items-center gap-4 ">
                         <h1 className="text-2xl text-center font-bold">
                              Payout Form
                         </h1>

                         <form className="flex flex-col gap-4 admin-form !w-full">
                              <input
                                   className="bg-slate-100 px-4 py-2 w-full rounded-md"
                                   type="text"
                                   name="beneName"
                                   placeholder="Beneficiary Name"
                                   onChange={(e) => handleFormData(e)}
                              />
                              <input
                                   className="bg-slate-100 px-4 py-2 w-full rounded-md"
                                   type="number"
                                   name="accountNo"
                                   placeholder="Account Number"
                                   onChange={(e) => handleFormData(e)}
                              />
                              <input
                                   className="bg-slate-100 px-4 py-2 w-full rounded-md"
                                   type="text"
                                   name="ifsc"
                                   placeholder="IFSC code"
                                   onChange={(e) => handleFormData(e)}
                              />
                              <input
                                   className="bg-slate-100 px-4 py-2 w-full rounded-md"
                                   type="text"
                                   name="bank"
                                   placeholder="Bank Name"
                                   onChange={(e) => handleFormData(e)}
                              />
                              <input
                                   className="bg-slate-100 px-4 py-2 w-full rounded-md"
                                   type="number"
                                   name="amount"
                                   placeholder="Amount"
                                   onChange={(e) => handleFormData(e)}
                              />

                              <button
                                   className="w-full bg-[#004aad] text-white px-4 py-2 rounded-md"
                                   type="submit"
                                   onClick={(e) => makePayment(e)}
                              >
                                   Pay
                              </button>
                         </form>
                    </div>
               </div>
          </>
     );
}
