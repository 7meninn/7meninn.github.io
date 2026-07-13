import { useNavigate, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { getMarkdownTree } from "@/lib/content"
import { TreeView } from "@/components/tree-view"
import { SearchCommand } from "./SearchCommand"
import { Button } from "@/components/ui/button"

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 3.6 2.9 5.5 5.9 5.6-.3.3-.6.6-.7 1.5-.6.3-2.2.8-3.1-.9-.2-.2-.8-.9-2-.9-.3 0-.6.1-.6.2 0 .2.4.3.7.6.2.3.8 1.4 1.2 2 .5.8 1.6 1.1 2.3 1.1.2 0 .5 0 .8-.1v3" />
  </svg>
)

export function AppSidebar() {
  const tree = getMarkdownTree()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border/50 p-4">
        <div className="flex flex-col gap-6">
          <div className="min-w-0 px-2">
            <div className="font-bold text-lg leading-none">Bimal Tyagi</div>
            <a 
              href="mailto:bimaltyagi333@gmail.com" 
              className="mt-1 block truncate text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground hover:underline transition-colors"
            >
              bimaltyagi333@gmail.com
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <SearchCommand />
            <Button 
              className="w-full justify-start" 
              onClick={() => window.open('https://github.com/7meninn', '_blank', 'noopener,noreferrer')}
            >
              <GithubIcon className="mr-2 size-4" />
              GitHub
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background/20 px-1.5 font-mono text-[10px] font-medium text-primary-foreground">
                Shift+G
              </kbd>
            </Button>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 pt-4">
        <TreeView
          data={tree}
          initialSelectedItemId={location.pathname}
          onSelectChange={(item) => {
            if (item) {
              if (item.url) {
                navigate(item.url)
              } else if ((!item.children || item.children.length === 0) && item.id.startsWith('/')) {
                navigate(item.id)
              }
            }
          }}
        />
      </SidebarContent>
    </Sidebar>
  )
}
