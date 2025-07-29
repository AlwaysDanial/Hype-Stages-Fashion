"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Menu, Search, User, ShoppingCart, Award, Users, Globe, Heart, Shield } from "lucide-react"

const teamMembers = [
  {
    name: "Mohamad",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Fashion enthusiast with 10+ years in streetwear industry",
  },
  {
    name: "Ariff",
    role: "Creative Director",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Award-winning designer specializing in urban fashion",
  },
  {
    name: "Danial",
    role: "Head of Operations",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Supply chain expert ensuring quality and sustainability",
  },
]

const stats = [
  { icon: Users, label: "Happy Customers", value: "50K+" },
  { icon: Globe, label: "Countries Served", value: "25+" },
  { icon: Award, label: "Awards Won", value: "15+" },
  { icon: Heart, label: "Products Sold", value: "100K+" },
]

export default function AboutPage() {
  const [cartItems, setCartItems] = useState(3)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <Link href="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  HYPESTAGES
                </h1>
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-pink-500 transition-colors">
                Home
              </Link>
              <Link href="/shop" className="text-gray-700 hover:text-pink-500 transition-colors">
                Shop
              </Link>
              <Link href="/about" className="text-pink-500 font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-pink-500 transition-colors">
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-pink-500">
                      {cartItems}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                HYPE STAGES
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're passionate about bringing you the latest in streetwear fashion, combining style, quality, and
              affordability to help you express your unique personality.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transform transition-all duration-500 ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className={`transform transition-all duration-500 delay-300 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2020, HYPESTAGES began as a small passion project by a group of streetwear enthusiasts who
                  wanted to make high-quality urban fashion accessible to everyone.
                </p>
                <p>
                  What started in a small garage has grown into a global brand, serving customers in over 25 countries.
                  We believe that fashion is a form of self-expression, and everyone deserves to look and feel their
                  best.
                </p>
                <p>
                  Our commitment to quality, sustainability, and customer satisfaction has made us a trusted name in the
                  streetwear community. We work directly with manufacturers to ensure fair wages and ethical production
                  practices.
                </p>
              </div>
            </div>
            <div
              className={`transform transition-all duration-500 delay-500 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
            >
              <Image
                src="/placeholder.svg?height=400&width=600&text=Our+Story"
                alt="Our story"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=400&width=600&text=Our+Story"
                }}
                onLoad={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.opacity = "1"
                }}
                style={{ opacity: 0, transition: "opacity 0.3s ease-in-out" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-12 transform transition-all duration-500 delay-200 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're driven by a simple mission: to democratize fashion and make quality streetwear accessible to
              everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Passion for Fashion",
                description:
                  "We live and breathe streetwear, constantly staying ahead of trends and bringing you the latest styles.",
              },
              {
                icon: Shield,
                title: "Quality First",
                description:
                  "Every product goes through rigorous quality checks to ensure you get the best value for your money.",
              },
              {
                icon: Globe,
                title: "Global Community",
                description:
                  "We're building a worldwide community of fashion enthusiasts who share our love for authentic streetwear.",
              },
            ].map((value, index) => (
              <Card
                key={value.title}
                className={`text-center transform transition-all duration-500 hover:scale-105 ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-12 transform transition-all duration-500 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind HYPES TAGES who work tirelessly to bring you the best in streetwear
              fashion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={member.name}
                className={`text-center transform transition-all duration-500 hover:scale-105 ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <Image
                    src={
                      member.image || `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(member.name)}`
                    }
                    alt={member.name}
                    width={200}
                    height={200}
                    className="rounded-full mx-auto mb-4"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(member.name)}`
                    }}
                    onLoad={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.opacity = "1"
                    }}
                    style={{ opacity: 0, transition: "opacity 0.3s ease-in-out" }}
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-pink-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transform transition-all duration-500 delay-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Our Community?</h2>
            <p className="text-pink-100 mb-8 text-lg">
              Discover our latest collection and become part of the HYPE STAGES family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300">
                  Shop Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-pink-600 px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 bg-transparent"
                >
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
