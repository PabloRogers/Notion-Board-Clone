import React from "react";
import { Button } from "../../../ui/button";
import { Repeat } from "react-feather";
import { useMutation } from "@tanstack/react-query";
import { setTaskEmoji } from "@/actions";
import { useTaskContext } from "../context";

type Emoji = {
  no: number;
  code: string;
  emoji: string;
  description: string;
  flagged: boolean;
  keywords: string[];
  types?: string[];
};

type EmojiData = {
  [category: string]: Emoji[];
};

const emojiData: EmojiData = require("./emojidata.json");

export default function RandomEmojiButton() {
  const task = useTaskContext();
  const mutation = useMutation({
    mutationFn: () => {
      const randomCategory =
        Object.keys(emojiData)[
          Math.floor(Math.random() * Object.keys(emojiData).length)
        ];
      const randomEmoji =
        emojiData[randomCategory][
          Math.floor(Math.random() * emojiData[randomCategory].length)
        ];
      return setTaskEmoji(randomEmoji.code, task.id);
    },
  });

  return (
    <Button
      variant="outline"
      onClick={() => {
        mutation.mutate();
      }}
    >
      <Repeat className="w-3 h-3" />
    </Button>
  );
}
