import { Board, Prisma } from "@prisma/client";
import { SetStateAction, createContext, useContext } from "react";

export type BoardData = Prisma.BoardGetPayload<{
  include: {
    columns: { include: { tasks: { include: { collaborators: true } } } };
  };
}>;

type BoardContextType = {
  optimisticBoardData: BoardData;
  setOptimisticBoardData: React.Dispatch<
    SetStateAction<BoardData | null | undefined>
  >;
};

export const BoardContext = createContext<BoardContextType | null | undefined>(
  undefined
);

export function useBoardContext() {
  const boardData = useContext(BoardContext);

  return boardData;
}
