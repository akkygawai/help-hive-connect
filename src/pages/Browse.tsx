import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProviderCard from "@/components/ProviderCard";
import { categories, providers } from "@/lib/mock-data";
import { useSearchParams } from "react-router-dom";

const Browse = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("category") || "all";
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(initialCat);

  const filtered = providers.filter((p) => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchCat = categoryFilter === "all" || p.categoryId === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container">
          <h1 className="font-heading text-3xl font-bold text-foreground">Browse Service Providers</h1>
          <p className="mt-1 text-muted-foreground">Find verified professionals in your area</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or skill..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProviderCard key={p.id} provider={p} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-16 text-center">
              <p className="text-lg font-medium text-muted-foreground">No providers found matching your criteria.</p>
              <button onClick={() => { setSearch(""); setCategoryFilter("all"); }} className="mt-2 text-sm text-accent hover:underline">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Browse;
