"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { cn } from "@/lib/utils";

type ButtonSizes = "default" | "sm" | "icon";

type SubmitButtonProps = {
  text: string;
  size?: ButtonSizes;
  className?: string;
};

export function SubmitButton({
  text,
  size = "default",
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      size={size}
      variant="default"
      className={cn(
        "tracking-wider capitalize disabled:opacity-100",
        className
      )}
    >
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        text
      )}
    </Button>
  );
}

type ActionType = "edit" | "delete";

export function IconButton({ actionType }: { actionType: ActionType }) {
  const { pending } = useFormStatus();
  function renderButton() {
    switch (actionType) {
      case "edit":
        return <FiEdit />;
      case "delete":
        return <FiTrash2 className="text-destructive" />;
      default: {
        const unExpectedAction: never = actionType;
        throw new Error(`Unexpected action type found : ${actionType}`);
      }
    }
  }
  return (
    <Button
      type="submit"
      variant="link"
      size="icon"
      disabled={pending}
      className="text-base disabled:opacity-100"
    >
      {pending ? (
        <ReloadIcon className="animate-spin text-destructive" />
      ) : (
        renderButton()
      )}
    </Button>
  );
}

export function SubmitFavouriteButton({
  isFavourite,
}: {
  isFavourite: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="outline"
      size="icon"
      className="bg-background disabled:opacity-100"
      disabled={pending}
    >
      {pending ? (
        <ReloadIcon className="animate-spin text-lg" />
      ) : isFavourite ? (
        <GoHeartFill className="text-lg" />
      ) : (
        <GoHeart className="text-lg" />
      )}
    </Button>
  );
}
