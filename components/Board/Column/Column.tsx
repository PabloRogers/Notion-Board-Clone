"use client";
import React, { useEffect, useRef } from "react";
import ColumnHeader from "./ColumnHeader";
import Task from "../Task/Task";
import { TaskContext } from "../context";
import DropIndicator from "../Task/DropIndicator";
import { useMutation } from "@tanstack/react-query";
import { moveTaskToColumn } from "@/actions";
import { useColumnContext } from "./context";

// import { updateTaskPosition } from "@/actions";

export default function Column() {
  const columnData = useColumnContext();

  const indicatorRefs = useRef<HTMLElement[]>([]);
  const nearestIndicatorRef = useRef<HTMLElement | null>(null);

  const mutation = useMutation({
    mutationFn: (variables: {
      taskId: string;
      columnId: string;
      position: number;
    }) =>
      moveTaskToColumn(
        variables.taskId,
        variables.columnId,
        variables.position
      ),
  });

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    clearIndiactors();
    const taskId = e.dataTransfer.getData("taskId");

    const { position } = getNearestIndicator(e, indicatorRefs.current);

    if (!indicatorRefs && !position) return;

    console.log(taskId, position, columnData.id);
    mutation.mutate({
      taskId,
      columnId: columnData.id,
      position,
    });
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
    clearIndiactors(indicatorRefs.current);
    getNearestIndicator(e, indicatorRefs.current);

    if (nearestIndicatorRef.current) {
      nearestIndicatorRef.current.style.opacity = "1";
    }
  };

  const clearIndiactors = (els?: HTMLElement[]) => {
    const indicator = els || indicatorRefs.current;
    indicator.forEach((el) => {
      el.style.opacity = "0";
    });
  };

  const getNearestIndicator = (
    e: React.DragEvent<HTMLDivElement>,
    indicators: HTMLElement[]
  ): { position: number } => {
    let smallestDistance = Infinity;
    let position = 0;

    const pointerPosition = e.clientY;

    indicators.forEach((indicator, index) => {
      const rect = indicator.getBoundingClientRect();
      const indicatorCenter = rect.top + rect.height / 2;
      const distance = Math.abs(pointerPosition - indicatorCenter);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        nearestIndicatorRef.current = indicator;
        position = index + 1;
      }
    });

    return { position };
  };

  const addRef = (el: HTMLDivElement | null) => {
    if (el && !indicatorRefs.current.includes(el)) {
      indicatorRefs.current.push(el);
    }
    return () => {
      // Remove the ref when the component is unmounted
      indicatorRefs.current = indicatorRefs.current.filter((ref) => ref !== el);
    };
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
            <DropIndicator ref={addRef} />
            <Task />
          </TaskContext.Provider>
        );
      })}
      <DropIndicator ref={addRef} />
    </div>
  );
}
