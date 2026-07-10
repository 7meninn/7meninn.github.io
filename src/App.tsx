import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { getMarkdownRoutes } from "@/lib/content"
import { MarkdownPage } from "@/pages/MarkdownPage"
import { TooltipProvider } from "@/components/ui/tooltip"

function App() {
  const routes = getMarkdownRoutes()

  return (
    <BrowserRouter>
      <TooltipProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
              <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
                <SidebarTrigger />
                <span className="font-bold">Bimal Tyagi</span>
              </header>
              <main className="flex-1 overflow-y-auto bg-background p-6 md:p-10 lg:p-16">
                <div className="mx-auto max-w-3xl">
                  <Routes>
                    {routes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={<MarkdownPage route={route} />}
                      />
                    ))}
                    {/* Fallback route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </BrowserRouter>
  )
}

export default App
