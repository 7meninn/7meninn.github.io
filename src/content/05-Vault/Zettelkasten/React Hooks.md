---
topic: frontend
---

# ⚛️ React Hooks

Hooks let you use state and other React features without writing a class.

```javascript
import { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <button onClick={() => setCount(count + 1)}>
      Click me
    </button>
  );
}
```

Used extensively in the [[Portfolio]] codebase.
