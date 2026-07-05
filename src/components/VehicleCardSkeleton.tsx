import { Skeleton } from "@/components/ui/skeleton";

export default function VehicleCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded border border-border bg-card">
      {/* Image Skeleton */}
      <Skeleton className="aspect-[16/10] w-full rounded-none bg-secondary/50" />

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-start justify-between">
          <div className="space-y-2">
            {/* Title Skeleton */}
            <Skeleton className="h-5 w-40 bg-secondary" />
          </div>
          {/* Price Skeleton */}
          <Skeleton className="h-6 w-16 bg-secondary" />
        </div>

        <div className="mt-4 flex flex-row gap-3 items-center">
          {/* Buttons Skeleton */}
          <Skeleton className="h-9 flex-1 bg-secondary/60" />
          <Skeleton className="h-9 flex-1 bg-secondary/60" />
        </div>
      </div>
    </div>
  );
}
