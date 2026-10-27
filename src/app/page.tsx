import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { Compass, Sparkles, MapPin, Users, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      {/* Stats / Proof Section */}
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center group">
              <p className="text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">500+</p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Hidden Gems</p>
            </div>
            <div className="text-center group">
              <p className="text-3xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">12k+</p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Mood Trips</p>
            </div>
            <div className="text-center group">
              <p className="text-3xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">4.9/5</p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Vibe Match</p>
            </div>
            <div className="text-center group">
              <p className="text-3xl font-black text-slate-900 group-hover:text-rose-600 transition-colors">24/7</p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Live Pricing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore by Vibe */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">Trending Moods</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">What's your travel vibe?</h2>
          </div>
          <Link href="/explore">
            <Button variant="ghost" className="font-bold gap-2 hover:bg-slate-50">
              View All Places <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <VibeCard
            title="Adventure"
            desc="Chase the adrenaline"
            image="https://images.unsplash.com/photo-1533130061792-64b345e4a833"
            color="bg-orange-500"
          />
          <VibeCard
            title="Romantic"
            desc="Escape with your soulmate"
            image="https://images.unsplash.com/photo-1510798831971-661eb04b3739"
            color="bg-rose-500"
          />
          <VibeCard
            title="Peaceful"
            desc="Find your inner zen"
            image="https://images.unsplash.com/photo-1528127269322-539801943592"
            color="bg-blue-500"
          />
          <VibeCard
            title="Spiritual"
            desc="Connect with history"
            image="https://images.unsplash.com/photo-1561361513-2d000a50f0dc"
            color="bg-purple-500"
          />
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black italic">Discover the Undiscovered.</h2>
            <p className="text-slate-400 text-lg">Hand-picked hidden gems that offer elite traveler experiences without the elite crowds.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <DestCard
              name="Hanle"
              location="Ladakh"
              image="https://images.unsplash.com/photo-1544216717-3bbf52512659"
              tag="Dark Sky Reserve"
              slug="hanle"
            />
            <DestCard
              name="Hampi"
              location="Karnataka"
              image="https://images.unsplash.com/photo-1590494412210-94d7cad07147"
              tag="World Heritage"
              slug="hampi"
            />
            <DestCard
              name="Alleppey"
              location="Kerala"
              image="https://images.unsplash.com/photo-1593693397690-362ad9666ec2"
              tag="Serene Waters"
              slug="alleppey"
            />
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 max-w-7xl mx-auto px-6 text-center">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[56px] p-12 md:p-24 text-white shadow-2xl shadow-indigo-200">
          <h2 className="text-4xl md:text-6xl font-black mb-8">Ready for your next mood?</h2>
          <Link href="/mood">
            <Button className="bg-white text-indigo-600 hover:bg-slate-100 rounded-full h-20 px-12 text-xl font-black shadow-xl shadow-black/10">
              Plan My Trip Now
            </Button>
          </Link>
          <div className="flex items-center justify-center gap-8 mt-12 text-white/60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-bold">Verified Places</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm font-bold">2.4k Active Trip</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function VibeCard({ title, desc, image, color }: any) {
  return (
    <Link href={`/explore?mood=${title}`} className="group relative h-80 rounded-[40px] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all">
      <img src={image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6">
        <div className={`w-10 h-10 ${color} rounded-2xl mb-3 flex items-center justify-center text-white shadow-lg`}>
          <Sparkles className="w-4 h-4" />
        </div>
        <h3 className="text-xl font-black text-white">{title}</h3>
        <p className="text-xs text-white/70 font-bold uppercase tracking-widest">{desc}</p>
      </div>
    </Link>
  )
}

function DestCard({ name, location, image, tag, slug }: any) {
  return (
    <Link href={`/destination/${slug}`} className="group relative aspect-[4/5] rounded-[48px] overflow-hidden cursor-pointer shadow-2xl transition-all">
      <img src={image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={name} />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
      <div className="absolute top-8 right-8">
        <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest text-white">
          {tag}
        </div>
      </div>
      <div className="absolute bottom-10 left-10 right-10">
        <div className="flex items-center gap-2 text-indigo-400 mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-xs font-black uppercase tracking-widest">{location}</span>
        </div>
        <h3 className="text-3xl font-black text-white group-hover:translate-x-2 transition-transform">{name}</h3>
      </div>
    </Link>
  )
}

function ShieldCheck({ className }: any) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
