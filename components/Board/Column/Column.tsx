"use client";
import React, { useEffect, useRef } from "react";
import ColumnHeader from "./ColumnHeader";
import Task from "../Task/Task";
import { TaskContext, useColumnContext } from "../context";
import DropIndicator from "../Task/DropIndicator";

// import { updateTaskPosition } from "@/actions";

export default function Column() {
  const columnData = useColumnContext();

  const indicatorsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    indicatorsRef.current = Array.from(
      document.querySelectorAll(`[data-column="${columnData.id}"]`),
      (element) => element as HTMLElement
    );
  }, [columnData.id]);

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    clearIndiactors();
    const taskId = e.dataTransfer.getData("taskId");
    const indicators = getIndicators();
    const { position } = getNearestIndicator(e, indicators);

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
    const { nearest } = getNearestIndicator(e, dropIndicators);

    if (nearest) {
      nearest.style.opacity = "1";
    }
  };

  const getIndicators = () => {
    return indicatorsRef.current;
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
  ): { nearest: HTMLElement | null; position: number } => {
    let nearest: HTMLElement | null = null;
    let smallestDistance = Infinity;
    let position = 0;

    const pointerPosition = e.clientY;

    indicators.forEach((indicator, index) => {
      const rect = indicator.getBoundingClientRect();
      const indicatorCenter = rect.top + rect.height / 2;
      const distance = Math.abs(pointerPosition - indicatorCenter);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        nearest = indicator;
        position = index + 1;
      }
    });

    return { nearest, position };
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
      <DropIndicator data-column={columnData.id} />
    </div>
  );
}
