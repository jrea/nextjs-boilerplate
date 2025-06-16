import { revalidatePath } from "next/cache";
import SignInSignOut from "./SignInSignOut";

export default async function InteractiveSingIn() {
  return (
    <div className="mx-auto container p-10">
      This page lets you sign up or sign as random users. Sign in automatically
      creates the user and signs you in.
      <SignInSignOut revalidate={revalidate} />
    </div>
  );
}
async function revalidate() {
  "use server";
  revalidatePath("/interactive-sign-in");
}
