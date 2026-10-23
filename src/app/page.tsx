import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}