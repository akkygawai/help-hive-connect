import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Hexagon } from "lucide-react";
import { Provider } from "@/lib/mock-data";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const BecomeProvider = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });
  
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    location: "",
    hourlyRate: "",
    experience: "",
    phone: "",
    bio: "",
    skills: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCategoryChange = (val: string) => {
    setFormData(prev => ({ ...prev, categoryId: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.categoryId) {
      toast({ title: "Error", description: "Please select a service category.", variant: "destructive" });
      return;
    }

    const categoryObj = categories.find(c => c.id === formData.categoryId);

    const newProvider: Provider = {
      id: `custom_${Date.now()}`,
      name: formData.name,
      category: categoryObj?.name || "Unknown",
      categoryId: formData.categoryId,
      rating: 5.0,
      reviewCount: 0,
      hourlyRate: Number(formData.hourlyRate),
      experience: Number(formData.experience),
      location: formData.location,
      bio: formData.bio,
      skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean),
      availability: "available",
      verified: false,
      avatar: formData.name.substring(0, 2).toUpperCase(),
      phone: formData.phone
    };

    // Save to localStorage
    const existingStr = localStorage.getItem("allProviders");
    const existingProviders = existingStr ? JSON.parse(existingStr) : categories; // Actually should use providers. Wait, we don't import providers here yet!
    // I need to be careful. I will import `providers` at the top. Wait! Let me just use empty array if not found, since Browse initializes it.
    const existingArray = existingStr ? JSON.parse(existingStr) : [];
    const updatedProviders = [newProvider, ...existingArray];
    localStorage.setItem("allProviders", JSON.stringify(updatedProviders));

    toast({ title: "Success", description: "You are now registered as a service provider!" });
    
    // Redirect to browse page
    setTimeout(() => {
      navigate("/browse");
    }, 1000);
  };

  return (
    <div className="flex flex-1 items-center justify-center py-12">
      <div className="mx-auto w-full max-w-2xl px-4">
        <div className="card-elevated rounded-xl bg-card p-8">
          <div className="mb-6 text-center">
            <Hexagon className="mx-auto mb-3 h-10 w-10 text-accent" strokeWidth={2.5} />
            <h1 className="font-heading text-2xl font-bold text-foreground">Become a Provider</h1>
            <p className="mt-1 text-sm text-muted-foreground">List your services on The Help Hive</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" required placeholder="Jane Doe" value={formData.name} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" required placeholder="+1 234 567 890" value={formData.phone} onChange={handleChange} />
              </div>
              
              <div>
                <Label>Service Category</Label>
                <Select value={formData.categoryId} onValueChange={handleCategoryChange}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Location / Area</Label>
                <Input id="location" required placeholder="Downtown" value={formData.location} onChange={handleChange} />
              </div>

              <div>
                <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
                <Input id="hourlyRate" type="number" required min="1" placeholder="45" value={formData.hourlyRate} onChange={handleChange} />
              </div>

              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input id="experience" type="number" required min="0" placeholder="5" value={formData.experience} onChange={handleChange} />
              </div>
            </div>

            <div>
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Input id="skills" required placeholder="Pipe fitting, drain cleaning, installation" value={formData.skills} onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="bio">Professional Bio</Label>
              <textarea
                id="bio"
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                placeholder="Tell clients about your expertise..."
                required
                value={formData.bio}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full">Register as Provider</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeProvider;
