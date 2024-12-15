'use client'

import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import {
  clearAllJobErrors,
  deleteJob,
  getMyJobs,
  resetJobSlice,
} from "../store/slices/jobSlice"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Briefcase, MapPin, DollarSign, Clock, Info, CheckSquare, ListTodo, Gift } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const MyJobs = () => {
  const { loading, error, myJobs, message } = useSelector(
    (state) => state.jobs
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllJobErrors())
    }
    if (message) {
      toast.success(message)
      dispatch(resetJobSlice())
    }
    dispatch(getMyJobs())
  }, [dispatch, error, message])

  const handleDeleteJob = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      dispatch(deleteJob(id))
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (myJobs && myJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Briefcase className="h-16 w-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-semibold text-center">
          You haven't posted any jobs yet
        </h1>
        <p className="mt-2 text-gray-600">
          Start by creating your first job posting
        </p>
        <Button className="mt-4" onClick={() => (window.location.href = '/post-job')}>
          Post a Job
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <h1 className="text-3xl font-bold text-center mb-8">My Job Postings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myJobs.map((job) => (
          <Card key={job._id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
              <CardDescription className="text-gray-600">{job.companyName}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{job.jobType}</Badge>
                <Badge variant="outline">{job.jobNiche}</Badge>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                {job.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-1" />
                {job.salary}
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="details">
                  <AccordionTrigger>Job Details</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{job.introduction}</p>
                      </div>
                      <div className="flex items-start">
                        <CheckSquare className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{job.qualifications}</p>
                      </div>
                      <div className="flex items-start">
                        <ListTodo className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{job.responsibilities}</p>
                      </div>
                      {job.offers && (
                        <div className="flex items-start">
                          <Gift className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{job.offers}</p>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteJob(job._id)}
              >
                Delete Job
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MyJobs
