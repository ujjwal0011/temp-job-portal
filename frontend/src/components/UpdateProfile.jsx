'use client'

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import {
  clearAllUpdateProfileErrors,
  updateProfile,
} from "../store/slices/updateProfileSlice"
import { toast } from "react-toastify"
import { getUser } from "../store/slices/userSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, FileText, Briefcase } from 'lucide-react'

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user)
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  )

  const dispatch = useDispatch()
  const navigateTo = useNavigate()

  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [address, setAddress] = useState(user?.address || "")
  const [coverLetter, setCoverLetter] = useState(user?.coverLetter || "")
  const [firstNiche, setFirstNiche] = useState(user?.niches?.firstNiche || "")
  const [secondNiche, setSecondNiche] = useState(user?.niches?.secondNiche || "")
  const [thirdNiche, setThirdNiche] = useState(user?.niches?.thirdNiche || "")
  const [resume, setResume] = useState(null)
  const [resumePreview, setResumePreview] = useState(user?.resume?.url || "")

  const handleUpdateProfile = () => {
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("phone", phone)
    formData.append("address", address)
    if (user?.role === "Job Seeker") {
      formData.append("firstNiche", firstNiche)
      formData.append("secondNiche", secondNiche)
      formData.append("thirdNiche", thirdNiche)
      formData.append("coverLetter", coverLetter)
    }
    if (resume) {
      formData.append("resume", resume)
    }
    dispatch(updateProfile(formData))
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllUpdateProfileErrors())
    }
    if (isUpdated) {
      toast.success("Profile Updated.")
      dispatch(getUser())
      dispatch(clearAllUpdateProfileErrors())
    }
  }, [dispatch, error, isUpdated, user])

  const resumeHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setResumePreview(reader.result)
      setResume(file)
    }
  }

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

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
        <CardTitle className="text-3xl font-bold">Update Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        <div className="space-y-6">
          <ProfileField icon={User} label="Full Name" value={name} onChange={setName} />
          <ProfileField icon={Mail} label="Email Address" value={email} onChange={setEmail} type="email" />
          <ProfileField icon={Phone} label="Phone Number" value={phone} onChange={setPhone} type="tel" />
          <ProfileField icon={MapPin} label="Address" value={address} onChange={setAddress} />
        </div>

        {user?.role === "Job Seeker" && (
          <>
            <Separator className="my-8" />
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold flex items-center text-gray-800">
                <Briefcase className="mr-3" />
                My Preferred Job Niches
              </h3>
              {[
                { value: firstNiche, setter: setFirstNiche, label: "Primary Niche" },
                { value: secondNiche, setter: setSecondNiche, label: "Secondary Niche" },
                { value: thirdNiche, setter: setThirdNiche, label: "Tertiary Niche" },
              ].map((niche, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`niche-${index}`} className="text-sm font-medium text-gray-700">
                    {niche.label}
                  </Label>
                  <Select
                    onValueChange={niche.setter}
                    defaultValue={niche.value}
                  >
                    <SelectTrigger id={`niche-${index}`} className="w-full">
                      <SelectValue placeholder={`Select ${niche.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {nichesArray.map((n, i) => (
                        <SelectItem key={i} value={n}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <Label htmlFor="coverLetter" className="text-2xl font-semibold flex items-center text-gray-800">
                <FileText className="mr-3" />
                Cover Letter
              </Label>
              <Textarea
                id="coverLetter"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={8}
                className="w-full p-3 border rounded-md text-gray-800"
                placeholder="Write your cover letter here..."
              />
            </div>

            <div className="space-y-4">
              <Label htmlFor="resume" className="text-2xl font-semibold flex items-center text-gray-800">
                <FileText className="mr-3" />
                Upload Resume
              </Label>
              <Input 
                id="resume" 
                type="file" 
                onChange={resumeHandler}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {resumePreview && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Current Resume:</p>
                  <Link
                    to={resumePreview}
                    target="_blank"
                    className="text-blue-500 hover:text-blue-700 underline transition-colors duration-200"
                  >
                    View Resume
                  </Link>
                </div>
              )}
            </div>
          </>
        )}

        <div className="pt-6">
          <Button
            onClick={handleUpdateProfile}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
          >
            {loading ? "Updating..." : "Save Changes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const ProfileField = ({ icon: Icon, label, value, onChange, type = "text" }) => (
  <div className="space-y-2">
    <Label htmlFor={label} className="text-sm font-medium text-gray-700 flex items-center">
      <Icon className="mr-2 h-5 w-5" />
      {label}
    </Label>
    <Input
      id={label}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border rounded-md text-gray-800"
    />
  </div>
)

export default UpdateProfile

