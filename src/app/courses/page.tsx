import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star } from "lucide-react"
import Navbar from "@/components/navbar"

export default function CoursesPage() {
  const courses = [
    {
      title: "Full-Stack Web Development",
      description: "Master modern web development with React, Node.js, and MongoDB",
      duration: "12 weeks",
      level: "Intermediate",
      rating: 4.8,
      students: 1234,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OM5kaEhetZzEFKrL1OFfbfSImmsolu.png",
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "AI & Machine Learning",
      description: "Learn to build intelligent systems with Python and TensorFlow",
      duration: "10 weeks",
      level: "Advanced",
      rating: 4.9,
      students: 856,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OM5kaEhetZzEFKrL1OFfbfSImmsolu.png",
      tags: ["Python", "TensorFlow", "AI"],
    },
    {
      title: "Mobile App Development",
      description: "Create native iOS and Android apps with React Native",
      duration: "8 weeks",
      level: "Beginner",
      rating: 4.7,
      students: 2156,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OM5kaEhetZzEFKrL1OFfbfSImmsolu.png",
      tags: ["React Native", "iOS", "Android"],
    },
    {
      title: "Cloud Computing",
      description: "Master AWS, Azure, and cloud architecture principles",
      duration: "10 weeks",
      level: "Intermediate",
      rating: 4.6,
      students: 1589,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OM5kaEhetZzEFKrL1OFfbfSImmsolu.png",
      tags: ["AWS", "Azure", "DevOps"],
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative">
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
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Our Courses
          </h1>
          <p className="text-gray-400 text-lg">
            Explore our comprehensive range of tech courses designed to help you succeed
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-800 overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold">{course.title}</h3>
                  <p className="text-gray-400">{course.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="bg-purple-500/10 text-purple-400">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students} students
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700">Enroll Now</Button>
                  <Button variant="outline" className="flex-1 border-purple-600 text-purple-400 hover:bg-purple-600/10">
                    Learn More
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

