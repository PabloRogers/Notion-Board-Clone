"use client";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getBoardData, getColumns } from "@/actions";
import ColumnList from "./Column/ColumnList";
import { Suspense, useEffect } from "react";
import ColumnListFallback from "./Column/ColumnListFallback";
import { BoardContext } from "./context";

import { createClient } from "@supabase/supabase-js";

export default function Board() {
  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const channel = supabase
      .channel("")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Column",
        },
        (payload: any) => {
          console.log(payload);
          refetch();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const {
    data: boardData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["board"],
    queryFn: () => getBoardData(),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <ColumnListFallback />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <BoardContext.Provider value={boardData}>
        <ColumnList />
      </BoardContext.Provider>
    </div>
  );
}
