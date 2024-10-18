"use client"
import Modal from "@/components/Modal";


import { UserButton } from '@clerk/nextjs'

import useSWR from "swr";

export default function Home() {

 

  const date = new Date()
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const options = { month: 'long' };
  const days= daysOfWeek[date.getDay()]
  const year= date.getFullYear()
  const monthName = date.toLocaleDateString('en-US', options);



 const fetcher = async(url:string)=>{
  try {
  const res =   await fetch(url)
   const data =  await res.json()
   return data
  } catch (error) {
    console.log(error)
  }
 }

 const { data, error, mutate,isLoading } = useSWR('http://localhost:3000/api/resource', fetcher)








 


  return (
    <>
   <div className='mx-auto w-full md:w-[60%]  relative  '>
   <div className="w-full  mx-auto relative ">
            <div className="flex flex-col w-[100%] mx-auto gap-4 bg-slate-50">
              <div className="flex items-center">
            <h2 className="mx-auto text-gray-700 text-lg w-full text-center" >Booking a laundary shift</h2>
                   <UserButton/>
              </div>
              <div className="mx-auto text-center">{ days+" "+monthName +" "+ year} </div>
            </div>
        </div>

        <div className=" w-[100%] mx-auto flex flex-col p-2 gap-3  border-2  h-[calc(100vh-80px)] overflow-y-scroll  no-scrollbar">
        
        {
           [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].map(item=>{
  
        
          return  <>
            <Modal item={item} mutate={mutate}    data={data}  />
            </>
           }
      
           )
        }

   </div>
   </div>
    </>
  );
}
