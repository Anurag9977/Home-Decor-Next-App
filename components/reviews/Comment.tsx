"use client";

import { useState } from "react";
import { Button } from "../ui/button";

function Comment({ comment }: { comment: string }) {
  const [showMore, setShowMore] = useState(false);
  const isLongComment = comment.length > 80;
  if (isLongComment) {
    return (
      <div>
        <p>{showMore ? comment : comment.slice(0, 80) + "..."}</p>
        <Button
          type="button"
          variant="link"
          className="p-0 h-max text-xs text-muted-foreground capitalize font-semibold"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "show less" : "read more"}
        </Button>
      </div>
    );
  }
  return (
    <div>
      <p>{comment}</p>
    </div>
  );
}

export default Comment;
