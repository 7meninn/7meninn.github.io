export interface MarkdownRoute {
  title: string;
  path: string;
  folderId: string;
  originalFolder: string;
  getContent: () => Promise<string>;
}

export function getMarkdownRoutes(): MarkdownRoute[] {
  // Use import.meta.glob to load raw markdown files
  const modules = import.meta.glob('../content/*/*.md', { query: '?raw', import: 'default' });

  const routes: MarkdownRoute[] = [];

  for (const path in modules) {
    // path looks like: ../content/01-Home/index.md
    const parts = path.split('/');
    if (parts.length >= 3) {
      const folderName = parts[parts.length - 2]; // e.g. '01-Home'
      
      // Remove prefix like '01-'
      const titleMatch = folderName.match(/^\d+-(.+)$/);
      const title = titleMatch ? titleMatch[1] : folderName;
      
      // Default to '/' for Home, otherwise /lowercase-title
      const routePath = title.toLowerCase() === 'home' ? '/' : `/${title.toLowerCase()}`;

      routes.push({
        title,
        path: routePath,
        folderId: title,
        originalFolder: folderName,
        getContent: modules[path] as () => Promise<string>,
      });
    }
  }

  // Sort by original folder name (e.g., 01-Home comes before 02-Notes)
  routes.sort((a, b) => a.originalFolder.localeCompare(b.originalFolder));

  return routes;
}
