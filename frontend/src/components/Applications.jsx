import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

import {
  clearAllApplicationErrors,
  deleteApplication,
  fetchEmployerApplications,
  resetApplicationSlice,
} from "@/store/slices/applicationSlice";

const Applications = () => {
  const { applications, loading, error, message } = useSelector((state) => state.applications);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchEmployerApplications());
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-20 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (applications && applications.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-lg">You have no applications from job seekers.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Applications For Your Posted Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((element) => (
          <Card key={element._id}>
            <CardHeader>
              <CardTitle>{element.jobInfo.jobTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <span className="font-semibold">Applicant's Name:</span> {element.jobSeekerInfo.name}
              </p>
              <p>
                <span className="font-semibold">Applicant's Email:</span> {element.jobSeekerInfo.email}
              </p>
              <p>
                <span className="font-semibold">Applicant's Phone:</span> {element.jobSeekerInfo.phone}
              </p>
              <p>
                <span className="font-semibold">Applicant's Address:</span> {element.jobSeekerInfo.address}
              </p>
              <div>
                <span className="font-semibold">Applicant's Cover Letter:</span>
                <Textarea
                  defaultValue={element.jobSeekerInfo.coverLetter}
                  rows={5}
                  readOnly
                  className="mt-2"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="destructive" onClick={() => handleDeleteApplication(element._id)}>
                Delete Application
              </Button>
              <Button>
                <a
                  href={element.jobSeekerInfo && element.jobSeekerInfo.resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  View Resume
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Applications;
