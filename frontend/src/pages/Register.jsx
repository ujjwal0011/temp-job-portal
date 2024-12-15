'use client'

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { clearAllUserErrors, register } from "../store/slices/userSlice"
import { toast } from "react-toastify"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/ui/icons"

const Register = () => {
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    firstNiche: "",
    secondNiche: "",
    thirdNiche: "",
    coverLetter: "",
    resume: null,
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

  const { loading, isAuthenticated, error } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigateTo = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }))
  }

  const handleRegister = (e) => {
    e.preventDefault()
    const formDataToSend = new FormData()
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        formDataToSend.append(key, formData[key])
      }
    })
    dispatch(register(formDataToSend))
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllUserErrors())
    }
    if (isAuthenticated) {
      navigateTo("/")
    }
  }, [dispatch, error, isAuthenticated, navigateTo])

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen px-4 py-12 mt-14">
      <Card className="w-full max-w-4xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your details to register for a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Register As</Label>
                <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Employer">Employer</SelectItem>
                    <SelectItem value="Job Seeker">Job Seeker</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                    <Icons.user className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                    <Icons.mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="123-456-7890"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                    <Icons.phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <Input
                      id="address"
                      name="address"
                      placeholder="123 Main St, City, Country"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                    <Icons.mapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                    <Icons.lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>

            {formData.role === "Job Seeker" && (
              <div className="space-y-4">
                <Separator />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {["firstNiche", "secondNiche", "thirdNiche"].map((nicheField, idx) => (
                    <div key={idx} className="space-y-2">
                      <Label htmlFor={nicheField}>{`Your ${idx + 1}${idx === 0 ? 'st' : idx === 1 ? 'nd' : 'rd'} Niche`}</Label>
                      <Select
                        value={formData[nicheField]}
                        onValueChange={(value) => handleSelectChange(nicheField, value)}
                      >
                        <SelectTrigger id={nicheField}>
                          <SelectValue placeholder="Select Niche" />
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
                  ))}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <Textarea
                    id="coverLetter"
                    name="coverLetter"
                    placeholder="Write your cover letter..."
                    rows={6}
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resume">Upload Resume</Label>
                  <Input id="resume" name="resume" type="file" onChange={handleFileChange} />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-muted-foreground w-full">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Register
