"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "react-feather";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getCollaborators } from "@/actions";
import { useTaskContext } from "../context";

export default function TaskCollaborators() {
  const task = useTaskContext();

  return (
    <>
      <div className="flex shrink-0">
        {task?.collaborators.map((collaborator, index) => {
          if (index < 4) {
            return (
              <div
                key={index}
                style={{ marginLeft: index !== 0 ? "-0.6rem" : "0" }}
              >
                <Avatar className="w-8 h-8 border  dark:border-neutral-600 border-border ">
                  {collaborator.avatar && (
                    <AvatarImage
                      src={collaborator.avatar}
                      alt="@shadcn"
                      draggable="false"
                    />
                  )}
                  <AvatarFallback className="text-xs bg-neutral-800 ">
                    {collaborator.name[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
            );
          }
          if (index === 4) {
            return (
              <div key={index} style={{ marginLeft: "-0.6rem" }}>
                <Avatar className="w-8 h-8 border dark:border-neutral-600 border-border">
                  <AvatarFallback className="flex justify-center text-xs dark:bg-neutral-800">
                    <Plus className="w-3 h-3" />
                    {task.collaborators.length - 4}
                  </AvatarFallback>
                </Avatar>
              </div>
            );
          }
          return;
        })}
      </div>
    </>
  );
}
