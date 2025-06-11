"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import "@niledatabase/react/styles.css";
import { useForm } from "react-hook-form";
import { useActionState } from "react";

export type ServerResponse = {
  ok: boolean;
  message?: string;
};

type Props = {
  action: (
    prevState: ServerResponse | null,
    formData: FormData
  ) => Promise<ServerResponse>;
};
export default function CustomLoginForm({ action }: Props) {
  const form = useForm();
  const [state, formAction, pending] = useActionState<
    ServerResponse | null,
    FormData
  >(action, {
    message: "",
    ok: true,
  });

  return (
    <div className="container mx-auto pt-40 flex gap-20 flex-col max-w-3xl">
      <Form {...form}>
        <form action={formAction} className="flex flex-col gap-3">
          <span className={`${state?.ok ? "text-green-500" : "text-red-500"}`}>
            {state?.message}
          </span>
          <div className="flex flex-row gap-2">
            <Button type="submit" size="lg" disabled={pending}>
              Send verification email
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
