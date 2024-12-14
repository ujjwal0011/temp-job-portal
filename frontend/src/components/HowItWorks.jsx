import React from "react";
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"; // Ensure correct import paths for shadcn

const HowItWorks = () => {
  return (
    <section className="py-12 px-6 bg-gray-50">
      <h3 className="text-center text-3xl font-semibold text-gray-800 mb-10">How does it work?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Create an Account */}
        <Card className="bg-white shadow-md rounded-lg">
          <CardContent className="p-6 text-center">
            <div className="icon text-4xl mb-4">
              <LuUserPlus />
            </div>
            <CardTitle className="text-xl font-bold text-gray-800">Create an Account</CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Sign up for a free account as a job seeker or employer. Set up your
              profile in minutes to start posting jobs or applying for jobs.
              Customize your profile to highlight your skills or requirements.
            </CardDescription>
          </CardContent>
        </Card>

        {/* Post or Browse Jobs */}
        <Card className="bg-white shadow-md rounded-lg">
          <CardContent className="p-6 text-center">
            <div className="icon text-4xl mb-4">
              <VscTasklist />
            </div>
            <CardTitle className="text-xl font-bold text-gray-800">Post or Browse Jobs</CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Employers can post detailed job descriptions, and job seekers can
              browse a comprehensive list of available positions. Utilize filters
              to find jobs that match your skills and preferences.
            </CardDescription>
          </CardContent>
        </Card>

        {/* Hire or Get Hired */}
        <Card className="bg-white shadow-md rounded-lg">
          <CardContent className="p-6 text-center">
            <div className="icon text-4xl mb-4">
              <BiSolidLike />
            </div>
            <CardTitle className="text-xl font-bold text-gray-800">Hire or Get Hired</CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Employers can shortlist candidates and extend job offers. Job
              seekers can review job offers and accept positions that align with
              their career goals.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HowItWorks;
