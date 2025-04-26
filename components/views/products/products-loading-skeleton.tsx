'use client'

import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

export function ProductsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
      {[...Array(6)].map((_, idx) => (
        <div key={idx} className="flex flex-col items-center sm:items-start w-full">
          <div className="w-full">
            <div className="aspect-square w-full overflow-hidden rounded-xl bg-muted/10">
              <Skeleton className="h-full w-full rounded-xl" />
            </div>
            <div className="mt-3 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-1/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}