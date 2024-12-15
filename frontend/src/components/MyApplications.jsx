'use client'

import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import {
  clearAllApplicationErrors,
  resetApplicationSlice,
  deleteApplication,
  fetchJobSeekerApplications,
} from "../store/slices/applicationSlice"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Building, Mail, Phone, MapPin, FileText, Trash2, ExternalLink } from 'lucide-react'
import Spinner from "../components/Spinner"

const MyApplications = () => {
  const { loading, error, applications, message } = useSelector(
    (state) => state.applications
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchJobSeekerApplications())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllApplicationErrors())
    }
    if (message) {
      toast.success(message)
      dispatch(resetApplicationSlice())
      dispatch(fetchJobSeekerApplications())
    }
  }, [dispatch, error, message])

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <Spinner />
      ) : applications && applications.length === 0 ? (
        <h1 className="text-2xl font-semibold text-center text-gray-700">
          You have not applied for any job.
        </h1>
      ) : (
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-center text-gray-800">
            My Job Applications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((application) => (
              <Card key={application._id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <CardTitle className="text-xl">{application.jobInfo.jobTitle}</CardTitle>
                  <CardDescription className="text-gray-100">
                    <Building className="inline-block mr-2" size={16} />
                    {application.jobSeekerInfo.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <Mail className="mr-2" size={16} />
                      <span>{application.jobSeekerInfo.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="mr-2" size={16} />
                      <span>{application.jobSeekerInfo.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="mr-2" size={16} />
                      <span>{application.jobSeekerInfo.address}</span>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                        <FileText className="mr-2" size={16} />
                        Cover Letter
                      </h4>
                      <ScrollArea className="h-24 rounded-md border p-2">
                        <p className="text-gray-600">{application.jobSeekerInfo.coverLetter}</p>
                      </ScrollArea>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 flex justify-between items-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteApplication(application._id)}
                    className="flex items-center"
                  >
                    <Trash2 className="mr-2" size={16} />
                    Delete
                  </Button>
                  <Link
                    to={application.jobSeekerInfo && application.jobSeekerInfo.resume.url}
                    target="_blank"
                  >
                    <Button size="sm" variant="outline" className="flex items-center">
                      <ExternalLink className="mr-2" size={16} />
                      View Resume
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MyApplications

