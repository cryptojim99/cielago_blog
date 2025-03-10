+++
title = "Notes on using uv"
date = "2025-03-10"
template = "page.html"
description = ""
draft = true

[taxonomies]
tags = [ "build tools", "rust", "python" ]
+++ 


## Migration from Poetry


using a tools

```bash
uvx --from git+https://github.com/bartdorlandt/convert_poetry2uv convert-poetry2uv pyproject.toml
```

## References

- [Poetry to UV](https://pypi.org/project/poetry-to-uv/) - another tool that does the same thing.