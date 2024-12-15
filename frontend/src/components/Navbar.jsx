import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "@/store/slices/userSlice"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, X, ChevronDown, LogOut, User, Settings, Briefcase } from 'lucide-react'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    toast.success("Logged out successfully.")
    navigate("/login")
  }

  const navItems = [
    { href: "/", label: "Home", icon: <Briefcase className="w-4 h-4 mr-2" /> },
    { href: "/jobs", label: "Jobs", icon: <Briefcase className="w-4 h-4 mr-2" /> },
    ...(isAuthenticated
      ? [{ href: "/dashboard", label: "Dashboard", icon: <Settings className="w-4 h-4 mr-2" /> }]
      : [{ href: "/login", label: "Login", icon: <User className="w-4 h-4 mr-2" /> }]),
  ]

  const dashboardOptions = [
    { label: "Job Post", role: "Employer", query: "section=job-post" },
    { label: "My Jobs", role: "Employer", query: "section=my-jobs" },
    { label: "Applications", role: "Employer", query: "section=applications" },
    { label: "My Applications", role: "Job Seeker", query: "section=my-applications" },
  ]

  const accountOptions = [
    { label: "My Profile", role: "all", query: "section=my-profile" },
    { label: "Update Profile", role: "all", query: "section=update-profile" },
    { label: "Update Password", role: "all", query: "section=update-password" },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50 font-poppins">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="logo" className="w-8 h-8" />
            <h4 className="text-xl font-bold text-primary">Job Portal</h4>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) =>
              item.label === "Dashboard" ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center">
                      {item.icon}
                      {item.label}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {dashboardOptions
                      .filter(
                        (option) =>
                          option.role === "all" ||
                          (user && user.role === option.role)
                      )
                      .map((option) => (
                        <DropdownMenuItem
                          key={option.query}
                          onClick={() => navigate(`/dashboard?${option.query}`)}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button key={item.href} variant="ghost" asChild className="flex items-center">
                  <Link to={item.href}>
                    {item.icon}
                    {item.label}
                  </Link>
                </Button>
              )
            )}
          </div>

          {/* User Menu (Desktop) */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center">
                    <Avatar className="w-8 h-8 mr-2">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {user.name}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {accountOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.query}
                      onClick={() => navigate(`/account?${option.query}`)}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button asChild variant="default" className="hidden md:flex">
              <Link to="/login">Login</Link>
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    variant="ghost"
                    asChild
                    className="justify-start"
                    onClick={() => {
                      setOpen(false)
                      navigate(item.href)
                    }}
                  >
                    <Link to={item.href} className="flex items-center">
                      {item.icon}
                      {item.label}
                    </Link>
                  </Button>
                ))}

                {isAuthenticated && (
                  <>
                    <div className="h-px bg-border my-4" />
                    {accountOptions.map((option) => (
                      <Button
                        key={option.query}
                        variant="ghost"
                        className="justify-start"
                        onClick={() => {
                          navigate(`/account?${option.query}`)
                          setOpen(false)
                        }}
                      >
                        {option.label}
                      </Button>
                    ))}
                    <Button
                      onClick={() => {
                        handleLogout()
                        setOpen(false)
                      }}
                      variant="ghost"
                      className="justify-start text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

