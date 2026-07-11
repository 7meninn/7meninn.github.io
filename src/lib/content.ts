import type { TreeDataItem } from "@/components/tree-view"

export interface MarkdownRoute {
  title: string;
  path: string;
  filePath: string;
  getContent: () => Promise<string>;
}

export function getMarkdownRoutes(): MarkdownRoute[] {
  const modules = import.meta.glob('../content/**/*.md', { query: '?raw', import: 'default' });
  const routes: MarkdownRoute[] = [];

  for (const path in modules) {
    const relativePath = path.replace('../content/', '');
    let slug = relativePath.replace(/\.md$/, '');
    
    // strip out numeric prefixes for URLs
    slug = slug.split('/').map(part => part.replace(/^\d+-/, '')).join('/');
    
    if (slug.toLowerCase() === 'home/index' || slug.toLowerCase() === 'home') {
      slug = '';
    } else if (slug.endsWith('/index')) {
      slug = slug.replace(/\/index$/, '');
    }

    const routePath = `/${slug.toLowerCase()}`;
    const filename = relativePath.split('/').pop()?.replace(/\.md$/, '') || '';
    let title = filename.replace(/^\d+-/, '');
    
    if (title === 'index') {
       title = relativePath.split('/')[relativePath.split('/').length - 2]?.replace(/^\d+-/, '') || 'Home';
    }

    routes.push({
      title,
      path: routePath,
      filePath: relativePath,
      getContent: modules[path] as () => Promise<string>,
    });
  }

  // Sort by filePath
  routes.sort((a, b) => a.filePath.localeCompare(b.filePath));

  return routes;
}

export function getMarkdownTree(): TreeDataItem[] {
  const routes = getMarkdownRoutes();
  const root: TreeDataItem[] = [];
  
  for (const route of routes) {
    const parts = route.filePath.split('/');
    let currentLevel = root;
    
    for (let i = 0; i < parts.length; i++) {
      const isLast = i === parts.length - 1;
      const rawPart = parts[i];
      const name = rawPart.replace(/^\d+-/, '').replace(/\.md$/, '');
      const id = parts.slice(0, i + 1).join('/'); // unique id based on file path
      
      let node = currentLevel.find(n => n.id === id);
      
      if (!node) {
        if (isLast) {
          if (name === 'index' && i > 0) {
             node = { id: route.path, name: 'Overview' };
          } else {
             node = { id: route.path, name: name };
          }
        } else {
          node = { id, name, children: [] };
        }
        currentLevel.push(node);
      } else {
          // If a node already exists but we are at the leaf and it's 'index'
          if (isLast && name === 'index' && node.children) {
              node.children.unshift({
                  id: route.path,
                  name: 'Overview'
              });
          }
      }
      
      if (!isLast) {
        if (!node.children) node.children = [];
        currentLevel = node.children;
      }
    }
  }
  
  return root;
}
