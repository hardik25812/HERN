"use client"

import { Button } from "@/components/ui/button"

export default function HeaderWithScroll() {
  // Function to scroll to the form section
  const scrollToForm = () => {
    document.getElementById('join-form-section')?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  return (
    <header className="py-4 px-6 bg-black text-white sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Empty space where logo/text was */}
          </div>
          <Button
            onClick={scrollToForm}
            className="bg-pink-600 hover:bg-pink-700"
          >
            Join Now
          </Button>
        </div>
      </div>
    </header>
  )
}
