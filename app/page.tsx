import { Heart, Users, BookOpen, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import JoinForm from "@/components/join-form"
import HeaderWithScroll from "@/components/header-with-scroll"
import { ReactNode } from "react"

export default function HERNetworkingHub() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <HeaderWithScroll />

      {/* Hero Section */}
      <section className="py-12 px-6 bg-pink-500 text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">HERNetworking Hub 💼✨</h1>
            <h2 className="text-xl md:text-2xl font-medium bg-pink-600 inline-block px-4 py-2 rounded-lg">
              A Powerful Community for Women in Business
            </h2>
            <p className="text-lg">
              Welcome to <span className="font-bold">HERNetworking Hub</span>, a space where ambitious women{" "}
              <span className="font-bold bg-pink-600 px-2 py-1 rounded">connect, collaborate, and thrive</span>{" "}
              together.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-6">
        {/* Introduction */}
        <section className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-lg text-pink-800 mb-4">
            Whether you're already running a business or just taking the first steps toward your entrepreneurial dreams,
            this is where you'll find the <span className="font-bold">support, resources, and sisterhood</span> to make
            it happen!
          </p>
          <p className="text-lg text-pink-800">
            We believe in{" "}
            <span className="font-bold bg-pink-200 px-2 py-1 rounded">collaboration over competition</span>, in lifting
            each other up, and in creating a network where every woman{" "}
            <span className="font-bold">feels seen, heard, and empowered</span>.
          </p>
        </section>

        {/* Benefits */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-pink-600 inline-flex items-center">
              <Heart className="mr-2 h-6 w-6" /> Why Join HERNetworking Hub?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BenefitCard
              icon={<Users className="h-8 w-8 text-pink-500" />}
              title="Authentic Connections"
              description="Surround yourself with supportive women who truly get you."
            />
            <BenefitCard
              icon={<BookOpen className="h-8 w-8 text-pink-500" />}
              title="Business Growth & Mentorship"
              description="Get insights from experienced entrepreneurs and industry leaders."
            />
            <BenefitCard
              icon={<Zap className="h-8 w-8 text-pink-500" />}
              title="Masterclasses & Resources"
              description="Learn about marketing, sales, branding, mindset, and business strategies."
            />
          </div>
        </section>

        {/* This is for you if... */}
        <section className="mb-12 bg-pink-100 py-8 px-6 rounded-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-pink-600">This is for you if...</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            <ForYouItem text="You dream of starting a business but don't know where to begin." />
            <ForYouItem text="You're an entrepreneur looking to expand your network and grow." />
            <ForYouItem text="You crave a community of women who inspire and support each other." />
          </div>
        </section>

        {/* CTA Section with Form */}
        <section id="join-form-section" className="text-center max-w-3xl mx-auto bg-gradient-to-r from-pink-500 to-pink-400 p-6 rounded-xl text-white">
          <h2 className="text-2xl font-bold mb-6">🚀 Join HERNetworking Hub & Start Your Business Journey!</h2>

          <JoinForm />

          <p className="text-lg mt-6">💡 Let's build, grow, and succeed together. The best time to start is NOW!</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-pink-600 text-white py-6 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-xl font-bold mb-2">HERNetworking Hub</h2>
          <p className="mb-4">A Powerful Community for Women in Business & Aspiring Entrepreneurs</p>
          <p className="text-sm">{'Copyright ' + new Date().getFullYear()} HERNetworking Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

interface BenefitCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

// Component for benefit cards
function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <Card className="border-pink-200 hover:border-pink-400 transition-colors">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 bg-pink-100 p-3 rounded-full">{icon}</div>
          <h3 className="text-xl font-bold text-pink-700 mb-2">{title}</h3>
          <p className="text-pink-800">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

interface ForYouItemProps {
  text: string;
}

// Component for "This is for you if..." items
function ForYouItem({ text }: ForYouItemProps) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-3">
        <span className="inline-block bg-pink-400 text-white rounded-full p-1">✨</span>
      </div>
      <p className="text-lg text-pink-800">
        {text.split(" ").map((word: string, i: number) => {
          if (text.includes("expand your network") && word === "expand") {
            return (
              <span key={i} className="font-bold bg-pink-200 px-1 rounded">
                {word}{" "}
              </span>
            )
          }
          return <span key={i}>{word} </span>
        })}
      </p>
    </div>
  )
}
