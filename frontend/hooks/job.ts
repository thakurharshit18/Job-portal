import axios from "axios";
import { useState } from "react";

export interface Job {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
}

export const useJobs = () => {
  const [loading, setLoading] = useState(false);

  const createJob = async (data: Job): Promise<Job> => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post<Job>(
        "https://job-portal-kjrs.onrender.com/api/jobs/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error: any) {
      console.error("Error creating job:", error?.response?.data || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getJob = async (): Promise<Job[]> => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get<{ jobs: Job[] }>("https://job-portal-kjrs.onrender.com/api/jobs/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.jobs;
    } catch (error: any) {
      console.error("There was an error accessing the jobs:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createJob,
    getJob,
    loading,
  };
};
