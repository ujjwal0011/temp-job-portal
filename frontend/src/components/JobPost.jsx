'use client'

import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { clearAllJobErrors, postJob, resetJobSlice } from "../store/slices/jobSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from 'lucide-react'

const JobPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    jobType: "",
    location: "",
    companyName: "",
    introduction: "",
    responsibilities: "",
    qualifications: "",
    offers: "",
    jobNiche: "",
    salary: "",
    hiringMultipleCandidates: "",
    personalWebsiteTitle: "",
    personalWebsiteUrl: "",
  })

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
  ]

  const cities = [
    "Bengaluru", "Hyderabad", "Chennai", "Pune", "Mumbai", "Delhi", "Noida", "Gurgaon",
    "Kolkata", "Ahmedabad", "Chandigarh", "Jaipur", "Kochi", "Trivandrum", "Indore",
    "Nagpur", "Vadodara", "Coimbatore", "Mysore", "Visakhapatnam",
  ]

  const { loading, error, message } = useSelector((state) => state.jobs)
  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePostJob = () => {
    const formDataToSend = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value)
    })
    dispatch(postJob(formDataToSend))
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllJobErrors())
    }
    if (message) {
      toast.success(message)
      dispatch(resetJobSlice())
    }
  }, [dispatch, error, message])

  const isFormValid = () => {
    const requiredFields = ['title', 'jobType', 'location', 'companyName', 'introduction', 'responsibilities', 'qualifications', 'jobNiche', 'salary']
    return requiredFields.every(field => formData[field])
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Post A Job</CardTitle>
          <CardDescription>Fill in the details to post a new job opportunity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. Senior React Developer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobType">Job Type</Label>
              <Select value={formData.jobType} onValueChange={(value) => handleSelectChange("jobType", value)}>
                <SelectTrigger id="jobType">
                  <SelectValue placeholder="Select Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="location">Location (City)</Label>
              <Select value={formData.location} onValueChange={(value) => handleSelectChange("location", value)}>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="e.g. Tech Innovations Inc." />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="introduction">Company/Job Introduction</Label>
            <Textarea
              id="introduction"
              name="introduction"
              value={formData.introduction}
              onChange={handleInputChange}
              placeholder="Briefly describe the company and the job role"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibilities">Responsibilities</Label>
            <Textarea
              id="responsibilities"
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleInputChange}
              placeholder="List the key responsibilities for this role"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="qualifications">Qualifications</Label>
            <Textarea
              id="qualifications"
              name="qualifications"
              value={formData.qualifications}
              onChange={handleInputChange}
              placeholder="List the required qualifications for this role"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="offers">What We Offer (Optional)</Label>
            <Textarea
              id="offers"
              name="offers"
              value={formData.offers}
              onChange={handleInputChange}
              placeholder="Describe the benefits and perks offered with this position"
              rows={4}
            />
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="jobNiche">Job Niche</Label>
              <Select value={formData.jobNiche} onValueChange={(value) => handleSelectChange("jobNiche", value)}>
                <SelectTrigger id="jobNiche">
                  <SelectValue placeholder="Select Job Niche" />
                </SelectTrigger>
                <SelectContent>
                  {nichesArray.map((niche) => (
                    <SelectItem key={niche} value={niche}>
                      {niche}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">Salary Range</Label>
              <Input id="salary" name="salary" value={formData.salary} onChange={handleInputChange} placeholder="e.g. 50,000 - 80,000" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="hiringMultipleCandidates">Hiring Multiple Candidates?</Label>
              <Select value={formData.hiringMultipleCandidates} onValueChange={(value) => handleSelectChange("hiringMultipleCandidates", value)}>
                <SelectTrigger id="hiringMultipleCandidates">
                  <SelectValue placeholder="Yes or No" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="personalWebsiteTitle">Personal Website Name (Optional)</Label>
              <Input
                id="personalWebsiteTitle"
                name="personalWebsiteTitle"
                value={formData.personalWebsiteTitle}
                onChange={handleInputChange}
                placeholder="e.g. Company Blog"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="personalWebsiteUrl">Personal Website Link (Optional)</Label>
              <Input
                id="personalWebsiteUrl"
                name="personalWebsiteUrl"
                value={formData.personalWebsiteUrl}
                onChange={handleInputChange}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <Button
            onClick={handlePostJob}
            disabled={loading || !isFormValid()}
            className="w-full mt-6"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting...
              </>
            ) : (
              "Post Job"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default JobPost

