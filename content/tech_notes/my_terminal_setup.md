+++
title = "My Terminal Setup"
date = "2025-03-22"
template = "page.html"
description = ""
draft = true

[taxonomies]
tags = [ "terminal", "tools" ]
+++

# Introduction

Many developers tend to be particular about their choice of tools and terminal setup in particular is something that people like to tweak and get just-right. I guess I'm no different, and while you can find any number of similar - 'This is my terminal setup' posts around the web, this is mine to add to the pile :).

## TL;DR - My Tool Choices

- [Fish Shell](https://fishshell.com/) - Primary shell for Linux/Mac with great autocompletion and syntax highlighting
- [Nushell](https://www.nushell.sh/) - Windows shell alternative to PowerShell with structured data pipelines
- [Windows Terminal](https://github.com/microsoft/terminal) - Modern terminal emulator for Windows with tabbed interface
- [iTerm2](https://iterm2.com/) - Feature-rich terminal emulator for macOS
- [Termius](https://termius.com/) - Cross-platform SSH client with sync and collaboration features
- [Zellij](https://zellij.dev/) - Terminal multiplexer with discoverable interface and modern features
- [Oh My Posh](https://ohmyposh.dev/) - Cross-shell prompt theming with consistent experience across platforms

# Detailed Breakdown of Tools

## Shell

After much trial and error with various shells, I've settled on [Fish](https://fishshell.com/) for Linux/Mac and [Nushell](https://www.nushell.sh/) for Windows as my primary shells. Here's why:

### Fish Shell

Fish has become my go-to shell for its excellent interactive experience and modern features. Unlike traditional shells that require extensive configuration (like Zsh with Oh My Zsh), Fish provides a polished experience right out of the box.

**What makes Fish special:**
- **Intelligent Autocompletion:** As you type commands, Fish suggests completions based on your command history and available commands. For example, typing `git ` will immediately show common git commands.
- **Syntax Highlighting:** Colors commands as you type them - valid commands appear in one color, while invalid ones show in red. This immediate feedback helps catch typos before execution.
- **Web-based Configuration:** The `fish_config` command launches a browser-based interface for changing colors, viewing functions, and managing completions. To be honest I rarely use this. I'm generally fine editing config.fish.
- **Clean Scripting Syntax:** More consistent and readable than traditional shells, though not POSIX-compatible.

Compared to Zsh, Fish requires less configuration to achieve a great interactive experience. While Zsh can be customized to match Fish's features through plugins, I prefer Fish's out-of-the-box approach.

### Nushell vs PowerShell

For Windows, I've chosen [Nushell](https://www.nushell.sh/) as it provides a more intuitive experience compared to PowerShell. mention the object / data pipeline approaches. "Powershell done right. Then talk about the great completion functions, scripting language with examples and references. Then lastly - vs Fish for linux.

Here are some examples of the more efficient syntax vs powershell :

**Verbosity Comparison:**

1. Listing large files:
   ```powershell
   Get-ChildItem | Where-Object { $_.Length -gt 1MB } | Sort-Object LastWriteTime -Descending
   ```
   ```nu
   ls | where size > 1mb | sort-by modified | reverse
   ```

2. Finding processes:
   ```powershell
   Get-Process | Where-Object { $_.WorkingSet -gt 100MB } | Select-Object ProcessName, Id
   ```
   ```nu
   ps | where mem > 100mb | select name pid
   ```

**Unintuitive Syntax:**
PowerShell's syntax can be confusing for users coming from Unix-like shells:
- Aliases like `ls` and `cd` exist but behave differently
- Piping uses objects instead of text streams
- Common Unix tools like `grep`, `find`, and `ps` aren't available without additional installations

**Missing Core Utilities:**
Without installing Cygwin or Windows Subsystem for Linux:
- No standard Unix tools like `grep`, `awk`, `sed`
- Different process management commands
- Inconsistent path handling between Windows and Unix-style paths

**Why Nushell is Better:**
- **Structured Data Pipelines:** Treats data as structured rather than plain text
- **Type Inference:** Automatically detects and converts data types
- **Familiar Syntax:** Closer to traditional shells than PowerShell
- **Modern Features:** Built-in support for common data formats (JSON, CSV)

While Nushell is still pre-1.0, it's already a compelling alternative for Windows users who want a more traditional shell experience with modern features.

## Terminal Emulator

### Windows Terminal
[Windows Terminal](https://github.com/microsoft/terminal) has completely replaced the old Command Prompt and PowerShell windows for me. Here's why it's superior:

1. **Modern Rendering:**
   - GPU-accelerated text rendering makes scrolling smooth and fast
   - Full Unicode and emoji support (try displaying Japanese text or emojis in old Command Prompt)
   - Better font rendering with support for ligatures

2. **Tabbed Interface:**
   - Multiple tabs for different shells (CMD, PowerShell, WSL)
   - Easy tab management with keyboard shortcuts
   - Customizable tab colors for different environments

3. **Configuration:**
   - JSON-based configuration file for easy customization
   - Create profiles for different shells or environments
   - Extensive theming options

4. **Integration:**
   - Native WSL (Windows Subsystem for Linux) support
   - Better handling of ANSI escape codes
   - Improved copy/paste functionality

Compared to the old Command Prompt, Windows Terminal feels like stepping into the 21st century. The difference is especially noticeable when working with modern tools and shells. #TODO - mention cmder, ConEmu etc ... are they still around ?

### iTerm2 (macOS)
[iTerm2](https://iterm2.com/) is my current choice on macOS with features like:
- Split panes for multitasking
- Instant search through terminal history
- Customizable hotkeys
- Enhanced shell integration

While iTerm2 is excellent, I'm keeping an eye on [Ghostty](https://ghostty.app/) as a potential alternative with its cloud sync and collaboration features.

### Termius (Remote SSH)
For remote SSH sessions, I use [Termius](https://termius.com/) because:
- Cross-platform sync keeps SSH configs consistent
- Built-in SFTP for file transfers
- Team collaboration features
- Mosh support for unstable connections

While not open source, Termius provides excellent value for its price.

## Terminal Multiplexer

A terminal multiplexer lets you manage multiple terminal sessions within a single window. This is particularly useful for:
- Running multiple commands simultaneously
- Keeping sessions alive when disconnected
- Organizing complex workflows

### Why Zellij?
[Zellij](https://zellij.dev/) has become my multiplexer of choice because of its excellent balance between power and usability:

1. **Discoverable Interface:**
   - Persistent help bar shows available commands
   - Interactive command palette (Ctrl+p) for exploring features
   - Visual feedback for pane operations
   - Built-in tutorial mode for learning shortcuts
   - Context-sensitive help that shows relevant commands
   - Discover-as-you-go interface reduces memorization

2. **Modern Interface:**
   - Built-in status bar with useful information
   - Tabbed interface with visual indicators
   - Mouse support for pane resizing
   - Customizable themes and layouts
   - Floating panes for temporary commands

3. **Ease of Use:**
   - Default configuration works well out of the box
   - Intuitive keybindings (Ctrl+g as prefix)
   - Built-in command palette
   - Discoverable features reduce learning curve
   - No need to memorize complex keybindings

4. **Advanced Features:**
   - Layouts can be saved and shared
   - Plugin system for extending functionality
   - Built-in session manager
   - Scrollback buffer with search
   - Session persistence across reboots

The discoverability of Zellij's interface is a game-changer compared to tmux. Instead of needing to memorize dozens of keybindings, you can:
- Press `?` to see all available commands
- Use the command palette to search for features
- See visual feedback for every action
- Explore features through the interactive interface

This makes Zellij much more approachable for new users while still being powerful enough for advanced workflows. The ability to discover features as you need them, rather than having to memorize everything upfront, significantly reduces the learning curve.

## Prompt Theming

Let's talk about prompt theming - the art of making your shell prompt both functional and beautiful. I'll admit, I used to think fancy prompts were just eye candy, but over time I've come to appreciate how much they can improve my workflow.

### Why Bother with Prompt Theming?

A good prompt can:
- Show me which git branch I'm on and if I have uncommitted changes
- Warn me when I'm in a production environment
- Display how long commands took to run
- Give me visual feedback when commands fail
- Show me which Python virtualenv is active

It's like having a dashboard for your terminal. The key is finding the right balance between useful information and visual clutter.

### My Choice: Oh My Posh

After trying several prompt theming tools, I've settled on [Oh My Posh](https://ohmyposh.dev/). Here's why:

1. **It Just Works Everywhere:**
   - Same prompt on Windows, macOS, and Linux
   - Works with all major shells
   - No weird platform-specific quirks

2. **Easy to Set Up:**
   - Install with a single command
   - Tons of pre-built themes to choose from
   - Simple configuration file format

3. **Actively Maintained:**
   - Regular updates with new features
   - Great documentation
   - Responsive maintainers

### My Current Setup

Here's what my prompt looks like in action:

![My Oh My Posh Prompt](/imgs/my_prompt.png)

I'm using the "quick-term" theme that provides:
- Compact, single-line layout
- Git branch and status indicators
- Current directory path
- Command execution time
- Clean, minimal design

The screenshot above shows:
1. Current directory path
2. Git branch and status indicators
3. Command execution time
4. Clean, single-line layout
5. Minimal color scheme for better readability

### The Minimalist Perspective

Of course, not everyone loves fancy prompts. Some valid reasons to keep it simple:
- Faster load times, especially on remote servers
- Less distraction from the actual work
- Easier to maintain across different machines

I respect the minimalist approach, but for me, the benefits of a well-configured prompt outweigh the costs. It's become an essential part of my terminal setup.

## Tools and Utilities

See more documented at [CLI Tools](../posts/cli_tools.md)

# Conclusion

TODO: Write conclusion

# References

TODO: add links
