// //title        String
//   description  String
//   location     String
//   company      String
//   salary       Int?
import { PrismaClient } from '../generated/prisma/index.js';

const prisma =  new PrismaClient();
export const postanewjob = async(req,res)=>{
const {title,description,location,company,salary} = req.body;
try{
if(!title||!description||!location||!company||!salary){
  return res.status(400).json({message:"Please fill all the fields"});
}
    const newjob = await  prisma.job.create({
        data:{
            title,
            description,
            location,
            company,
            salary
        }
    });
  return res.json({
  message: "Job created successfully",
  job: {
    title: newjob.title,
    description: newjob.description,
    location: newjob.location
  }
});
}
catch(error){
    console.error('there is a error in creating a job',error);
}
}

export const getAlljobs = async(req,res)=>{
    
    try {
      const jobs = await prisma.job.findMany();
      if(!jobs){
        "there are no jobs right now "
      }
      return res.json({"all jobs fetched successfully":"JOBS",jobs});
         
    } catch (error) {
        
        console.error("there was a error in fetching the jobs",error);

    }

};

export const deleteJobs = async(req,res)=>{

    try {
        const deletedJob = await prisma.job.delete({
  where: { id: "job-id" },
});
return res.json("the jobs was successfully deleted ",deletedJob);
    } catch (error) {
        
    }
}