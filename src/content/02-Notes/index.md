# Python Quick Reference Notes

Welcome to my Python notes! This page serves as a test for all the Markdown features our new portfolio supports.

---

## 1. Code Blocks & Syntax Highlighting

Here is a quick example of a Python function, demonstrating **inline code** like `print()` and full block formatting:

```python
def fibonacci(n):
    """Generate the Fibonacci sequence up to n."""
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence

print(fibonacci(10))
```

## 2. Lists & Task Lists

### Topics to cover:
- [x] Variables and Data Types
- [x] Control Flow (`if`, `for`, `while`)
- [ ] Object-Oriented Programming
- [ ] Asyncio and Concurrency

### Why Python?
1. It's incredibly readable.
2. Huge ecosystem of libraries.
3. Great for AI and Data Science.

## 3. Tables (GitHub Flavored Markdown)

| Data Type | Example | Mutable? |
| :--- | :--- | :--- |
| `int` | `x = 42` | No |
| `list` | `items = [1, 2, 3]` | **Yes** |
| `tuple` | `coords = (10, 20)` | No |
| `dict` | `user = {"name": "Alice"}` | **Yes** |

## 4. Blockquotes

> "Beautiful is better than ugly.
> Explicit is better than implicit.
> Simple is better than complex."
> 
> — *The Zen of Python, by Tim Peters*

## 5. Links and Images

You can easily link to the [Official Python Documentation](https://docs.python.org/3/).

And here is a test for rendering an external GIF directly in the markdown:

![Python Dancing GIF](https://media.giphy.com/media/KAq5w47R9rmTuvITEs/giphy.gif)

---

*This is a test document to showcase headings, lists, checkboxes, tables, code formatting, blockquotes, links, and images working harmoniously together!*
