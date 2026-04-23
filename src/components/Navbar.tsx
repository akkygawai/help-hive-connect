import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Hexagon } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    setUserRole(localStorage.getItem("userRole"));
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const baseLinks = [
    { href: "/", label: "Home" },
  ];

  if (userRole) {
    baseLinks.push({ href: "/browse", label: "Browse Services" });
  }

  if (userRole === "admin") {
    baseLinks.push({ href: "/admin", label: "Admin Panel" });
  } else if (userRole === "user") {
    baseLinks.push({ href: "/reviews", label: "Reviews & Complaints" });
  }

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setUserRole(null);
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold text-foreground">
          <Hexagon className="h-7 w-7 text-accent" strokeWidth={2.5} />
          The Help Hive
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {baseLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {!userRole ? (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile">
                <Button variant="ghost" size="sm">Profile</Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>Log out</Button>
            </>
          )}
        </div>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="mt-8 flex flex-col gap-4">
              {baseLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-4 py-3 text-base font-medium text-foreground hover:bg-secondary"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-2 border-border" />
              {!userRole ? (
                <>
                  <Link to="/login" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full">Log in</Button>
                  </Link>
                  <Link to="/register" onClick={() => setOpen(false)}>
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/profile" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full mb-2">Profile</Button>
                  </Link>
                  <Button variant="outline" className="w-full" onClick={() => { handleLogout(); setOpen(false); }}>Log out</Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
