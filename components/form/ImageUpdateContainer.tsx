"use client";

import { FormAction } from "@/utils/types";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import FormContainer from "./FormContainer";
import ImageInput from "./ImageInput";
import { SubmitButton } from "./Buttons";
import { Label } from "../ui/label";

type ImageUpdateContainerProps = {
  imageSource: string;
  altName: string;
  text?: string;
  action: FormAction;
};

function ImageUpdateContainer({
  imageSource,
  altName,
  text = "update image",
  action,
}: ImageUpdateContainerProps) {
  const [isUpdateOptionVisible, setIsUpdateOptionVisible] = useState(false);
  return (
    <section>
      <Label className="capitalize tracking-wide">Product Image</Label>
      <div className="mt-2 grid sm:grid-cols-2 gap-x-16 gap-y-4">
        <div className="relative w-full h-44 rounded-lg overflow-hidden cursor-pointer">
          <Image
            src={imageSource}
            alt={altName}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
            priority
            className="w-full block object-cover hover:scale-105 duration-300"
          />
        </div>
        <div className="flex flex-col gap-y-4">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="w-max tracking-wide"
            onClick={() => setIsUpdateOptionVisible(!isUpdateOptionVisible)}
          >
            {isUpdateOptionVisible ? "Cancel" : "Update Product Image?"}
          </Button>
          {isUpdateOptionVisible && (
            <FormContainer action={action}>
              <ImageInput name="image" />
              <div className="mt-4">
                <SubmitButton text="update image" size="sm" />
              </div>
            </FormContainer>
          )}
        </div>
      </div>
    </section>
  );
}
export default ImageUpdateContainer;
