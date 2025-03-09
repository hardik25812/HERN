"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

export default function JoinForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedin: "",
    instagram: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!formData.name || !formData.email || !formData.linkedin || !formData.instagram) {
      setError("Please fill in all fields")
      return
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)

    try {
      // Submit to API endpoint
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      // Save form data to localStorage as backup
      localStorage.setItem("herNetworkingFormData", JSON.stringify(formData))
      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (err) {
      console.error("Error submitting form:", err)
      setError("Something went wrong. Please try again.")
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="bg-white p-6 rounded-xl">
        <div className="text-center">
          <div className="mx-auto mb-4 bg-pink-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-pink-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-pink-700 mb-2">You're In!</h3>
          <p className="text-pink-600">
            Thank you for joining HERNetworking Hub! We're excited to have you as part of our community.
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="bg-white p-6 rounded-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="name" className="text-pink-700 font-medium">
            Your Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="border-pink-200 focus:border-pink-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-pink-700 font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className="border-pink-200 focus:border-pink-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin" className="text-pink-700 font-medium">
            LinkedIn Profile
          </Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="linkedin.com/in/yourprofile"
            className="border-pink-200 focus:border-pink-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="instagram" className="text-pink-700 font-medium">
            Instagram Handle
          </Label>
          <Input
            id="instagram"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            placeholder="@yourusername"
            className="border-pink-200 focus:border-pink-400"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white py-5 rounded-lg font-bold text-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Join the Community"}
        </Button>
      </form>
    </Card>
  )
}
