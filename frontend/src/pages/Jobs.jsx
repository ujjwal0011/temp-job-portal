'use client'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, Briefcase, DollarSign, Calendar, Users } from 'lucide-react'

export default function Jobs() {
  const [city, setCity] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [niche, setNiche] = useState("")
  const [selectedNiche, setSelectedNiche] = useState("")
  const [searchKeyword, setSearchKeyword] = useState("")

  const { jobs, loading, error } = useSelector((state) => state.jobs)

  const handleCityChange = (city) => {
    if (city === "All") {
      setCity("")
    } else {
      setCity(city)
    }
    setSelectedCity(city)
  }

  const handleNicheChange = (niche) => {
    if (niche === "All") {
      setNiche("")
    } else {
      setNiche(niche)
    }
    setSelectedNiche(niche)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllJobErrors())
    }
    dispatch(fetchJobs(city, niche, searchKeyword))
  }, [dispatch, error, city, niche])

  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, searchKeyword))
  }

  const cities = [
    "All",
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
  ]

  const nichesArray = [
    "All",
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
    <div className="bg-gray-50 min-h-screen mt-14">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800">
        Discover Your Next Career Opportunity
        </h1>

        <div className="mb-8 flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="relative w-full md:w-96">
            <Input
              type="text"
              placeholder="Search jobs..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Button 
            onClick={handleSearch}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300 ease-in-out"
          >
            Find Job
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4 space-y-6">
            <Card className="bg-white shadow-md rounded-md overflow-hidden">
              <CardHeader className="bg-gray-100 border-b border-gray-200 p-4">
                <CardTitle className="text-xl font-semibold text-gray-800">Filters</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div>
                  <h2 className="text-lg font-semibold mb-2 text-gray-700">City</h2>
                  <Select value={selectedCity} onValueChange={handleCityChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select City" />
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
                <div>
                  <h2 className="text-lg font-semibold mb-2 text-gray-700">Niche</h2>
                  <Select value={selectedNiche} onValueChange={handleNicheChange}>
                    <SelectTrigger className="w-full">
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
              </CardContent>
            </Card>
          </div>

          <div className="w-full lg:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : jobs && jobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {jobs.map((job) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <CardHeader className="bg-gray-50 p-4 border-b border-gray-200">
                          <CardTitle className="text-lg font-semibold text-gray-800">
                            {job.title}
                          </CardTitle>
                          {job.hiringMultipleCandidates === "Yes" ? (
                            <p className="text-green-600 font-medium flex items-center text-sm">
                              <Users className="w-4 h-4 mr-1" />
                              Hiring Multiple Candidates
                            </p>
                          ) : (
                            <p className="text-blue-600 font-medium flex items-center text-sm">
                              <Users className="w-4 h-4 mr-1" />
                              Hiring
                            </p>
                          )}
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                          <p className="text-sm text-gray-600 flex items-center">
                            <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                            {job.companyName}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                            {job.location}
                          </p>
                          <p className="text-sm font-medium flex items-center">
                            <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                            Salary: Rs. {job.salary}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            Posted: {new Date(job.jobPostedOn).toLocaleDateString()}
                          </p>
                          <div className="mt-4">
                            <Link to={`/post/application/${job._id}`}>
                              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition duration-300 ease-in-out">
                                Apply Now
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center text-gray-600 mt-12">
                No jobs found. Try adjusting your search criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

