import { Star, MapPin, Clock, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Provider } from "@/lib/mock-data";
import { Link } from "react-router-dom";

interface Props {
  provider: Provider;
}

const ProviderCard = ({ provider }: Props) => (
  <div className="card-elevated flex flex-col rounded-xl bg-card p-5">
    <div className="mb-3 flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary font-heading text-sm font-bold text-secondary-foreground">
          {provider.avatar}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="font-heading text-base font-semibold text-foreground">{provider.name}</h3>
            {provider.verified && <BadgeCheck className="h-4 w-4 text-accent" />}
          </div>
          <Badge variant="secondary" className="mt-0.5 text-xs">{provider.category}</Badge>
        </div>
      </div>
      <div className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1">
        <Star className="h-3.5 w-3.5 fill-accent text-accent" />
        <span className="text-sm font-semibold text-foreground">{provider.rating}</span>
        <span className="text-xs text-muted-foreground">({provider.reviewCount})</span>
      </div>
    </div>

    <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{provider.bio}</p>

    <div className="mb-3 flex flex-wrap gap-1.5">
      {provider.skills.slice(0, 3).map((skill) => (
        <span key={skill} className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {skill}
        </span>
      ))}
    </div>

    <div className="mt-auto flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{provider.location}</span>
      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{provider.experience}yr exp</span>
      <span className="ml-auto font-heading text-base font-bold text-foreground">${provider.hourlyRate}<span className="text-xs font-normal text-muted-foreground">/hr</span></span>
    </div>

    <Link to="/login" className="mt-3">
      <Button size="sm" className="w-full">Request Service</Button>
    </Link>
  </div>
);

export default ProviderCard;
