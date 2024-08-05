"use client";
import emojiRegex from "emoji-regex";
import React, { useState } from "react";
import { Button } from "../../../ui/button";
import { ScrollArea } from "../../../ui/scroll-area";
import { Repeat } from "react-feather";
import { Input } from "../../../ui/input";
import { useMutation } from "@tanstack/react-query";
import { setTaskEmoji } from "@/actions";
import RandomEmojiButton from "./RandomEmojiButton";
import { useTaskContext } from "../context";

type EmojiData = {
  [category: string]: Emoji[];
};

type Emoji = {
  no: number;
  code: string;
  emoji: string;
  description: string;
  flagged: boolean;
  keywords: string[];
};
export default function Emojis() {
  const emojiData: EmojiData = require("./emojidata.json");
  const task = useTaskContext();
  const [searchTerm, setSearchTerm] = useState("");

  const mutation = useMutation({
    mutationFn: (emoji: Emoji) => setTaskEmoji(emoji.code, task.id),
  });

  const filteredEmojis = Object.entries(emojiData).map(([category, emojis]) => {
    return {
      category,
      emojis: emojis.filter((emoji) =>
        emoji.keywords.some((keyword) => keyword.includes(searchTerm))
      ),
    };
  });
  return (
    <div>
      <div className="flex space-x-2 bg-transparent sticky">
        <Input
          placeholder="Search emojis"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <RandomEmojiButton />
        <Button variant="outline">{"\u{1F680}"}</Button>
      </div>
      <div className="h-[300px] flex">
        <ScrollArea className="rounded-sm space-y-2">
          {filteredEmojis.map(({ category, emojis }) => (
            <div key={category} className="space-y-2">
              <h3 className="text-muted-foreground text-sm">{category}</h3>
              <div>
                {emojis.map((emoji) => (
                  <Button
                    variant="ghost"
                    key={emoji.no}
                    className="text-2xl w-12"
                    onClick={() => mutation.mutate(emoji)}
                  >
                    {emoji.emoji}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
