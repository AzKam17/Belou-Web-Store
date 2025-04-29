import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-6">
      {/* Header skeleton */}
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-20" />
      </div>
      
      {/* Products grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}