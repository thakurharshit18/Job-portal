"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useJobs } from "@/hooks/job";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
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
  const { data: session } = useSession();

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
  }, [getJob]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-6">
      {/* Top Navbar */}
      <header className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto mb-10 bg-white shadow-md rounded-xl px-6 py-4">
        <div className="flex items-center gap-4">
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt="Profile picture"
              className="w-12 h-12 rounded-full border shadow-sm"
              width={48}
              height={48}
            />
          )}
          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              Welcome, {session?.user?.name}
            </h1>
            <p className="text-sm text-gray-500">{session?.user?.email}</p>
          </div>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button
            onClick={() => router.push("/jobcreation")}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-5 rounded-lg shadow-md transition"
          >
            + Create Job
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-5 rounded-lg shadow-md transition"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Jobs Section */}
      <main className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Explore Opportunities 🚀
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">
            Loading jobs...
          </p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500">
            No jobs available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <div
                key={job._id || job.id}
                className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-transform duration-300"
              >
                {/* Job Title */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {job.title}
                </h3>

                {/* Company */}
                <p className="text-sm text-gray-500 mb-1">{job.company}</p>

                {/* Location */}
                <p className="text-sm text-gray-600 mb-3">📍 {job.location}</p>

                {/* Salary */}
                <p className="text-lg font-medium text-green-600 mb-6">
                  💰 {job.salary}
                </p>

                {/* Action */}
                <button
                  onClick={() => router.push(`jobsdashboard/${job.id}`)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md transition"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
