import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  resetApplicationSlice,
  deleteApplication,
  fetchJobSeekerApplications,
} from "../store/slices/applicationSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Spinner from "../components/Spinner";

const MyApplications = () => {
  const { loading, error, applications, message } = useSelector(
    (state) => state.applications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobSeekerApplications());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(fetchJobSeekerApplications());
    }
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications.length === 0 ? (
        <h1 className="text-xl font-semibold text-center">
          You have not applied for any job.
        </h1>
      ) : (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-center">
            My Applications for Jobs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((application) => (
              <Card key={application._id} className="shadow-md">
                <CardHeader>
                  <CardTitle>{application.jobInfo.jobTitle}</CardTitle>
                  <CardDescription>
                    {application.jobSeekerInfo.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>
                    <span className="font-medium">Email: </span>
                    {application.jobSeekerInfo.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone: </span>
                    {application.jobSeekerInfo.phone}
                  </p>
                  <p>
                    <span className="font-medium">Address: </span>
                    {application.jobSeekerInfo.address}
                  </p>
                  <p>
                    <span className="font-medium">Cover Letter: </span>
                    <Textarea
                      value={application.jobSeekerInfo.coverLetter}
                      rows={3}
                      readOnly
                    />
                  </p>
                  <div className="flex justify-between mt-4">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteApplication(application._id)}
                    >
                      Delete Application
                    </Button>
                    <Link
                      to={
                        application.jobSeekerInfo &&
                        application.jobSeekerInfo.resume.url
                      }
                      target="_blank"
                    >
                      <Button size="sm">View Resume</Button>
                    </Link>
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

export default MyApplications;
