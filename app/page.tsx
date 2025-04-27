import { Heart, Users, BookOpen, Zap, ArrowUpRight, Shield, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import JoinForm from "@/components/join-form"
import HeaderWithScroll from "@/components/header-with-scroll"
import { ReactNode } from "react"

export default function HERNetworkingHub() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <HeaderWithScroll />

      {/* Hero Section */}
      <section className="py-12 px-6 bg-black text-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-pink-500 text-center">
                HERNETWORKING HUB
              </h1>
              <p className="text-lg mt-2 font-cursive text-pink-300">
                Network . Grow . Succeed
              </p>
              <h2 className="text-xl md:text-2xl font-medium bg-pink-600 inline-block px-4 py-2 rounded-lg mt-3">
                Ambitious Women Deserve Powerful Networks
              </h2>
            </div>
            <p className="text-base text-pink-300 text-left">
              🌟 HERNETWORKING HUB is an exclusive women community for <span className="font-bold bg-pink-700 px-2 py-1 rounded">entrepreneurs, founders, investors, coaches, finance professionals, business owners, creators, industry leaders, and media</span> who are ready to connect, collaborate, and create real impact. If you're ready to network with purpose, elevate your business, and grow with a community of powerhouse women, this is your sign to join us! Let's rise together.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-6">
        {/* Introduction */}
        <section className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-lg text-pink-300 font-cursive">
            We believe in{" "}
            <span className="font-bold bg-pink-700 px-2 py-1 rounded">collaboration over competition</span>, in lifting
            each other up, and in creating a network where every woman{" "}
            <span className="font-bold">feels seen, heard, and empowered</span>.
          </p>
        </section>

        {/* Benefits */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-amber-400 mb-8 text-center">What You Gain By Joining</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BenefitCard
              icon={<Users className="h-8 w-8 text-pink-500" />}
              title="Powerful Networking"
              description="Connect with ambitious women across industries."
            />
            <BenefitCard
              icon={<ArrowUpRight className="h-8 w-8 text-pink-500" />}
              title="Collaboration & Growth"
              description="Find partners, mentors, and new opportunities."
            />
            <BenefitCard
              icon={<Shield className="h-8 w-8 text-pink-500" />}
              title="Support & Safe Space"
              description="Share ideas, challenges, and wins without judgment."
            />
            <BenefitCard
              icon={<Calendar className="h-8 w-8 text-pink-500" />}
              title="Exclusive Resources & Events"
              description="Access expert insights, workshops, and business opportunities."
            />
          </div>
        </section>

        {/* This is for you if... */}
        <section className="mb-12 bg-pink-900 py-8 px-6 rounded-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-pink-300 font-serif">This Community is for You if You're:</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <span className="inline-block bg-pink-500 text-white rounded-full p-1">⚜</span>
              </div>
              <p className="text-lg text-pink-300 font-cursive">
                <em>A high-achieving woman feeling lonely at the top</em> – Connect with ambitious women who get it.
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <span className="inline-block bg-pink-500 text-white rounded-full p-1">⚜</span>
              </div>
              <p className="text-lg text-pink-300 font-cursive">
                <em>Looking for a like-minded, empowering network</em> – Collaborate, grow, and build together.
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <span className="inline-block bg-pink-500 text-white rounded-full p-1">⚜</span>
              </div>
              <p className="text-lg text-pink-300 font-cursive">
                <em>Seeking a safe space to share & uplift</em> – Exchange ideas, get support, and help other women rise.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section with Form */}
        <section id="join-form-section" className="text-center max-w-3xl mx-auto bg-gradient-to-r from-pink-700 to-pink-600 p-6 rounded-xl text-white">
          <h2 className="text-2xl font-bold mb-6 font-serif text-amber-400">Start your networking here</h2>

          <JoinForm />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-pink-900 text-white py-6 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-xl font-bold mb-2">HERNetworking Hub</h2>
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
    <Card className="border-pink-700 bg-black hover:border-pink-400 transition-colors">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 bg-pink-900 p-3 rounded-full">{icon}</div>
          <h3 className="text-xl font-bold text-pink-400 mb-2">{title}</h3>
          <p className="text-pink-300">{description}</p>
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
        <span className="inline-block bg-pink-500 text-white rounded-full p-1">✨</span>
      </div>
      <p className="text-lg text-pink-300 font-cursive">
        {text.split(" ").map((word: string, i: number) => {
          if (text.includes("expand your network") && word === "expand") {
            return (
              <span key={i} className="font-bold bg-pink-700 px-1 rounded">
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
