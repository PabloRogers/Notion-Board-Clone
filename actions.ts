"use server";
import { ColumnTitleColor } from "@prisma/client";
import { prisma } from "./prisma/db";

export const setColumnTitleColor = async (
  color: ColumnTitleColor,
  columnId: string
) => {
  await prisma.column.update({
    where: {
      id: columnId,
    },
    data: {
      titleColor: color,
    },
  });
};

export const getTasks = async (columnId: string) => {
  const tasks = await prisma.task.findMany({
    where: {
      columnId: columnId,
    },
  });
  return tasks;
};

export const getCollaborators = async (taskId: string) => {
  const collaborators = await prisma.collaborator.findMany({
    where: {
      taskId,
    },
  });
  return collaborators;
};

export const getBoard = async () => {};

export const getColumns = async () => {
  const board = await prisma.board.findFirst();

  const columns = await prisma.column.findMany({
    where: {
      boardId: board?.id,
    },
    orderBy: {
      position: "asc",
    },
  });
  return columns;
};

export const getBoardData = async () => {
  const board = await prisma.board.findFirst({
    include: {
      columns: {
        orderBy: {
          position: "asc",
        },
        include: {
          tasks: {
            orderBy: {
              position: "asc",
            },
            include: {
              collaborators: true,
            },
          },
        },
      },
    },
  });
  return board;
};

export const setTaskEmoji = async (emojiCode: string, taskId: string) => {
  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      emoji: emojiCode,
    },
  });
};
