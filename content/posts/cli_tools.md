+++
title = "Useful CLI tools - many in Rust"
date = "2025-03-02"
template = "page.html"
description = ""

[taxonomies]
tags = ["cli", "tools", "rust"]
+++

## Overview

Recently there has been a trend of rewriting or replacing common system cli tools in rust, and some outright completely new tools filling additional niches. Possibly because rust is such a great systems programming language, but also in some cases people are looking for a relatively simple project to learn rust, and so re-writing an existing tool is a relatively straightforward first project. As a result, while there are some truly excellent tools out there, there are just as many that have been quickly abandoned by their owners. below is the list of tools that I find myself installing on any new *nix* system, whether it's a remote host I use for dev, or a local WSL or MacOs instance. 

I'll attempt to update this as I make changes. But it will always remain *my* personal preferences. For a more objective summary of the available tools see the links in [References](#references)

While *some* of these tools come with installers, I often just use ```cargo install <tool>``` where available. That way I can be sure of having the latest version, and I quite like the feeling of compiling everything from scratch. Echoes of [Gentoo](https://www.gentoo.org/) Linux :).

## Specific Tools 

- [eza](https://github.com/eza-community/eza) : ls replacement. Adds colors, icons and a bunch of other enhancements.
- [lla](https://github.com/chaqchase/lla) : Another (newer) ls replacement. Comes with git integration, timeline view, a complete plugin system and more. This one is brand new ( as of March 2025 ), but looks much more ambitions.
- [zellij](https://zellij.dev/) : awesome tmux alternative. Super easy to use for newbies, with a discoverable ui and set of shortcuts.
- [fd](https://github.com/sharkdp/fd) : Find replacement.
- [fish Shell](https://fishshell.com/) : Fish shell - newly re-written in Rust !
- [nushell](https://www.nushell.sh/) : Another shell, bsed on data pipelines, built from the start in rust. Kinda like powershell but more unixy.
- [Helix](https://helix-editor.com/) Editor
- [Dysx](https://github.com/Canop/dysk) - Yet another file system lister.
- [Zola](https://www.getzola.org/) - The Static Site generator behind this blog.

## Screenshots

Dysk

![Dysk](/imgs/dysk_screenshot.jpg)

Zellij

![Zellij](/imgs/zellij_screenshot.jpg)

## References {#references}

- [Terminal Trove](https://terminaltrove.com/)
- [Awesome Rust Tools](https://github.com/unpluggedcoder/awesome-rust-tools)
- [Awesome CLI Rust](https://github.com/matu3ba/awesome-cli-rust)