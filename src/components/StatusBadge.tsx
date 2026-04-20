import { Badge } from "@/components/ui/badge";

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-amber-100 text-amber-800 border-amber-200" },
  accepted: { label: "Accepted", className: "bg-blue-100 text-blue-800 border-blue-200" },
  in_progress: { label: "In Progress", className: "bg-indigo-100 text-indigo-800 border-indigo-200" },
  completed: { label: "Completed", className: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  cancelled: { label: "Cancelled", className: "bg-gray-100 text-gray-600 border-gray-200" },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-800 border-red-200" },
};

const StatusBadge = ({ status }: { status: string }) => {
  const config = statusConfig[status] || statusConfig.pending;
  return (
    <Badge variant="outline" className={`text-xs font-semibold ${config.className}`}>
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
