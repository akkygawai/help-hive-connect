import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Hexagon } from "lucide-react";
import { categories } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [role, setRole] = useState("user");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set standard user role in local storage to simulate authentication
    localStorage.setItem("userRole", "user");
    toast({ title: "Success", description: "Account created successfully!" });
    
    setTimeout(() => {
      if (role === "provider") {
        window.location.href = "/become-provider";
      } else {
        window.location.href = "/";
      }
    }, 500);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-12">
        <div className="mx-auto w-full max-w-md px-4">
          <div className="card-elevated rounded-xl bg-card p-8">
            <div className="mb-6 text-center">
              <Hexagon className="mx-auto mb-3 h-10 w-10 text-accent" strokeWidth={2.5} />
              <h1 className="font-heading text-2xl font-bold text-foreground">Create Account</h1>
              <p className="mt-1 text-sm text-muted-foreground">Join The Help Hive today</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" required placeholder="John Doe" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required placeholder="you@example.com" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
              </div>
              <div>
                <Label>Register as</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Customer</SelectItem>
                    <SelectItem value="provider">Service Provider</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {role === "provider" && (
                <div>
                  <Label>Service Category</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required placeholder="Min. 6 characters" />
              </div>
              <Button type="submit" className="w-full">Create Account</Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-accent hover:underline">Log in</Link>
            </p>
          </div>
        </div>
    </div>
  );
};

export default Register;
