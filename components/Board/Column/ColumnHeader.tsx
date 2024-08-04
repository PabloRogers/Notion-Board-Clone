import React from "react";
import ColumnTitle from "./ColumnTitle";
import { Column } from "@prisma/client";
import { useColumnContext } from "../context";

export default function ColumnHeader() {
  const columnData = useColumnContext();

  return (
    <div className="flex w-full justify-between pb-2">
      <ColumnTitle />
      <div className="text-muted-foreground">{columnData?.tasks.length}</div>
    </div>
  );
}
