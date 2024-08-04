"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ColumnListFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className={`flex gap-4 w-[900px]`}>
        <div className="w-[300px] h-[800px]">
          <Skeleton className="h-7 w-[120px]  mb-2" />
          <Skeleton className="h-[200px] w-full mb-2" />
          <Skeleton className="h-[200px] w-full mb-2" />
          <Skeleton className="h-[200px] w-full mb-2" />
        </div>
        <div className="w-[300px] h-[800px]">
          <Skeleton className="h-7 w-[120px]  mb-2" />
          <Skeleton className="h-[200px] w-full mb-2" />
          <Skeleton className="h-[200px] w-full mb-2" />
          <Skeleton className="h-[200px] w-full mb-2" />
        </div>
        <div className="w-[300px] h-[800px]">
          <Skeleton className="h-7 w-[120px]  mb-2" />
          <Skeleton className="h-[200px] w-full mb-2" />
          <Skeleton className="h-[200px] w-full mb-2" />
          <Skeleton className="h-[200px] w-full mb-2" />
        </div>
        <div className="w-[300px] h-[800px]">
          <Skeleton className="h-7 w-[120px]  mb-2" />
          <Skeleton className="h-[200px] w-full mb-2" />
          <Skeleton className="h-[200px] w-full mb-2" />
          <Skeleton className="h-[200px] w-full mb-2" />
        </div>
      </div>
    </div>
  );
}
