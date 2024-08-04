import React from "react";
import { Card } from "../../ui/card";
import TaskCollaborators from "./TaskCollaborators";
import { useColumnContext, useTaskContext } from "../context";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import EmojiPicker from "@emoji-mart/react";
import TaskEmoji from "./TaskEmoji";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import TaskSheetForm from "./TaskSheetForm";
import { ChevronsRight, MoreHorizontal } from "react-feather";
import { Button } from "@/components/ui/button";
import DropIndicator from "./DropIndicator";

export default function Task() {
  const task = useTaskContext();
  const column = useColumnContext();
  const [stopPropagation, setStopPropagation] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (stopPropagation) {
      event.preventDefault();
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  return (
    <>
      <DropIndicator data-column={column.id} />
      <Sheet>
        <SheetTrigger asChild>
          <Card
            className="p-4"
            onClick={handleClick}
            draggable="true"
            onDragStart={handleDragStart}
          >
            <div className="flex items-center">
              <TaskEmoji setStopPropagation={setStopPropagation} />
              <div className="text-sm font-medium">{task?.title}</div>
            </div>
            <div className="text-xs">{task?.description}</div>
            <TaskCollaborators />
          </Card>
        </SheetTrigger>
        <SheetContent className="outline-none">
          <div className="flex justify-between items-center">
            <div>
              <SheetClose>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground"
                >
                  <ChevronsRight className="h-6 w-6" />
                </Button>
              </SheetClose>
            </div>
            <div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <MoreHorizontal className="h-6 w-6" />
              </Button>
            </div>
          </div>
          {task.title}
        </SheetContent>
      </Sheet>
    </>
  );
}
