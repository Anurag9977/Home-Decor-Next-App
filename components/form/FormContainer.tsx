"use client";

import { FormAction } from "@/utils/types";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "../ui/use-toast";

const initialState = {
  message: "",
};

function FormContainer({
  action,
  children,
}: {
  action: FormAction;
  children: React.ReactNode;
}) {
  const [state, formAction] = useFormState(action, initialState);

  useEffect(() => {
    if (state.message) {
      toast({ description: state.message });
    }
  }, [state]);

  return <form action={formAction}>{children}</form>;
}
export default FormContainer;
