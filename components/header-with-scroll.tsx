"use client"

import { Button } from "@/components/ui/button"

export default function HeaderWithScroll() {
  const scrollToForm = () => {
    document.getElementById('join-form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-pink-500 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">HERNetworking Hub</h1>
        <Button 
          className="bg-white text-pink-500 hover:bg-pink-100" 
          onClick={scrollToForm}
        >
          Join Now
        </Button>
      </div>
    </header>
  );
}
