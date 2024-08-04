"use client";
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Emojis from "./Emojis";

type EmojiPickerProps = {
  setStopPropagation: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EmojiPicker({ setStopPropagation }: EmojiPickerProps) {
  useEffect(() => {
    setStopPropagation(true);
    return () => {
      setStopPropagation(false);
    };
  }, []);
  return (
    <div className="flex flex-col w-[400px]">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="w-full justify-between">
          <div>
            <TabsTrigger value="account">Emojis</TabsTrigger>
            <TabsTrigger value="password">Icons</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </div>
          <TabsTrigger value="remove">Remove</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="space-y-2">
          <Emojis />
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
