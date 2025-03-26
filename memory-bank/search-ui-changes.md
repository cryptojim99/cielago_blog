# Search UI Changes

## Requirements
1. Move the search icon to be the first item in the menu, followed by the vertical separator and then Home link
2. Center the popup in the middle of the screen

## Implementation Plan

### HTML Changes (head.html)
1. Move the search wrapper div to appear before any menu items
2. Place the vertical separator after the search icon
3. Keep the rest of the search HTML structure intact

### CSS Changes (search.css)
1. Update search-container positioning to center it in the viewport
2. Adjust search-results positioning to maintain proper alignment with the search input
3. Ensure proper z-index and animation for the centered popup

## Code Changes

### For themes/archie-zola/templates/partials/head.html:

```html
<header>
    <div class="main" id="main_title">
        <a href={{ config.base_url }}>{{ config.title }}</a>
    </div>

    <nav>
        <!-- Search wrapper - moved to be the first item -->
        <div class="search-wrapper">
            <!-- Search icon -->
            <a href="#" class="search-icon" id="search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </a> |
            
            <!-- Search container -->
            <div class="search-container">
                <input type="text" id="search" placeholder="Search...">
                <div class="search-results">
                    <div class="search-results__items"></div>
                </div>
            </div>
        </div>
        
        {% for menu in config.extra.translations[lang][0].menus %}
            <a href={{ menu.url }}>{{ menu.name }}</a>
        {% endfor %}

        {% if config.extra.mode == "toggle" %}
            | <a id="dark-mode-toggle" onclick="toggleTheme()" href=""></a>
            <script src={{ get_url(path="js/themetoggle.js") }}></script>
        {% endif %}
    </nav>
</header>
```

### For static/css/search.css (add to the end of the file):

```css
/* Center the search container in the middle of the viewport */
.search-container {
  position: fixed; /* Change to fixed position */
  left: 50%; /* Center horizontally */
  top: 40%; /* Position vertically in the viewport */
  transform: translate(-50%, -50%); /* Center the element itself */
  z-index: 1000;
  width: 300px; /* Fixed width for better centering */
}

/* Adjust search results to stay aligned with the search input */
.search-results {
  position: absolute;
  top: 38px; /* Position below the search box */
  left: 0; /* Align with the search input */
  width: 100%; /* Full width of container */
}