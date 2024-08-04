"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import React, { useState } from "react";

type TanstackQueryProviderProps = {
  children: React.ReactNode;
};

export default function TanstackQueryProvider({
  children,
}: TanstackQueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
