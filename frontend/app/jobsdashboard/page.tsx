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
  }, []); // FIX: remove jobs from dependency array to avoid infinite loop

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800">Explore Jobs</h1>
        <button
          onClick={() => router.push("/jobCreation")}
          className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
        >
          + Create Job
        </button>
      </div>

      {/* Loading / Error States */}
      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading jobs...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs available right now.</p>
      ) : (
        /* Job Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {jobs.map((job) => (
            <div
              key={job._id || job.id}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              {/* Job Title */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {job.title}
              </h2>

              {/* Company */}
              <p className="text-sm text-gray-500 mb-1">{job.company}</p>

              {/* Location */}
              <p className="text-sm text-gray-600 mb-3">📍 {job.location}</p>

              {/* Salary */}
              <p className="text-lg font-medium text-green-600 mb-4">
                💰 {job.salary}
              </p>

              {/* View Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => router.push(`jobsdashboard/${job.id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md transition"
                >
                  View Job
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
