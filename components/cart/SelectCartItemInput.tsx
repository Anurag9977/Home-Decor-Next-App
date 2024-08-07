"use client";

import { useState } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { editCartItem } from "@/utils/actions";
import { toast } from "../ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

type SelectCartItemInputProps = {
  id: string;
  name: string;
  label?: string;
  placeholder: string;
  items: string[];
};

function SelectCartItemInput({
  id,
  name,
  label,
  placeholder,
  items,
}: SelectCartItemInputProps) {
  const [isLoading, setIsLoading] = useState(false);
  async function handleCartItemUpdate(value: string) {
    setIsLoading(true);
    const editCartItemAction = await editCartItem({
      cartItemID: id,
      amount: Number(value),
    });
    toast({ description: editCartItemAction.message });
    setIsLoading(false);
  }
  return (
    <div>
      <Select
        name={name}
        required
        onValueChange={(value) => {
          handleCartItemUpdate(value);
        }}
      >
        <Label htmlFor={id} className="capitalize tracking-wide">
          {label || name}
        </Label>
        {isLoading ? (
          <div className="mt-3 ml-3">
            <ReloadIcon className="text-primary animate-spin" />
          </div>
        ) : (
          <>
            <SelectTrigger id={id} className="mt-1 capitalize tracking-wide">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {items.map((item, index) => {
                  return (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </>
        )}
      </Select>
    </div>
  );
}
export default SelectCartItemInput;
