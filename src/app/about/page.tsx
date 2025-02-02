import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Cpu, Users, Trophy, BookOpen } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
        <Navbar />
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              About Edukado
            </h1>
            <p className="text-gray-400 text-lg">
              Empowering the next generation of tech innovators through cutting-edge education
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold">Expert Instructors</h3>
                <p className="text-gray-400">
                  Learn from industry professionals with years of real-world experience in leading tech companies.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Cpu className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold">Cutting-edge Curriculum</h3>
                <p className="text-gray-400">
                  Our courses are constantly updated to reflect the latest technologies and industry trends.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold">Hands-on Experience</h3>
                <p className="text-gray-400">
                  Practice with real projects and build a portfolio that showcases your skills to potential employers.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold">Flexible Learning</h3>
                <p className="text-gray-400">
                  Learn at your own pace with our online platform, accessible anytime and anywhere.
                </p>
              </div>
            </Card>
          </div>

          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Start Your Journey?</h2>
            <div className="flex gap-4 justify-center">
              <Button className="bg-purple-600 hover:bg-purple-700">View Courses</Button>
              <Button variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-600/10">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

