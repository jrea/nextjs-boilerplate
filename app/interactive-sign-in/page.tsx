"use client";

import { SignInForm, SignUpForm } from "@niledatabase/react";
import { useState } from "react";

export default function InteractiveSignIn() {
  const [msg, setMsg] = useState({ kind: "", msg: "" });
  return (
    <div className="container mx-auto mt-56 flex justify-center">
      <div className="w-3xl">
        <div
          className={`${
            msg.kind === "error" ? "bg-red-900" : "bg-green-700"
          } text-white p-2 rounded-lg ${
            msg.msg ? "opacity-100" : "opacity-0"
          } flex-1`}
        >
          {msg.msg}
        </div>
        <SignUpForm
          redirect={false}
          onError={(e) => {
            setMsg({ kind: "error", msg: e.message });
          }}
          onSuccess={(e) => {
            setMsg({ kind: "success", msg: "Sign up success!" });
          }}
        />
        <SignInForm
          redirect={false}
          onError={(e) => {
            setMsg({ kind: "error", msg: e.message });
          }}
          onSuccess={(e) => {
            setMsg({ kind: "success", msg: "Sign in success!" });
          }}
        />
      </div>
    </div>
  );
}
