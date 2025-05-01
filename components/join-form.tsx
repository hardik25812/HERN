"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ButtonCta } from "@/components/ui/button-cta"
// TextEffect removed as requested
import { Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"

export default function JoinForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("") 
  const [phone, setPhone] = useState("")
  const [profession, setProfession] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [instagram, setInstagram] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")
    
    // Basic validation
    if (!name || !email) {
      setError("Name and email are required fields.")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }

    setIsSubmitting(true)

    const formData = {
      name,
      email,
      phone,
      profession,
      linkedin,
      instagram
    }

    try {
      console.log("Submitting form data:", formData);
      
      // Using the Google Apps Script URL to connect to your Google Sheet
      // Using the Google Apps Script URL to connect to your Google Sheet
      const response = await fetch("https://script.google.com/macros/s/AKfycbyNpwlmEj-vQitiwEJEGdBQao7lMKfJcgd4M-seCaDtJi-tOMDkTOiUzEOB3knF4r0ZFg/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        mode: "cors", // Try with cors mode first
        redirect: "follow"
      }).catch(error => {
        console.log("Initial fetch failed, trying with no-cors:", error);
        // Fall back to no-cors if cors fails
        return fetch("https://script.google.com/macros/s/AKfycbyNpwlmEj-vQitiwEJEGdBQao7lMKfJcgd4M-seCaDtJi-tOMDkTOiUzEOB3knF4r0ZFg/exec", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          mode: "no-cors"
        });
      });

      console.log("Form submission response:", response);
      setMessage("Your information has been submitted! Check your email for a confirmation.")
      
      // Reset form fields after successful submission
      setName("")
      setEmail("")
      setPhone("")
      setProfession("")
      setLinkedin("")
      setInstagram("")
    } catch (error) {
      setError("There was an error submitting your information. Please try again.")
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl">
      {message ? (
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
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
          <p className="text-pink-600 mt-2">
            <span className="font-medium">✉️ Check your inbox:</span> We've sent a confirmation email to your registered email address.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-red-100 border-red-400 border p-2 rounded-md text-red-700">{error}</div>}
          
          <div className="space-y-2">
            <Label htmlFor="name" className="text-pink-700 font-medium">
              Your Name
            </Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/80 border-pink-200 text-gray-900"
              placeholder="Your Name*"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-pink-700 font-medium">
              Email Address
            </Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/80 border-pink-200 text-gray-900"
              placeholder="Your Email*"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-pink-700 font-medium">
              Phone Number
            </Label>
            <Input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-white/80 border-pink-200 text-gray-900"
              placeholder="Your Phone Number"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="profession" className="text-pink-700 font-medium">
              Profession
            </Label>
            <Input
              type="text"
              id="profession"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="bg-white/80 border-pink-200 text-gray-900"
              placeholder="Your Profession"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="linkedin" className="text-pink-700 font-medium">
              LinkedIn Profile
            </Label>
            <Input
              type="text"
              id="linkedin"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="bg-white/80 border-pink-200 text-gray-900"
              placeholder="LinkedIn URL"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="instagram" className="text-pink-700 font-medium">
              Instagram Handle
            </Label>
            <Input
              type="text"
              id="instagram"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="bg-white/80 border-pink-200 text-gray-900"
              placeholder="@yourusername"
            />
          </div>
          
          <ButtonCta 
            type="submit" 
            className="w-full py-6" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              <div className="flex items-center justify-center">
                <span className="text-white">Join the Waitlist 👭</span>
              </div>
            )}
          </ButtonCta>
        </form>
      )}
    </div>
  )
}
