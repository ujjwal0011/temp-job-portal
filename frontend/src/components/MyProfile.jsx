import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            value={user?.name || ""}
            disabled
            readOnly
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={user?.email || ""}
            disabled
            readOnly
          />
        </div>
        {user?.role === "Job Seeker" && (
          <div className="space-y-2">
            <Label>My Preferred Job Niches</Label>
            <div className="space-y-2">
              <Input
                type="text"
                value={user?.niches?.firstNiche || ""}
                disabled
                readOnly
              />
              <Input
                type="text"
                value={user?.niches?.secondNiche || ""}
                disabled
                readOnly
              />
              <Input
                type="text"
                value={user?.niches?.thirdNiche || ""}
                disabled
                readOnly
              />
            </div>
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={user?.phone || ""}
            disabled
            readOnly
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            type="text"
            value={user?.address || ""}
            disabled
            readOnly
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            type="text"
            value={user?.role || ""}
            disabled
            readOnly
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="joinedOn">Joined On</Label>
          <Input
            id="joinedOn"
            type="text"
            value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}
            disabled
            readOnly
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MyProfile;