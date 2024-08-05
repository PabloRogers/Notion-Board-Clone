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

type TaskContextType = Prisma.TaskGetPayload<{
  include: { collaborators: true };
}>;

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export function useTaskContext() {
  const taskData = useContext(TaskContext);

  if (!taskData) {
    throw new Error("useTaskContext must be used within a TaskContext");
  }

  return taskData;
}
