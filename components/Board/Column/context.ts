import { Prisma } from "@prisma/client";
import { createContext, useContext } from "react";

type ColunmContextType = Prisma.ColumnGetPayload<{
  include: {
    tasks: { include: { collaborators: true } };
  };
}>;

export const ColumnContext = createContext<ColunmContextType | undefined>(
  undefined
);

export function useColumnContext() {
  const columnData = useContext(ColumnContext);

  if (!columnData) {
    throw new Error("useColumnContext must be used within a ColumnContext");
  }

  return columnData;
}
