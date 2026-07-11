import { useNavigate, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { getMarkdownTree } from "@/lib/content"
import { TreeView } from "@/components/tree-view"
import { SearchCommand } from "./SearchCommand"

export function AppSidebar() {
  const tree = getMarkdownTree()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Sidebar>
      <SidebarHeader className="p-4 flex flex-row items-center justify-between border-b border-border/50">
        <div className="font-bold text-lg">Bimal Tyagi</div>
        <SearchCommand />
      </SidebarHeader>
      <SidebarContent className="px-2 pt-4">
        <TreeView
          data={tree}
          initialSelectedItemId={location.pathname}
          onSelectChange={(item) => {
            // Only navigate if it's a leaf node containing a path (starting with /)
            if (item && (!item.children || item.children.length === 0) && item.id.startsWith('/')) {
              navigate(item.id)
            }
          }}
        />
      </SidebarContent>
    </Sidebar>
  )
}
