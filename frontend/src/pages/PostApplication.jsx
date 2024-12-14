"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import {
  clearAllApplicationErrors,
  postApplication,
  resetApplicationSlice,
} from "@/store/slices/applicationSlice";
import { fetchSingleJob } from "@/store/slices/jobSlice";

export default function PostApplication() {
  const { singleJob } = useSelector((state) => state.jobs);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector((state) => state.applications);

  const { jobId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);

  const dispatch = useDispatch();

  const handlePostApplication = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(postApplication(formData, jobId));
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setCoverLetter(user.coverLetter || "");
    }
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchSingleJob(jobId));
  }, [dispatch, error, message, jobId, user]);

  const qualifications = singleJob.qualifications ? singleJob.qualifications.split(". ") : [];
  const responsibilities = singleJob.responsibilities ? singleJob.responsibilities.split(". ") : [];
  const offering = singleJob.offers ? singleJob.offers.split(". ") : [];

  const resumeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setResume(file);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Application Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePostApplication} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Job Title</label>
                <Input type="text" placeholder={singleJob.title} disabled />
              </div>
              <div>
                <label className="text-sm font-medium">Your Name</label>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium">Your Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium">Address</label>
                <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              {user && user.role === "Job Seeker" && (
                <>
                  <div>
                    <label className="text-sm font-medium">Cover Letter</label>
                    <Textarea
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      rows={5}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Resume</label>
                    <Input type="file" onChange={resumeHandler} />
                  </div>
                </>
              )}
              {isAuthenticated && user.role === "Job Seeker" && (
                <Button type="submit" disabled={loading}>
                  Apply
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{singleJob.title}</CardTitle>
            {singleJob.personalWebsite && (
              <Link href={singleJob.personalWebsite.url} target="_blank" className="text-blue-500 hover:underline">
                {singleJob.personalWebsite.title}
              </Link>
            )}
            <p className="text-sm text-gray-500">{singleJob.location}</p>
            <p className="text-sm font-medium">Rs. {singleJob.salary} a month</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Job details</h3>
              <div className="flex items-center space-x-2">
                <IoMdCash className="text-gray-500" />
                <div>
                  <span className="text-sm font-medium">Pay</span>
                  <span className="text-sm text-gray-500 block">{singleJob.salary} a month</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <FaToolbox className="text-gray-500" />
                <div>
                  <span className="text-sm font-medium">Job type</span>
                  <span className="text-sm text-gray-500 block">{singleJob.jobType}</span>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <div className="flex items-center space-x-2">
                <FaLocationDot className="text-gray-500" />
                <span className="text-sm">{singleJob.location}</span>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2">Full Job Description</h3>
              <p className="text-sm">{singleJob.introduction}</p>
              {singleJob.qualifications && (
                <div className="mt-4">
                  <h4 className="text-md font-semibold mb-2">Qualifications</h4>
                  <ul className="list-disc list-inside text-sm">
                    {qualifications.map((element) => (
                      <li key={element}>{element}</li>
                    ))}
                  </ul>
                </div>
              )}
              {singleJob.responsibilities && (
                <div className="mt-4">
                  <h4 className="text-md font-semibold mb-2">Responsibilities</h4>
                  <ul className="list-disc list-inside text-sm">
                    {responsibilities.map((element) => (
                      <li key={element}>{element}</li>
                    ))}
                  </ul>
                </div>
              )}
              {singleJob.offers && (
                <div className="mt-4">
                  <h4 className="text-md font-semibold mb-2">Offering</h4>
                  <ul className="list-disc list-inside text-sm">
                    {offering.map((element) => (
                      <li key={element}>{element}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <div>
              <h3 className="text-lg font-semibold mb-2">Job Niche</h3>
              <p className="text-sm">{singleJob.jobNiche}</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
