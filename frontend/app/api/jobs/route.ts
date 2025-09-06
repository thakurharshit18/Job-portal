import { PrismaClient } from "@/lib/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();


export async function POST(req:NextRequest){
   const body = await  req.json();
    const {title,description,location,salary,company} = body;
        try {
            const job =  await prisma.job.create({
              data:{
                title:title,
                description:description,
                location:location,
                company:company,
                salary:salary
              }
            })
            if(!job){
                return NextResponse.json({message:"there was a error in creating a new job"},{status:400});
            }
            return NextResponse.json({message:"new JOB created successfully"});

        } catch (error) {
            return NextResponse.json(error);
        }
}


export async function GET(){
  try {
    const jobs = await prisma.job.findMany();
    return NextResponse.json(jobs);
    
  } catch (error:any) {
    console.log(error);
    return NextResponse.json({message:"Error Fetching Jobs"},{status:500});
    
  }

}

export async function DELETE(req:NextRequest,{params}:{params:{id:string}}){
  const {id} = params;
  try {
    const deletedJobs = await prisma.job.delete({
      where:{
        id:id
      }
    });
    
    return NextResponse.json({ message: "Job deleted", deletedJobs });
  } catch (error) {
    return NextResponse.json({message:"there was a error in deleting the jobs"});
  }
}