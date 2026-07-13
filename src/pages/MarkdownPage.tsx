import { useEffect, useState } from "react"
import { useLocation, Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkWikiLink from "remark-wiki-link"
import remarkFrontmatter from "remark-frontmatter"
import { getMarkdownRoutes } from "@/lib/content"
import { Skeleton } from "@/components/ui/skeleton"

const routes = getMarkdownRoutes()

export function MarkdownPage() {
  const location = useLocation()
  
  // Find route match (decode URI to handle spaces or special characters)
  const decodedPath = decodeURIComponent(location.pathname)
  const currentRoute = routes.find(r => r.path === decodedPath) || routes.find(r => r.path.startsWith(decodedPath) && r.path !== "/")
  
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
            components={{
              a: ({ node, ...props }) => {
                if (props.href && props.href.startsWith('/')) {
                  return <Link to={props.href} {...props} />
                }
                return <a target="_blank" rel="noopener noreferrer" {...props} />
              }
            }}
            remarkPlugins={[
              remarkGfm,
              remarkFrontmatter, // Parses frontmatter and removes it from output
              [remarkWikiLink, {
                // Configure how [[Page Name]] maps to URLs
                pageResolver: (name: string) => {
                  const matched = routes.find(r => r.title.toLowerCase() === name.toLowerCase())
                  return [matched ? matched.path.substring(1) : name.toLowerCase().replace(/\s+/g, '-')]
                },
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
