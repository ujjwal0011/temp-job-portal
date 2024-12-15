'use client'

import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Twitter, Instagram, Youtube, Linkedin, MapPin, Mail, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user)

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/jobs', label: 'Jobs' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    ...(isAuthenticated ? [{ href: '/dashboard', label: 'Dashboard' }] : []),
  ]

  const socialLinks = [
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
    { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  ]

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Job Portal Logo" className="w-10 h-10" />
              <span className="text-2xl font-bold text-gray-900">Job Portal</span>
            </Link>
            <p className="text-sm text-gray-600">
              Connecting talented professionals with exciting career opportunities.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <link.icon className="w-5 h-5" />
                  <span className="sr-only">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-base text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                <span>21 MG Road, Near Brigade Road, Bangalore, Karnataka, India - 560001</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-gray-400" />
                <a href="mailto:contact@jobportal.com" className="hover:text-gray-900 transition-colors">
                  contact@jobportal.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-gray-400" />
                <a href="tel:+918288665190" className="hover:text-gray-900 transition-colors">
                  +91 8288665190
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Stay Updated
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to our newsletter for the latest job opportunities and career insights.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full"
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Separator />
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Job Portal. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer

