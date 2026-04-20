import type { Category } from "@/lib/mock-data";

interface Props {
  category: Category;
  onClick?: () => void;
}

const CategoryCard = ({ category, onClick }: Props) => (
  <button
    onClick={onClick}
    className="card-elevated flex flex-col items-center rounded-xl bg-card p-6 text-center transition-all hover:ring-2 hover:ring-accent/30"
  >
    <span className="mb-3 text-4xl">{category.icon}</span>
    <h3 className="font-heading text-base font-semibold text-foreground">{category.name}</h3>
    <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
    <span className="mt-3 text-xs font-medium text-accent">{category.providerCount} providers</span>
  </button>
);

export default CategoryCard;
