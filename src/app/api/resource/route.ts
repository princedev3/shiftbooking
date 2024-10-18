import prisma from "@/components/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export const POST = async(req:NextRequest,{params}:{params:string})=>{
try {
    const body = await req.json()
    const {userId}= auth()

    if(!userId){
        return null;
    }
   const resourceCreated = await prisma.resources.create({
    data:{
        userId,resource:body.resource.trim(),time:body.time,taken:true
    }
   })
 
   
   
    return new NextResponse(JSON.stringify({message:"can not create resource"}),{status:200})
} catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify({message:"can not create resource"}),{status:500})
}
}
export const GET = async(req:NextRequest,{params}:{params:string})=>{
try {
   

   const resourceCreated = await prisma.resources.findMany({})
 
   
   
    return new NextResponse(JSON.stringify(resourceCreated),{status:200})
} catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify({message:"can not create resource"}),{status:500})
}
}