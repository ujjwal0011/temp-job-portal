"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/jobs", label: "JOBS" },
    ...(isAuthenticated
      ? [{ href: "/dashboard", label: "DASHBOARD" }]
      : [{ href: "/login", label: "LOGIN" }]),
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md shadow-md z-50 font-poppins">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16 relative">
          {/* Logo */}
          <Link to="/" className="absolute left-4 flex items-center space-x-2">
            <img src="/logo.png" alt="logo" className="w-10 h-10" />
            <h4 className="text-xl font-semibold text-gray-800">Job Portal</h4>
          </Link>

          {/* Centered Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Button key={item.href} variant="ghost" asChild>
                <Link to={item.href}>{item.label}</Link>
              </Button>
            ))}
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="absolute right-4 md:hidden">
                <GiHamburgerMenu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    variant="ghost"
                    asChild
                    onClick={() => setOpen(false)}
                  >
                    <Link to={item.href}>{item.label}</Link>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
