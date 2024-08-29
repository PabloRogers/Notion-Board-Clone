"use client";

import { useBoardContext } from "../context";
import Column from "./Column";
import { ColumnContext } from "@/components/Board/Column/context";

export default function ColumnList() {
  const boardData = useBoardContext();

  return (
    <div className={`flex gap-4 w-[900px]`}>
      {boardData?.columns.map((column) => {
        return (
          <ColumnContext.Provider key={column.id} value={column}>
            <Column />
          </ColumnContext.Provider>
        );
      })}
    </div>
  );
}
