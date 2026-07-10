import { Link, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { getMarkdownRoutes } from "@/lib/content"

export function AppSidebar() {
  const routes = getMarkdownRoutes()
  const location = useLocation()

  return (
    <Sidebar>
      <SidebarHeader className="p-4 flex flex-row items-center justify-between border-b border-border/50">
        <div className="font-bold text-lg">Bimal Tyagi</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => {
                const isActive = location.pathname === route.path || 
                  (route.path !== "/" && location.pathname.startsWith(route.path))
                  
                return (
                  <SidebarMenuItem key={route.path}>
                    <SidebarMenuButton render={<Link to={route.path} />} isActive={isActive}>
                      {route.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
