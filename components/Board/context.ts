import { Board, Prisma } from "@prisma/client";
import { SetStateAction, createContext, useContext } from "react";

export type TBoardData = Prisma.BoardGetPayload<{
  include: {
    columns: { include: { tasks: { include: { collaborators: true } } } };
  };
}>;

export const BoardContext = createContext<TBoardData | null | undefined>(
  undefined
);

export function useBoardContext() {
  const boardData = useContext(BoardContext);

  return boardData;
}
