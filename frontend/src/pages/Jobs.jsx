import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";


export default function Jobs() {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const handleCityChange = (city) => {
    if (city === "All") {
      setCity("");
    } else {
      setCity(city);
    }
    setSelectedCity(city);
  };

  const handleNicheChange = (niche) => {
    if (niche === "All") {
      setNiche("");
    } else {
      setNiche(niche);
    }
    setSelectedNiche(niche);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    dispatch(fetchJobs(city, niche, searchKeyword));
  }, [dispatch, error, city, niche]);

  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  };

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
  ];

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
  ];

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-14">
      <h1 className="text-3xl font-bold mb-8">Job Listings</h1>
      
      <div className="mb-6 flex gap-4">
        <Input
          type="text"
          placeholder="Search jobs..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch}>Find Job</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4 space-y-6">
          <div className="md:hidden space-y-4">
            <Select value={city} onValueChange={(value) => handleCityChange(value)}>
            <SelectTrigger className="appearance-none">
                <SelectValue placeholder="Filter By City" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={niche} onValueChange={(value) => handleNicheChange(value)}>
            <SelectTrigger className="appearance-none">
                <SelectValue placeholder="Filter By Niche" />
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
          <div className="hidden md:block space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Filter Job By City</h2>
              <RadioGroup value={selectedCity} onValueChange={handleCityChange}>
                {cities.map((city) => (
                  <div className="flex items-center space-x-2" key={city}>
                    <RadioGroupItem value={city} id={`city-${city}`} />
                    <Label htmlFor={`city-${city}`}>{city}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Filter Job By Niche</h2>
              <RadioGroup value={selectedNiche} onValueChange={handleNicheChange}>
                {nichesArray.map((niche) => (
                  <div className="flex items-center space-x-2" key={niche}>
                    <RadioGroupItem value={niche} id={`niche-${niche}`} />
                    <Label htmlFor={`niche-${niche}`}>{niche}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/4">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
    {jobs && jobs.map((job) => (
      <Card key={job._id} className="p-4 bg-gradient-to-br from-blue-100 ">
        <CardHeader>
          <CardTitle className="text-lg font-bold">{job.title}</CardTitle>
          {job.hiringMultipleCandidates === 'Yes' ? (
            <p className="text-green-600 font-semibold">Hiring Multiple Candidates</p>
          ) : (
            <p className="text-blue-600 font-semibold">Hiring</p>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">{job.companyName}</p>
          <p className="text-sm text-gray-500">{job.location}</p>
          <p className="text-sm font-semibold mt-2">Salary: Rs. {job.salary}</p>
          <p className="text-sm text-gray-500">Posted On: {job.jobPostedOn.substring(0, 10)}</p>
          <div className="mt-4">
            <Link to={`/post/application/${job._id}`}>
              <Button size="sm">Apply Now</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
</div>

      </div>
    </div>
  )
}
