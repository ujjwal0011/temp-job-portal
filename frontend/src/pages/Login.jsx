'use client'

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { clearAllUserErrors, login } from "../store/slices/userSlice"
import { toast } from "react-toastify"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Icons } from "@/components/ui/icons"

const Login = () => {
  const [role, setRole] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { loading, isAuthenticated, error } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigateTo = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("role", role)
    formData.append("email", email)
    formData.append("password", password)
    dispatch(login(formData))
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllUserErrors())
    }
    if (isAuthenticated) {
      navigateTo("/")
    }
  }, [dispatch, error, loading, isAuthenticated, navigateTo])

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Login As</Label>
              <Select value={role} onValueChange={(value) => setRole(value)}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Employer">Employer</SelectItem>
                  <SelectItem value="Job Seeker">Job Seeker</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
                <Icons.mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
                <Icons.lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-muted-foreground w-full">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
