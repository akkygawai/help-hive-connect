import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { sampleUsers, sampleReviews, providers as defaultProviders, Provider } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Save, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [allProviders, setAllProviders] = useState<Provider[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "admin") {
      window.location.href = "/";
    }

    const stored = localStorage.getItem("allProviders");
    if (stored) {
      setAllProviders(JSON.parse(stored));
    } else {
      localStorage.setItem("allProviders", JSON.stringify(defaultProviders));
      setAllProviders(defaultProviders);
    }
  }, []);

  const handleRateChange = (id: string, newRate: string) => {
    setAllProviders(prev => prev.map(p => p.id === id ? { ...p, hourlyRate: Number(newRate) } : p));
  };

  const handleSaveProviders = () => {
    localStorage.setItem("allProviders", JSON.stringify(allProviders));
    toast({ title: "Saved", description: "Providers have been successfully updated." });
  };

  const handleDeleteProvider = (id: string) => {
    const updated = allProviders.filter(p => p.id !== id);
    setAllProviders(updated);
    localStorage.setItem("allProviders", JSON.stringify(updated));
    toast({ title: "Deleted", description: "Provider has been removed.", variant: "destructive" });
  };

  return (
    <div className="container py-12">
      <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Users (Role Tracing)</CardTitle>
            <CardDescription>Track all newly registered users and activity.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleUsers.map((u) => (
                <div key={u.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{u.name}</h3>
                    <p className="text-sm text-muted-foreground">{u.email}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs uppercase bg-secondary px-2 py-1 rounded-md text-foreground">{u.role}</span>
                    <p className="mt-1 text-xs text-muted-foreground">Joined: {u.joinedAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews & Complaints</CardTitle>
            <CardDescription>Monitor platform feedback from users.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleReviews.map((r) => (
                <div key={r.id} className="border-b pb-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-bold text-foreground">{r.userName}</span>
                    <span className={`text-xs px-2 py-1 rounded-md ${r.type === 'complaint' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {r.type.toUpperCase()}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.content}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Status: {r.status} | {r.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Service Providers Management</CardTitle>
            <CardDescription>Add, update rates, or remove providers from the directory.</CardDescription>
          </div>
          <Link to="/become-provider">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Add Provider
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {allProviders.map(p => (
              <div key={p.id} className="flex justify-between items-center border-b pb-3">
                <div>
                  <h3 className="font-bold text-foreground">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.category} • {p.location}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 border rounded-md px-2">
                    <span className="text-sm font-medium text-muted-foreground">₹</span>
                    <Input 
                      type="number" 
                      value={p.hourlyRate} 
                      onChange={(e) => handleRateChange(p.id, e.target.value)}
                      className="border-0 focus-visible:ring-0 w-16 px-1 h-8"
                    />
                    <span className="text-xs text-muted-foreground">/hr</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteProvider(p.id)} className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex justify-end pt-2">
               <Button onClick={handleSaveProviders} className="gap-2"><Save className="h-4 w-4" /> Save Rates</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
