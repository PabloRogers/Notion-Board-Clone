import { Prisma } from "@prisma/client";
import { SetStateAction, createContext, useContext } from "react";

type TColumnData = Prisma.ColumnGetPayload<{
  include: {
    tasks: { include: { collaborators: true } };
  };
}>;

export const ColumnContext = createContext<TColumnData | undefined>(undefined);

export function useColumnContext() {
  const columnData = useContext(ColumnContext);

  if (!columnData) {
    throw new Error("useColumnContext must be used within a ColumnContext");
  }

  return columnData;
}
