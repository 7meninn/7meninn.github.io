import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { MarkdownRoute } from "@/lib/content"

export function MarkdownPage({ route }: { route: MarkdownRoute }) {
  const [content, setContent] = useState<string>("")

  useEffect(() => {
    let isMounted = true
    route.getContent().then((res) => {
      if (isMounted) setContent(res)
    })
    return () => {
      isMounted = false
    }
  }, [route])

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none prose-a:text-primary hover:prose-a:text-primary/80 prose-headings:font-semibold">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  )
}
