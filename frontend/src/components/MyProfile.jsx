'use client'

import React from "react"
import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Tag } from 'lucide-react'

const MyProfile = () => {
  const { user } = useSelector((state) => state.user)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-3xl font-bold">{user?.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <ProfileItem icon={Mail} label="Email Address" value={user?.email} />
          <ProfileItem icon={Phone} label="Phone Number" value={user?.phone || 'Not provided'} />
          <ProfileItem icon={MapPin} label="Address" value={user?.address || 'Not provided'} />
          <ProfileItem icon={Calendar} label="Joined On" value={user?.createdAt ? formatDate(user.createdAt) : 'Unknown'} />
        </div>

        {user?.role === "Job Seeker" && (
          <>
            <Separator className="my-6" />
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center justify-center">
                <Tag className="w-5 h-5 mr-2" />
                My Preferred Job Niches
              </h3>
              <div className="space-y-3">
                {['firstNiche', 'secondNiche', 'thirdNiche'].map((niche, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-gray-500">Niche {index + 1}</Label>
                    <Badge variant="outline" className="text-sm py-1 px-3">
                      {user?.niches?.[niche] || 'Not set'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

const ProfileItem = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col space-y-1">
    <Label className="text-sm font-medium text-gray-500">{label}</Label>
    <div className="flex items-center space-x-2">
      <Icon className="w-5 h-5 text-gray-400" />
      <span className="text-lg">{value}</span>
    </div>
  </div>
)

export default MyProfile

