"use client";

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <h1> Welcome </h1>
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create a Job Posting</h2>

        {success && (
          <div className="bg-green-100 text-green-800 text-sm p-2 rounded-lg text-center">
            ✅ Job created successfully!
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-800 text-sm p-2 rounded-lg text-center">
            ❌ {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <textarea
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-200"
        >
          Submit Job
        </button>
      </div>
    </div>
  );
}
