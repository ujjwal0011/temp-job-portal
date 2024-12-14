'use client';

import React from 'react';
import { Link } from 'react-router-dom';
// import Image from 'next/image';
import { useSelector } from 'react-redux';
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaYoutube,
  FaLinkedin,
} from 'react-icons/fa6';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-transparent border-none shadow-none">
            <CardContent className="p-0">
              {/* <Image src="/logo.png" alt="logo" width={150} height={50} /> */}
            </CardContent>
          </Card>

          <Card className="bg-transparent border-none shadow-none">
            <CardHeader className="p-0">
              <CardTitle className="text-lg font-semibold mb-2">Support</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="space-y-2 text-sm">
                <li>Address: No. 21, MG Road, Near Brigade Road, Bangalore, Karnataka, India - 560001</li>
                <li>doejohn67711@gmail.com</li>
                <li>+91 8288665190</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-none shadow-none">
            <CardHeader className="p-0">
              <CardTitle className="text-lg font-semibold mb-2">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-blue-600 hover:underline">Home</Link>
                </li>
                <li>
                  <Link to="/jobs" className="text-blue-600 hover:underline">Jobs</Link>
                </li>
                {isAuthenticated && (
                  <li>
                    <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-none shadow-none">
            <CardHeader className="p-0">
              <CardTitle className="text-lg font-semibold mb-2">Follow Us</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <FaSquareXTwitter className="text-xl" />
                    <span>Twitter (X)</span>
                  </Link>
                </li>
                <li>
                  <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <FaSquareInstagram className="text-xl" />
                    <span>Instagram</span>
                  </Link>
                </li>
                <li>
                  <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <FaYoutube className="text-xl" />
                    <span>Youtube</span>
                  </Link>
                </li>
                <li>
                  <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <FaLinkedin className="text-xl" />
                    <span>LinkedIn</span>
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <Separator />
      <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
        &copy; Copyright 2024. All Rights Reserved By Ujjwal
      </div>
    </footer>
  );
};

export default Footer;
