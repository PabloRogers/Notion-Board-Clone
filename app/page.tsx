import Board from "@/components/Board/Board";
import ColumnListFallback from "@/components/Board/Column/ColumnListFallback";
import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <ThemeToggle />

      <Board />
    </div>
  );
}
