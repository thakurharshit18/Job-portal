"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useJobs } from "@/hooks/job";

type Job = {
  _id?: string;
  id?: string;
  title: string;
  company: string;
  location: string;
  salary: string;
};

export default function JobsDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const router = useRouter();
  const { getJob } = useJobs();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getJob();
        setJobs(res);
      } catch (err) {
        console.error("There was an error fetching the jobs:", err);
        setError("Failed to load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [jobs]);
  const handlenavigation = ()=>{
    router.push("/jobCreation");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Explore Jobs
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {jobs.map((job) => (
            <div
              key={job._id || job.id}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300 border border-gray-100"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {job.title}
              </h2>
              <p className="text-sm text-gray-500 mb-1">{job.company}</p>
              <p className="text-sm text-gray-600 mb-3">
                📍 {job.location}
              </p>
              <p className="text-lg font-medium text-green-600 mb-4">
                💰 {job.salary}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400"> </span>
                <button onClick={()=>router.push(`jobsdashboard/${job.id}`)} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg">
                  View Job
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button onClick={handlenavigation}>
        Create Jobs
      </button>
    </div>
  );
}
