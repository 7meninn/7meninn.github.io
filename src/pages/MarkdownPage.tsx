import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkWikiLink from "remark-wiki-link"
import remarkFrontmatter from "remark-frontmatter"
import { getMarkdownRoutes } from "@/lib/content"
import { Skeleton } from "@/components/ui/skeleton"

export function MarkdownPage() {
  const location = useLocation()
  const routes = getMarkdownRoutes()
  
  // Find route match
  const currentRoute = routes.find(r => r.path === location.pathname) || routes.find(r => r.path.startsWith(location.pathname) && r.path !== "/")
  
  const [content, setContent] = useState<string | null>(null)
  
  useEffect(() => {
    if (currentRoute) {
      setContent(null)
      currentRoute.getContent().then(text => {
        setContent(text)
      })
    }
  }, [currentRoute])

  if (!currentRoute) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Note not found.
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto w-full pb-16 pt-8">
      {content === null ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ) : (
        <article className="prose prose-zinc dark:prose-invert prose-p:leading-relaxed prose-pre:bg-zinc-900 prose-pre:text-zinc-50 max-w-none">
          <ReactMarkdown 
            remarkPlugins={[
              remarkGfm,
              remarkFrontmatter, // Parses frontmatter and removes it from output
              [remarkWikiLink, {
                // Configure how [[Page Name]] maps to URLs
                pageResolver: (name: string) => [name.toLowerCase().replace(/ /g, '-')],
                hrefTemplate: (permalink: string) => `/${permalink}`
              }]
            ]}
          >
            {content}
          </ReactMarkdown>
        </article>
      )}
    </div>
  )
}
