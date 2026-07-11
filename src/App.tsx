import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

import { MarkdownPage } from "@/pages/MarkdownPage"
import { TooltipProvider } from "@/components/ui/tooltip"
import { MusicPlayer } from "@/components/MusicPlayer"

function App() {

  return (
    <BrowserRouter>
      <TooltipProvider>
        <SidebarProvider>
          <div className="flex h-screen w-full overflow-hidden">
            <AppSidebar />
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
                <SidebarTrigger />
                <span className="font-bold">Bimal Tyagi</span>
              </header>
              <main className="no-scrollbar min-h-0 flex-1 overflow-y-auto bg-background p-6 pb-32 md:p-10 md:pb-40 lg:p-16 lg:pb-48">
                <div className="mx-auto max-w-3xl">
                  <Routes>
                    <Route path="*" element={<MarkdownPage />} />
                  </Routes>
                </div>
              </main>
            </div>
          </div>
          <MusicPlayer />
        </SidebarProvider>
      </TooltipProvider>
    </BrowserRouter>
  )
}

export default App
