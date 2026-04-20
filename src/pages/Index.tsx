import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import ProviderCard from "@/components/ProviderCard";
import { categories, providers } from "@/lib/mock-data";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero py-20 md:py-28">
        <div className="container relative z-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="animate-fade-in">
              <h1 className="font-heading text-4xl font-bold leading-tight text-warm-50 md:text-5xl lg:text-6xl text-balance">
                Find Trusted <span className="text-honey">Local Services</span> Near You
              </h1>
              <p className="mt-4 max-w-lg text-lg text-warm-300">
                Connect with verified electricians, plumbers, cleaners, tutors and more — all in one place.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/browse">
                  <Button size="lg" className="gap-2">
                    Browse Services <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" variant="outline" className="border-warm-400 text-warm-100 hover:bg-warm-700">
                    Become a Provider
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <img
                src={heroImage}
                alt="Professional service provider at work"
                width={1280}
                height={720}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card py-12">
        <div className="container grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { value: "155+", label: "Verified Providers" },
            { value: "2,400+", label: "Happy Customers" },
            { value: "8", label: "Service Categories" },
            { value: "4.8★", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground">Service Categories</h2>
            <p className="mt-2 text-muted-foreground">Find the right professional for any job</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/browse?category=${cat.id}`}>
                <CategoryCard category={cat} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="bg-secondary/50 py-16">
        <div className="container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground">Top Rated Providers</h2>
              <p className="mt-2 text-muted-foreground">Trusted professionals with great reviews</p>
            </div>
            <Link to="/browse" className="hidden text-sm font-medium text-accent hover:underline md:block">
              View all →
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {providers.slice(0, 3).map((p) => (
              <ProviderCard key={p.id} provider={p} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-10 text-center font-heading text-3xl font-bold text-foreground">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: <Users className="h-8 w-8" />, title: "Browse & Choose", desc: "Search by category, read reviews, and find the perfect service provider." },
              { icon: <Zap className="h-8 w-8" />, title: "Submit Request", desc: "Describe your needs, set your budget, and pick a preferred date." },
              { icon: <Shield className="h-8 w-8" />, title: "Get It Done", desc: "Your provider completes the job. Leave a rating when you're satisfied." },
            ].map((step, i) => (
              <div key={step.title} className="relative flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  {step.icon}
                </div>
                <span className="mb-2 font-heading text-xs font-bold uppercase tracking-widest text-muted-foreground">Step {i + 1}</span>
                <h3 className="font-heading text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero py-16">
        <div className="container text-center">
          <h2 className="font-heading text-3xl font-bold text-warm-50">Ready to Get Started?</h2>
          <p className="mx-auto mt-3 max-w-md text-warm-300">Join thousands of satisfied customers and skilled providers on The Help Hive.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/register">
              <Button size="lg">Create an Account</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
