"use client";
import { SignUpForm } from "@niledatabase/react";

export default function Form() {
  return (
    <SignUpForm
      onSuccess={() => {
        window.location.reload();
      }}
    />
  );
}
