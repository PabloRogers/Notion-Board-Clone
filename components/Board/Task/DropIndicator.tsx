import React, { forwardRef } from "react";
import { useColumnContext } from "../context";

interface DropIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropIndicator = forwardRef<HTMLDivElement, DropIndicatorProps>(
  ({ ...props }, ref) => {
    return (
      <div
        className="w-full flex justify-center items-center opacity-0"
        ref={ref}
        {...props}
      >
        <div className="my-0.5 rounded h-1 w-11/12 bg-primary "></div>
      </div>
    );
  }
);

export default DropIndicator;
