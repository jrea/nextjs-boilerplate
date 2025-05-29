import {
  Calendar,
  Home,
  Inbox,
  Info,
  LogIn,
  Search,
  Settings,
  User,
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
    icon: Info,
  },
  {
    title: "Google (manual)",
    url: "/google-manual",
    icon: Info,
  },
  {
    title: "Reset password",
    url: "/reset-password",
    icon: Info,
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
