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


using a tool

```bash
uvx --from git+https://github.com/bartdorlandt/convert_poetry2uv convert-poetry2uv pyproject.toml
```

## References

- [UV Homepage](https://docs.astral.sh/uv/)
- [Poetry to UV](https://pypi.org/project/poetry-to-uv/) - another tool that does the same thing.
- [uv-part-1](https://blog.stephenturner.us/p/uv-part-1-running-scripts-and-tools) by Stephen Turner
- and [uv-part-2](https://blog.stephenturner.us/p/uv-part-2-building-and-publishing-packages)


