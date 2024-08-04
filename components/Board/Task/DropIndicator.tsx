import React from "react";
import { useColumnContext } from "../context";

interface DropIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function DropIndicator({ ...props }: DropIndicatorProps) {
  const columnData = useColumnContext();
  return (
    <div
      className="w-full flex justify-center items-center opacity-0"
      {...props}
    >
      <div className="my-0.5 rounded h-1 w-11/12 bg-primary "></div>
    </div>
  );
}
