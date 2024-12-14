import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  deleteJob,
  getMyJobs,
  resetJobSlice,
} from "../store/slices/jobSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Spinner from "../components/Spinner";

const MyJobs = () => {
  const { loading, error, myJobs, message } = useSelector(
    (state) => state.jobs
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
    dispatch(getMyJobs());
  }, [dispatch, error, message]);

  const handleDeleteJob = (id) => {
    dispatch(deleteJob(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : myJobs && myJobs.length === 0 ? (
        <h1 className="text-xl font-semibold text-center">
          You have not posted any job!
        </h1>
      ) : (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-center">My Jobs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myJobs.map((job) => (
              <Card key={job._id} className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {job.title}
                  </CardTitle>
                  <CardDescription>{job.companyName}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>
                    <span className="font-medium">Niche: </span>
                    {job.jobNiche}
                  </p>
                  <p>
                    <span className="font-medium">Salary: </span>
                    {job.salary}
                  </p>
                  <p>
                    <span className="font-medium">Location: </span>
                    {job.location}
                  </p>
                  <p>
                    <span className="font-medium">Type: </span>
                    {job.jobType}
                  </p>
                  <p>
                    <span className="font-medium">Introduction: </span>
                    {job.introduction}
                  </p>
                  <p>
                    <span className="font-medium">Qualifications: </span>
                    {job.qualifications}
                  </p>
                  <p>
                    <span className="font-medium">Responsibilities: </span>
                    {job.responsibilities}
                  </p>
                  {job.offers && (
                    <p>
                      <span className="font-medium">Offers: </span>
                      {job.offers}
                    </p>
                  )}
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteJob(job._id)}
                    >
                      Delete Job
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyJobs;
