
import * as React from "react"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={className} {...props} />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

export { SidebarMenuItem }
