'use client'

import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  clearAllUpdateProfileErrors,
  updatePassword,
} from "../store/slices/updateProfileSlice"
import { getUser } from "../store/slices/userSlice"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Lock, KeyRound, Save } from 'lucide-react'

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  })

  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  )

  const dispatch = useDispatch()

  const handleUpdatePassword = () => {
    const formData = new FormData()
    formData.append("oldPassword", oldPassword)
    formData.append("newPassword", newPassword)
    formData.append("confirmPassword", confirmPassword)
    dispatch(updatePassword(formData))
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllUpdateProfileErrors())
    }
    if (isUpdated) {
      toast.success("Password Updated")
      dispatch(getUser())
      dispatch(clearAllUpdateProfileErrors())
    }
  }, [dispatch, error, isUpdated])

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  return (
    <Card className="max-w-md mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-gray-100">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-gray-800">Update Password</CardTitle>
        <CardDescription className="text-center text-gray-600">
          Ensure your account is using a long, random password to stay secure.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Password */}
        <div className="space-y-2">
          <Label htmlFor="oldPassword" className="text-sm font-medium text-gray-700">Current Password</Label>
          <div className="relative">
            <Input
              id="oldPassword"
              type={showPassword.old ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter current password"
              className="pr-10 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => togglePasswordVisibility('old')}
            >
              {showPassword.old ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">New Password</Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showPassword.new ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="pr-10 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => togglePasswordVisibility('new')}
            >
              {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showPassword.confirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className="pr-10 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => togglePasswordVisibility('confirm')}
            >
              {showPassword.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleUpdatePassword}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating...
            </>
          ) : (
            <>
              <Save size={20} className="mr-2" />
              Update Password
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

export default UpdatePassword

