+++
title = "Github Monaspace fonts"
date = "2025-03-09"
template = "page.html"
description = ""
#draft = true
[taxonomies]
tags = [ "fonts", "github", "css" ]
+++ 


I've always been a bit of a font nerd. Especially once more fixed width coding fonts came out like  [Consolas](https://learn.microsoft.com/ja-jp/typography/font-list/consolas), but even more now that we have things like Ligatures, nerd fonts, powerline fonts etc. 

The latest I've been using, is a series of fonts from Github called monspace, one of which (neon) I've using for this site.

## Ligatures

<!-- --> <-- ->> <<- -> <- <--> => <=> <==> ==> <== >>= =<< -- := =:= == === !== != <= >= // /** /* */ && .& || !! :: >> << ¯\_(ツ)_/¯ __ ___ .. ...  ~- -~ &= <|> {| |} #[ #( ;;; @_

- SIMILAR = "oO08 iIlL1 g9qCGQ"
- DIACRITICS_ETC = "â é ù ï ø ç Ã Ē Æ œ"

## Nerd Fonts 

Included with the new 1.200 [release](https://github.com/githubnext/monaspace/releases/tag/v1.200). Some examples :

     ~/ 

## Using on web pages

This is common for serving *any* web font, but was something new for me - so adding here for reference.

### *Step 1* : Download the Monaspace Font Files

You can download the Monaspace font files from GitHub's Monaspace repository or another trusted source. The font files typically come in formats like .woff, .woff2, .ttf, etc.

For example, you might download:

- MonaspaceArgon-Regular.woff2
- MonaspaceArgon-Bold.woff2
- MonaspaceArgon-Italic.woff2

### *Step 2*: Place the Font Files in Your Zola Project

In your Zola project, create a directory to store the font files. For example, you can place them in a folder like static/fonts/.

Your project structure might look like this:

```
your-zola-project/
├── content/
├── static/
│   └── fonts/
│       ├── MonaspaceArgon-Regular.woff2
│       ├── MonaspaceArgon-Bold.woff2
│       └── MonaspaceArgon-Italic.woff2
├── templates/
├── themes/
└── config.toml
```

### *Step 3*: Reference the Fonts in Your CSS

Create or update your styles.css file to include the @font-face rule and apply the font to your elements.

Here’s an example:

```css
/* Define the Monaspace Argon font */
@font-face {
    font-family: 'Monaspace Argon';
    src: url('/fonts/MonaspaceArgon-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'Monaspace Argon';
    src: url('/fonts/MonaspaceArgon-Bold.woff2') format('woff2');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'Monaspace Argon';
    src: url('/fonts/MonaspaceArgon-Italic.woff2') format('woff2');
    font-weight: normal;
    font-style: italic;
}

/* Apply the font to your site */
body {
    font-family: 'Monaspace Argon', monospace;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Monaspace Argon', monospace;
}

code, pre {
    font-family: 'Monaspace Argon', monospace;
}
```

### *Step 4*: Ensure the Fonts Are Served Correctly

Zola’s static/ directory is served at the root of your site. For example, if you place a file in static/fonts/MonaspaceArgon-Regular.woff2, it will be accessible at /fonts/MonaspaceArgon-Regular.woff2.

Make sure your styles.css file is linked in your base.html template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Zola Site</title>
    <link rel="stylesheet" href="">
</head>
<body>
    <!-- Your content here -->
</body>
</html>

```

### *Step 5* : Build and Test Your Site

Run ```zola build``` to generate your site.

Serve the site locally using ```zola serve``` and check that the fonts are loading correctly.

Use your browser’s developer tools to inspect the fonts and ensure they’re applied as expected.

Example Project Structure
Here’s what your project might look like after adding the fonts:

```
your-zola-project/
├── content/
├── static/
│   └── fonts/
│       ├── MonaspaceArgon-Regular.woff2
│       ├── MonaspaceArgon-Bold.woff2
│       └── MonaspaceArgon-Italic.woff2
├── templates/
│   └── base.html
├── styles/
│   └── styles.css
├── themes/
└── config.toml
```


### Notes

- Font Formats: Include multiple formats (e.g., .woff2, .woff, .ttf) for better browser compatibility.
- Performance: Use woff2 as the primary format because it’s highly compressed and widely supported.
- Licensing: Ensure you comply with the font’s license when hosting it on your server.

## References

- [Monaspace](https://monaspace.githubnext.com/) Main page
- [Monaspace github](https://github.com/githubnext/monaspace)
- [Julia Mono](https://juliamono.netlify.app/) another great looking coding and engineering font.
- Other Fonts I quite like
  - [Monoid](https://larsenwork.com/monoid/)
  - FiraCode, CaskaydiaCove at [NerdFonts](https://www.nerdfonts.com/)
  - The original [Cascadia Code](https://devblogs.microsoft.com/commandline/cascadia-code-2404-23/) from microsoft, which now *also* includes Nerd Fonts
- And [Programming Fonts](https://www.programmingfonts.org/) - the mother lode 
