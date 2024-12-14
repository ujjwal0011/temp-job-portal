import React from "react"
import { Card, CardContent } from "@/components/ui/card"

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 mt-14">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">
          Find Your Dream Job Today
        </h1>
        <h4 className="text-xl md:text-2xl text-center mb-8">
          Connecting Talent with Opportunities Across the Nation for Every Skill
          Level
        </h4>
        <Card className="bg-white/10 backdrop-blur-lg border-none max-w-3xl mx-auto">
          <CardContent className="p-6">
            <p className="text-center text-lg">
              Explore a vast array of job listings in diverse industries. Whether
              you're a seasoned professional or just starting out, find the perfect
              role to advance your career. Our platform makes job searching easy and
              efficient, bringing you closer to your next big opportunity.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default Hero

