import prisma from "@/components/prisma"
import { NextRequest, NextResponse } from "next/server"






export const GET = async(req:NextRequest,{params}:{params:{userId:string}})=>{
    try {
       const {userId} = params
    
       console.log(userId)
       
       const resourceCreated = await prisma.resources.findMany({
        where:{
            userId
        }
       })
     
       
       
        return new NextResponse(JSON.stringify(resourceCreated),{status:200})
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({message:"can not create resource"}),{status:500})
    }
    }