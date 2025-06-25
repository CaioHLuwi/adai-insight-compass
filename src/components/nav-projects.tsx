
"use client"

import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavProjects({
  projects,
  progressItems,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
  progressItems: {
    title: string
    url: string
    icon: LucideIcon
    disabled?: boolean
  }[]
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{projects[0]?.name}</SidebarGroupLabel>
      <SidebarMenu>
        {progressItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton 
              asChild={!item.disabled}
              className={item.disabled ? "opacity-60 cursor-not-allowed" : ""}
            >
              {item.disabled ? (
                <div className="flex items-center gap-2">
                  <item.icon />
                  <span>{item.title}</span>
                </div>
              ) : (
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
