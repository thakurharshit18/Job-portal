"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Job {
  title: string;
  description: string;
  location: string;
  salary: string;
  company: string;
}

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();

  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        const res = await axios.get<Job>(`http://localhost:3002/api/jobs/${id}`);
        setJob(res.data);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJob();
  }, [id]);

  if (!job)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-gray-300 text-lg animate-pulse">Loading job details...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-start py-12 px-4">
      <div className="max-w-3xl w-full bg-gray-800 rounded-2xl shadow-lg p-8 text-white">
        {/* Job Title */}
        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>

        {/* Company Info */}
        <div className="flex items-center gap-4 mb-6">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {job.company}
          </span>
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {job.location}
          </span>
          <span className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
            {job.salary}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed mb-8">{job.description}</p>

        {/* Apply Button */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-200">
          Apply Now
        </button>
      </div>
    </div>
  );
}
