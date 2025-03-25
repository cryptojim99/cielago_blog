# Search Widget Implementation

This document explains the search widget implementation for the Cielago blog using elasticlunr.

## Overview

The search widget provides a minimalist search experience with:
- A search icon next to the theme toggle
- A search input that appears when the icon is clicked
- Dynamic search results shown in a dropdown
- Support for both light and dark themes

## Files Added/Modified

1. **Updated config.toml**:
   - Added elasticlunr search configuration

2. **Created static/css/search.css**:
   - Styles for search icon, input, and results
   - Responsive design for mobile devices
   - Dark/light mode support

3. **Created static/js/search.js**:
   - Search functionality using elasticlunr
   - Results highlighting and formatting
   - Keyboard navigation support

4. **Modified theme templates**:
   - Added search icon and input container
   - Added CSS and JavaScript includes

## How It Works

1. Zola generates a search index at build time (`search_index.en.json`)
2. The search widget loads this index when the page loads
3. When a user clicks the search icon, the search input appears
4. As the user types, results are filtered and displayed below the input
5. Results show title and description with matching terms highlighted
6. Clicking a result navigates to the relevant page

## Design Decisions

- **Positioning**: The search is positioned as an overlay to prevent layout shifting
- **Styling**: Uses consistent styling with the site's theme (including dark mode)
- **Icon**: Uses the Bootstrap search icon for clarity
- **UX**: Includes keyboard support (Escape to close) and debounced searching

## Usage

Simply click the search icon (🔍) next to the theme toggle to start searching. Type to see matching results, and click on a result to navigate to that page.