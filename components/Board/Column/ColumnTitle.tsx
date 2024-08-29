"use client";
import React, { useOptimistic, useState } from "react";
import { Badge } from "../../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Column, ColumnTitleColor } from "@prisma/client";
import { setColumnTitleColor } from "@/actions";
import { useMutation } from "@tanstack/react-query";
import { useColumnContext } from "./context";

// Add tailwind classes to the stylesheet so dynamic classes can be used
enum Colors {
  blue = "bg-blue-500/40 hover:bg-blue-500/60 bg-blue-500",
  green = "bg-green-500/40 hover:bg-green-500/60 bg-green-500",
  red = "bg-red-500/40 hover:bg-red-500/60 bg-red-500",
  yellow = "bg-yellow-500/40 hover:bg-yellow-500/60 bg-yellow-500",
  purple = "bg-purple-500/40 hover:bg-purple-500/60 bg-purple-500",
  orange = "bg-orange-500/40 hover:bg-orange-500/60 bg-orange-500",
  pink = "bg-pink-500/40 hover:bg-pink-500/60 bg-pink-500",
  gray = "bg-gray-500/40 hover:bg-gray-500/60 bg-gray-500",
}

export default function ColumnTitle() {
  const columnData = useColumnContext();

  const [optimitsticColumnData, setOptimisticColumnData] =
    useOptimistic(columnData);

  const [columnColor, setColumnColor] = useState(columnData.titleColor);

  const { mutate } = useMutation({
    mutationFn: (color: ColumnTitleColor) =>
      setColumnTitleColor(color, columnData.id),
  });

  if (!columnData) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Badge
            variant="secondary"
            className={`flex space-x-2 text-sm font-medium text-opacity-60 bg-${optimitsticColumnData.titleColor}-500/40 hover:bg-${optimitsticColumnData.titleColor}-500/60 `}
          >
            <div
              className={`rounded-full w-2 h-2 bg-${optimitsticColumnData.titleColor}-500`}
            ></div>
            <div>{optimitsticColumnData.title}</div>
          </Badge>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Column Color</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={optimitsticColumnData.titleColor}
          onValueChange={(value) => {
            setOptimisticColumnData((prev) => ({
              ...prev,
              titleColor: value as ColumnTitleColor,
            }));
            mutate(value as ColumnTitleColor);
          }}
          className="font-semibold"
        >
          <DropdownMenuRadioItem
            value="blue"
            className="text-blue-500 focus:text-blue-500"
          >
            Blue
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="red"
            className="text-red-500 focus:text-red-500"
          >
            Red
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="green"
            className="text-green-500 focus:text-green-500"
          >
            Green
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="yellow"
            className="text-yellow-500 focus:text-yellow-500"
          >
            Yellow
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="purple"
            className="text-purple-500 focus:text-purple-500"
          >
            Purple
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="orange"
            className="text-orange-500 focus:text-orange-500"
          >
            Orange
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="pink"
            className="text-pink-500 focus:text-pink-500"
          >
            Pink
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="gray"
            className="text-gray-500 focus:text-gray-500"
          >
            Grey
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
