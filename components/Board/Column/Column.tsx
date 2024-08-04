"use client";
import React from "react";
import ColumnHeader from "./ColumnHeader";
import Task from "../Task/Task";
import { TaskContext, useColumnContext, useTaskContext } from "../context";
import DropIndicator from "../Task/DropIndicator";
import { Task as TaskType } from "@prisma/client";
import { get } from "http";
import { useMutation } from "@tanstack/react-query";
// import { updateTaskPosition } from "@/actions";

export default function Column() {
  const columnData = useColumnContext();

  // const updateTaskMutation = useMutation({
  //   mutationFn: ({
  //     taskId,
  //     columnId,
  //     position,
  //   }: {
  //     taskId: string;
  //     columnId: string;
  //     position: string;
  //   }) => updateTaskPosition(taskId, columnId, position),
  // });

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const taskId = e.dataTransfer.getData("taskId");
    const indicators = getIndicators();
    const element = getNearestIndicator(e, indicators);
    if (!element) return;

    const position = (element as HTMLElement).dataset.position;
    if (!position) return;

    console.log(taskId, position, columnData.id);

    // updateTaskMutation.mutate({ taskId, columnId: columnData.id, position });
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightDropZone(e);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    clearIndiactors();
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    clearIndiactors();
  };

  const highlightDropZone = (e: React.DragEvent<HTMLDivElement>) => {
    const dropIndicators = getIndicators();
    clearIndiactors(dropIndicators);
    const el = getNearestIndicator(e, dropIndicators);

    if (el) {
      (el as HTMLElement).style.opacity = "1";
    }
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(`[data-column="${columnData.id}"]`),
      (element) => element as HTMLElement
    );
  };

  const clearIndiactors = (els?: HTMLElement[]) => {
    const indicator = els || getIndicators();
    indicator.forEach((el) => {
      el.style.opacity = "0";
    });
  };

  const getNearestIndicator = (
    e: React.DragEvent<HTMLDivElement>,
    indicators: HTMLElement[]
  ) => {
    let nearest: HTMLElement | null = null;
    let smallestDistance = Infinity;

    indicators.forEach((indicator) => {
      const box = indicator.getBoundingClientRect();
      const distance = Math.abs(e.clientY - box.top);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        nearest = indicator;
      }
    });

    return nearest;
  };

  return (
    <div
      className="w-[300px] h-[800px]"
      onDrop={handleOnDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
    >
      <ColumnHeader />

      {columnData?.tasks.map((task) => {
        return (
          <TaskContext.Provider key={task.id} value={task}>
            <Task />
          </TaskContext.Provider>
        );
      })}
      <DropIndicator data-column={columnData.id} data-position="-1" />
    </div>
  );
}
