import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Search, Moon } from "lucide-react"

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
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { getMarkdownRoutes } from "@/lib/content"
import { Button } from "@/components/ui/button"

export function SearchCommand() {
  const navigate = useNavigate()
  const routes = React.useMemo(() => getMarkdownRoutes(), [])
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "p" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      if (e.key.toLowerCase() === "d" && !e.metaKey && !e.ctrlKey) {
        if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;
        e.preventDefault()
        document.documentElement.classList.toggle('dark')
      }
      if (e.key.toLowerCase() === "g" && e.shiftKey && !e.metaKey && !e.ctrlKey) {
        if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;
        e.preventDefault()
        const link = document.createElement('a');
        link.href = 'https://github.com/7meninn';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        className="w-full justify-start"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 size-4" />
        Command
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background/20 px-1.5 font-mono text-[10px] font-medium text-primary-foreground">
          Ctrl+P
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No matching notes.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => { runCommand(() => document.documentElement.classList.toggle('dark')) }}>
                <Moon className="mr-2 size-4" />
                <span>Toggle Dark Mode</span>
                <CommandShortcut>
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background/20 px-1.5 font-mono text-[10px] font-medium text-muted-foreground group-data-selected/command-item:text-foreground">Press D</kbd>
                </CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => { 
                runCommand(() => {
                  const link = document.createElement('a');
                  link.href = 'https://github.com/7meninn';
                  link.target = '_blank';
                  link.rel = 'noopener noreferrer';
                  link.click();
                }) 
              }}>
                <GithubIcon className="mr-2 size-4" />
                <span>GitHub</span>
                <CommandShortcut>
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background/20 px-1.5 font-mono text-[10px] font-medium text-muted-foreground group-data-selected/command-item:text-foreground">Shift+G</kbd>
                </CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Notes">
              {routes.map((route) => (
                <CommandItem
                  key={route.path}
                  value={`${route.title} ${route.path} ${route.filePath}`}
                  onSelect={() => {
                    runCommand(() => navigate(route.path))
                  }}
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{route.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {route.path === "/" ? "/" : route.path}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
