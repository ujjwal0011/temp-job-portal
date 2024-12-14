import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, postJob, resetJobSlice } from "../store/slices/jobSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const JobPost = () => {
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [offers, setOffers] = useState("");
  const [jobNiche, setJobNiche] = useState("");
  const [salary, setSalary] = useState("");
  const [hiringMultipleCandidates, setHiringMultipleCandidates] = useState("");
  const [personalWebsiteTitle, setPersonalWebsiteTitle] = useState("");
  const [personalWebsiteUrl, setPersonalWebsiteUrl] = useState("");

  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  const cities = [
    "Bengaluru",
    "Hyderabad",
    "Chennai",
    "Pune",
    "Mumbai",
    "Delhi",
    "Noida",
    "Gurgaon",
    "Kolkata",
    "Ahmedabad",
    "Chandigarh",
    "Jaipur",
    "Kochi",
    "Trivandrum",
    "Indore",
    "Nagpur",
    "Vadodara",
    "Coimbatore",
    "Mysore",
    "Visakhapatnam",
  ];

  const { loading, error, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  const handlePostJob = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("jobType", jobType);
    formData.append("location", location);
    formData.append("companyName", companyName);
    formData.append("introduction", introduction);
    formData.append("responsibilities", responsibilities);
    formData.append("qualifications", qualifications);
    offers && formData.append("offers", offers);
    formData.append("jobNiche", jobNiche);
    formData.append("salary", salary);
    hiringMultipleCandidates &&
      formData.append("hiringMultipleCandidates", hiringMultipleCandidates);
    personalWebsiteTitle &&
      formData.append("personalWebsiteTitle", personalWebsiteTitle);
    personalWebsiteUrl &&
      formData.append("personalWebsiteUrl", personalWebsiteUrl);

    dispatch(postJob(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
  }, [dispatch, error, message]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6">Post A Job</h3>

      <div className="space-y-4">
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job Title" />

        <Label>Job Type</Label>
        <Select value={jobType} onValueChange={setJobType}>
          <SelectTrigger>
            <SelectValue placeholder="Select Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Internship">Internship</SelectItem>
          </SelectContent>
        </Select>

        <Label>Location (City)</Label>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city, index) => (
              <SelectItem key={index} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label>Company Name</Label>
        <Input
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
        />

        <Label>Company/Job Introduction</Label>
        <Textarea
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          placeholder="Company / Job Introduction"
          rows={5}
        />

        <Label>Responsibilities</Label>
        <Textarea
          value={responsibilities}
          onChange={(e) => setResponsibilities(e.target.value)}
          placeholder="Job Responsibilities"
          rows={5}
        />

        <Label>Qualifications</Label>
        <Textarea
          value={qualifications}
          onChange={(e) => setQualifications(e.target.value)}
          placeholder="Required Qualifications"
          rows={5}
        />

        <Label>What We Offer (Optional)</Label>
        <Textarea
          value={offers}
          onChange={(e) => setOffers(e.target.value)}
          placeholder="What are we offering in return!"
          rows={5}
        />

        <Label>Job Niche</Label>
        <Select value={jobNiche} onValueChange={setJobNiche}>
          <SelectTrigger>
            <SelectValue placeholder="Select Job Niche" />
          </SelectTrigger>
          <SelectContent>
            {nichesArray.map((niche, index) => (
              <SelectItem key={index} value={niche}>
                {niche}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label>Salary</Label>
        <Input
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="50000 - 800000"
        />

        <Label>Hiring Multiple Candidates?</Label>
        <Select value={hiringMultipleCandidates} onValueChange={setHiringMultipleCandidates}>
          <SelectTrigger>
            <SelectValue placeholder="Yes or No" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectContent>
        </Select>

        <Label>Personal Website Name (Optional)</Label>
        <Input
          value={personalWebsiteTitle}
          onChange={(e) => setPersonalWebsiteTitle(e.target.value)}
          placeholder="Website Name"
        />

        <Label>Personal Website Link (Optional)</Label>
        <Input
          value={personalWebsiteUrl}
          onChange={(e) => setPersonalWebsiteUrl(e.target.value)}
          placeholder="https://example.com"
        />

        <Button
          onClick={handlePostJob}
          disabled={loading}
          className="w-full mt-4 flex justify-center items-center gap-2"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
          )}
          {loading ? "Posting..." : "Post Job"}
        </Button>
      </div>
    </div>
  );
};

export default JobPost;
