import { Hexagon } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card py-12">
    <div className="container">
      <div className="grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="mb-3 flex items-center gap-2 font-heading text-lg font-bold">
            <Hexagon className="h-6 w-6 text-accent" strokeWidth={2.5} />
            The Help Hive
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">
            Connecting you with trusted local service providers. Find the help you need, when you need it.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold">Services</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/browse" className="hover:text-foreground">Browse Services</Link></li>
            <li><Link to="/register" className="hover:text-foreground">Become a Provider</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold">Account</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/login" className="hover:text-foreground">Log in</Link></li>
            <li><Link to="/register" className="hover:text-foreground">Register</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} The Help Hive. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
