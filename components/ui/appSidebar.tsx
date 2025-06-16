import {
  ArrowBigRight,
  ArrowBigRightDash,
  Home,
  Key,
  LogIn,
  MailCheck,
  MailPlus,
  RotateCcw,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { SignOutButton } from "@niledatabase/react";
import { nile } from "@/app/api/[...nile]/nile";
import { User } from "@niledatabase/server";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Custom sign up",
    url: "/customLogin",
    icon: LogIn,
  },
  {
    title: "Interactive sign up / sign in",
    url: "/interactive-sign-in",
    icon: LogIn,
  },
  {
    title: "Google (NextJS)",
    url: "/google",
    icon: ArrowBigRightDash,
  },
  {
    title: "Google (manual)",
    url: "/google-manual",
    icon: ArrowBigRight,
  },
  {
    title: "Reset password",
    url: "/reset-password",
    icon: RotateCcw,
  },
  {
    title: "Forgot password",
    url: "/forgot-password",
    icon: Key,
  },
  {
    title: "Invites (manual)",
    url: "/invites",
    icon: MailPlus,
  },
  {
    title: "Verify email (manual)",
    url: "/verify-email",
    icon: MailCheck,
  },
];

export async function AppSidebar() {
  const me = await nile.users.getSelf<User>();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {me instanceof Response ? null : (
          <SidebarGroup>
            <div className="opacity-60 text-sm mb-2">
              Signed in as {me.email}
            </div>
            <SignOutButton />
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
