import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import Navbar from "@/components/navbar"

export default function FeedbackPage() {
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
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              Your Feedback Matters
            </h1>
            <p className="text-gray-400 text-lg">Help us improve our courses and learning experience</p>
          </div>

          <Card className="bg-gray-900/50 border-gray-800 p-6">
            <form className="space-y-8">
              <div className="space-y-4">
                <Label>How would you rate your overall experience?</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant="outline"
                      className="h-12 w-12 rounded-full border-purple-600 text-purple-400 hover:bg-purple-600/10"
                    >
                      <Star className={`h-6 w-6 ${rating <= 3 ? "fill-current" : ""}`} />
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Which course are you reviewing?</Label>
                <RadioGroup defaultValue="web-dev">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="web-dev" id="web-dev" />
                    <Label htmlFor="web-dev">Full-Stack Web Development</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ai-ml" id="ai-ml" />
                    <Label htmlFor="ai-ml">AI & Machine Learning</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mobile" id="mobile" />
                    <Label htmlFor="mobile">Mobile App Development</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cloud" id="cloud" />
                    <Label htmlFor="cloud">Cloud Computing</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label htmlFor="feedback">Share your experience</Label>
                <Textarea
                  id="feedback"
                  placeholder="Tell us what you liked and what we can improve..."
                  className="h-32 bg-gray-800/50 border-gray-700"
                />
              </div>

              <div className="space-y-4">
                <Label htmlFor="suggestions">Any suggestions for new courses?</Label>
                <Textarea
                  id="suggestions"
                  placeholder="What would you like to learn next?"
                  className="h-24 bg-gray-800/50 border-gray-700"
                />
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Submit Feedback
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

