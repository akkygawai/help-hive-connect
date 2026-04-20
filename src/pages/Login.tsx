import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hexagon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    // Since this is a demo frontend, let's make it completely foolproof: 
    // any email starting with 'admin' instantly gets routed to the dashboard.
    if (cleanEmail.startsWith("admin")) {
      toast({ title: "Welcome back, Admin!", description: "Redirecting to dashboard..." });
      localStorage.setItem("userRole", "admin");
      // use timeout to allow toast to render
      setTimeout(() => {
        window.location.href = "/admin";
      }, 500);
    } else {
      toast({ title: "Welcome!", description: "Logged in successfully." });
      localStorage.setItem("userRole", "user");
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-12">
        <div className="mx-auto w-full max-w-md px-4">
          <div className="card-elevated rounded-xl bg-card p-8">
            <div className="mb-6 text-center">
              <Hexagon className="mx-auto mb-3 h-10 w-10 text-accent" strokeWidth={2.5} />
              <h1 className="font-heading text-2xl font-bold text-foreground">Welcome Back</h1>
              <p className="mt-1 text-sm text-muted-foreground">Log in to your account</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </div>
              <Button type="submit" className="w-full">Log in</Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-accent hover:underline">Register</Link>
            </p>
          </div>
        </div>
    </div>
  );
};

export default Login;
