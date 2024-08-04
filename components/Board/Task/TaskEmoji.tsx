"use client";
import React, { EventHandler, useEffect } from "react";
import { Button } from "../../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmojiPicker from "./EmojiPicker/EmojiPicker";
import { useTaskContext } from "../context";

type TaskEmojiProps = {
  setStopPropagation: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TaskEmoji({ setStopPropagation }: TaskEmojiProps) {
  const task = useTaskContext();

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  return (
    <Popover>
      <div onClick={handleClick}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="text-xl w-8 h-8">
            {String.fromCodePoint(parseInt(task?.emoji.replace("U+", ""), 16))}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-fit">
          <EmojiPicker setStopPropagation={setStopPropagation} />
        </PopoverContent>
      </div>
    </Popover>
  );
}
