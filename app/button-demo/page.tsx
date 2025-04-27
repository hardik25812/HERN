"use client"

import { ButtonCtaDemo } from "@/components/button-cta-demo"
import HeaderWithScroll from "@/components/header-with-scroll"

export default function ButtonDemoPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeaderWithScroll />
      
      <div className="container mx-auto py-16">
        <h1 className="text-3xl font-bold text-pink-500 text-center mb-8">Button CTA Demo</h1>
        
        <div className="max-w-2xl mx-auto bg-gradient-to-r from-pink-900/50 to-purple-900/50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 font-serif text-amber-400 text-center">Styled Button Examples</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl text-pink-300 mb-4">Default ButtonCta</h3>
              <ButtonCtaDemo />
            </div>
            
            <div>
              <h3 className="text-xl text-pink-300 mb-4">Custom Label</h3>
              <div className="flex flex-col items-center gap-6 p-8">
                <ButtonCta label="Join Our Community" className="w-fit" />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl text-pink-300 mb-4">Full Width</h3>
              <div className="flex flex-col items-center gap-6 p-8">
                <ButtonCta label="Register Now" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Import the ButtonCta component for use in this file
import { ButtonCta } from "@/components/ui/button-cta"
