import { Prisma } from "@prisma/client";
import { createContext, useContext } from "react";

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
