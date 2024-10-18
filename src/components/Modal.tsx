"use client";
import { useUser } from "@clerk/nextjs";
import React, {  useEffect, useState } from "react";
import { Resources } from "@prisma/client";
import { useRouter } from "next/navigation";

import { SiNike } from "react-icons/si";

const Modal = ({
  item,
data,
mutate

}: {
  item: number;
  mutate:any
  data: Resources[];
}) => {
  const date = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const options = { month: "long" };
  const days = daysOfWeek[date.getDay()];
  const year = date.getFullYear();
  const monthName = date.toLocaleDateString("en-US", options);

  const [open, setOpen] = useState(false);
  const [resource, setResource] = useState("");

  const now = new Date();
  const router = useRouter();



  


  const handleCreate = async (item: number) => {
    try {
      const res = await fetch("http://localhost:3000/api/resource", {
        method: "POST",
        headers: {
          "Content-Type": "Application/Json",
        },
        body: JSON.stringify({ resource, time: item }),
      });
     mutate()
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  function functionOne(num: number) {
    return data?.find(
      (item) => item.resource === "resourceone" && item.time === num
    );
  }
  function functionTwo(num: number) {
    return data?.find(
      (item) => item.resource === "resourcetwo" && item.time === num
    );
  }
  function functionThree(num: number) {
    return data?.find(
      (item) => item.resource === "resourcethree" && item.time === num
    );
  }


const use = useUser()


if(!use){
    return null
}

// const[myData,setMydata]= useState([])
// useEffect(()=>{
//     setMydata( data?.filter(item => item?.userId === use?.user?.id))
// },[data,use.user?.id] )
const [myData, setMyData] = useState([]);

useEffect(() => {
  if (data && use?.user?.id) {
    const filteredData:any = data.filter(item => item?.userId === use.user.id);
    setMyData(filteredData);
  }
}, [data, use?.user?.id]);
  


  

  return (
    <div key={item} className="w-full ">
      <div
        className={`${
          now - 3600000 < now &&
          new Date(now.getFullYear(), now.getMonth(), now.getDate(), item, 0) <
            now
            ? "pointer-events-none cursor-not-allowed "
            : ""
        }  flex items-center w-full   gap-5`}
        onClick={() => setOpen(true)}
        style={{
          backgroundColor:
            now - 3600000 < now &&
            new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate(),
              item,
              0
            ) < now
              ? "#d4cbb2  "
              : "",
        }}
      >
        <div className={` ${""}  flex items-center w-full   gap-5 no-scrollbar`}>
          <span className=" flex-1 font-medium tracking-widest py-2 px-1">
            {item.toString().length > 1 ? item + ":00" : "0" + item + ":00"}
          </span>
          <div className="flex flex-[3]  gap-5 items-center justify-start">
            <div
              style={{ backgroundColor: functionOne(item) ? "red" : "green" }}
              className={` w-3 h-3  rounded-full `}
            />
            <div
              style={{ backgroundColor: functionTwo(item) ? "red" : "green" }}
              className={` w-3 h-3  rounded-full `}
            />
            <div
              style={{ backgroundColor: functionThree(item) ? "red" : "green" }}
              className={` w-3 h-3  rounded-full `}
            />
          </div>
        </div>
      </div>
      {open && (
        <div className=" absolute w-full  flex  justify-center  h-full left-0  top-0 mx-auto">
          <div className="w-[100%]   bg-slate-100 rounded-b-lg p-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-10">
              <h2 className="text-xl hidden md:block text-green-800 font-semibold">
                New Reservation  
              </h2>
                            <span className="text-base  text-green-800 font-semibold">{item} oclock</span>
                </div>
              <span
                className="font-bold cursor-pointer"
                onClick={() => setOpen(false)}
              >
                X
              </span>
            </div>
            <p className="my-3 hidden md:block">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio,
              dicta odio reprehenderit error harum ab enim obcaecati natus ipsa
              rerum!
            </p>
            <div className="flex gap-8  flex-col md:flex-row  items-center">

              <div className="">
                <p
                  className={`${functionOne(item)?"line-through":""} text-center capitalize font-light text-sm `}
                >
                  free
                </p>
                <div
                  onClick={() => setResource("resourceone")}
                  className={`${functionOne(item)?"bg-red-600 pointer-events-none":"bg-green-700"}    cursor-pointer text-white h-[80px] w-[80px] flex-col rounded-md text-center flex items-center justify-center text-sm`}
                >

                  Resource 1
                  {resource ==="resourceone" &&<SiNike/>}
                </div>
              </div>

              <div className="">
                <p
                  className={`${functionTwo(item)?"line-through":""} text-center capitalize font-light text-sm `}
                >
                  free
                </p>
                <div
                  onClick={() => {
                    setResource("resourcetwo");
                  }}
                  className={`${functionTwo(item)?"bg-red-600 pointer-events-none":"bg-green-700"}   cursor-pointer  text-white h-[80px] w-[80px] flex-col rounded-md text-center flex items-center justify-center text-sm`}
                >
                  Resource 2
                  {resource ==="resourcetwo" &&<SiNike/>}
                </div>
              </div>


              <div className="">
                <p
                  className={`${functionThree(item)?"line-through":""} text-center capitalize font-light text-sm `}
                >
                  free
                </p>
                <div
                  onClick={() => setResource("resourcethree")}
                  className={`${functionThree(item)?"bg-red-600 pointer-events-none":"bg-green-700"} cursor-pointer  text-white h-[80px] w-[80px] flex-col rounded-md text-center flex items-center justify-center text-sm`}
                >
                  Resource 3
                  {resource ==="resourcethree" &&<SiNike/>}
                </div>
              </div>


              <button
             disabled={myData?.length >=2 }
                type="submit"
                className="bg-green-800 text-white capitalize  py-2 px-4  cursor-pointer rounded-md tracking-wider disabled:bg-red-400 disabled:cursor-not-allowed"
                onClick={() => {handleCreate(item),setOpen(false),setResource("")}}
              >
                submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
