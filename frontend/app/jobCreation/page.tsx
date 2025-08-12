"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShineBorder } from "@/components/magicui/shine-border";
import { useJobs } from "@/hooks/job";
import { useState } from "react";
import { toast } from "react-toastify";

export default function JobCreation() {
  const { createJob } = useJobs();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [company, setCompany] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await createJob({ title, description, salary, company, location });
      console.log("The job was created successfully", res);
      setSuccess(true);
      setError("");
      toast.success("Job Created Successfully");
      // Reset form
      setTitle("");
      setDescription("");
      setLocation("");
      setSalary("");
      setCompany("");
    } catch (err) {
      console.error("There was an error creating the job", err);
      setSuccess(false);
      setError("Failed to create job. Please try again.");
    }
  };

  return (
 <div className="flex  items-center justify-center  relative top-20 bg-black">
     <Card className="relative overflow-hidden max-w-[350px] w-full">
      <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
      <CardHeader>
        <CardTitle>Hello User You Can Create Jobs Here!</CardTitle>
       <CardDescription>
  {success ? (
    <p>Job Created Successfully</p>
  ) : (
    <p>Failed to Create Job</p>
  )}
</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-4 justify-center">
            <div className="grid gap-2">
              <Label >Job Title</Label>
              <Input id="text" type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Job Description</Label>
              <Input id="text" type="text" value={description} onChange={(e)=>setDescription(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Location</Label>
              <Input id="text" type="text" value={location} onChange={(e)=>setLocation(e.target.value)}/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Salary</Label>
              <Input id="text" type="text" value={salary} onChange={(e)=>setSalary(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label >Company</Label>
              <Input id="text" type="text" value={company} onChange={(e)=>setCompany(e.target.value)} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit}>Create</Button>
      </CardFooter>
    </Card>

 </div>
  );
}
