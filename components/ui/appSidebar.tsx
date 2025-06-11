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

export function AppSidebar() {
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
        <SidebarGroup>
          <SignOutButton />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
