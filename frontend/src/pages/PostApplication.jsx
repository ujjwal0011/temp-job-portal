'use client'

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Briefcase, DollarSign, MapPin, FileText, LinkIcon, Clock } from 'lucide-react'
import {
  clearAllApplicationErrors,
  postApplication,
  resetApplicationSlice,
} from "@/store/slices/applicationSlice"
import { fetchSingleJob } from "@/store/slices/jobSlice"

export default function PostApplication() {
  const { singleJob } = useSelector((state) => state.jobs)
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const { loading, error, message } = useSelector((state) => state.applications)

  const { jobId } = useParams()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [coverLetter, setCoverLetter] = useState("")
  const [resume, setResume] = useState(null)

  const dispatch = useDispatch()

  const handlePostApplication = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("phone", phone)
    formData.append("address", address)
    formData.append("coverLetter", coverLetter)
    if (resume) {
      formData.append("resume", resume)
    }
    dispatch(postApplication(formData, jobId))
  }

  useEffect(() => {
    if (user) {
      setName(user.name || "")
      setEmail(user.email || "")
      setPhone(user.phone || "")
      setAddress(user.address || "")
      setCoverLetter(user.coverLetter || "")
    }
    if (error) {
      toast.error(error)
      dispatch(clearAllApplicationErrors())
    }
    if (message) {
      toast.success(message)
      dispatch(resetApplicationSlice())
    }
    dispatch(fetchSingleJob(jobId))
  }, [dispatch, error, message, jobId, user])

  const qualifications = singleJob.qualifications ? singleJob.qualifications.split(". ") : []
  const responsibilities = singleJob.responsibilities ? singleJob.responsibilities.split(". ") : []
  const offering = singleJob.offers ? singleJob.offers.split(". ") : []

  const resumeHandler = (e) => {
    const file = e.target.files?.[0]
    if (file) setResume(file)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl mt-14">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Job Application</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Application Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePostApplication} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input id="jobTitle" type="text" value={singleJob.title} disabled className="bg-gray-100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              {user && user.role === "Job Seeker" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Cover Letter</Label>
                    <Textarea
                      id="coverLetter"
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      rows={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resume">Resume</Label>
                    <Input id="resume" type="file" onChange={resumeHandler} />
                  </div>
                </>
              )}
              {isAuthenticated && user.role === "Job Seeker" && (
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{singleJob.title}</CardTitle>
            {singleJob.personalWebsite && (
              <Link to={singleJob.personalWebsite.url} target="_blank" className="text-blue-600 hover:underline flex items-center">
                <LinkIcon className="w-4 h-4 mr-1" />
                {singleJob.personalWebsite.title}
              </Link>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                {singleJob.location}
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="w-4 h-4 mr-1" />
                Rs. {singleJob.salary} a month
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                {singleJob.jobType}
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2">Job Description</h3>
              <p className="text-sm text-gray-600">{singleJob.introduction}</p>
            </div>
            {qualifications.length > 0 && (
              <div>
                <h4 className="text-md font-semibold mb-2">Qualifications</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {qualifications.map((element, index) => (
                    <li key={index}>{element}</li>
                  ))}
                </ul>
              </div>
            )}
            {responsibilities.length > 0 && (
              <div>
                <h4 className="text-md font-semibold mb-2">Responsibilities</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {responsibilities.map((element, index) => (
                    <li key={index}>{element}</li>
                  ))}
                </ul>
              </div>
            )}
            {offering.length > 0 && (
              <div>
                <h4 className="text-md font-semibold mb-2">What We Offer</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {offering.map((element, index) => (
                    <li key={index}>{element}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <h3 className="text-lg font-semibold mb-2">Job Niche</h3>
              <div className="flex items-center text-sm text-gray-600">
                <Briefcase className="w-4 h-4 mr-2" />
                {singleJob.jobNiche}
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

