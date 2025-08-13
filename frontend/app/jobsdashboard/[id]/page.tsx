"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Job {
  title: string;
  description: string;
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

  if (!job) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-white">{job.title}</h1>
      <p>{job.description}</p>
    </div>
  );
}
