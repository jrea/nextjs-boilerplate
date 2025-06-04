"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";

type ServerResponse = {
  ok: boolean;
  message?: string;
};

type Props = {
  placeholder: string;
  action: (
    prevState: ServerResponse | null,
    formData: FormData
  ) => Promise<ServerResponse>;
};

export function CreateTenantForm({ action, placeholder }: Props) {
  const [state, formAction, isPending] = useActionState<
    ServerResponse | null,
    FormData
  >(action, null);

  return (
    <form action={formAction} className="space-y-3">
      <div className="text-2xl mt-4">Create tenant</div>
      <div>
        <label htmlFor="password">Tenant name</label>
        <Input
          id="tenantName"
          name="tenantName"
          required
          placeholder={placeholder}
        />
        <input type="hidden" name="placeholder" value={placeholder} />
      </div>
      {state?.message && (
        <p
          className={`text-sm ${state.ok ? "text-green-500" : "text-red-500"}`}
        >
          {state.message}
        </p>
      )}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create"}
      </Button>
    </form>
  );
}
