// Search functionality with debouncing
class Search {
  constructor() {
    // Check if elasticlunr is loaded
    if (typeof elasticlunr === 'undefined') {
      console.error('elasticlunr library not loaded');
      return;
    }

    // Initialize properties
    this.searchIndex = null;
    this.searchWrapper = document.querySelector('.search-wrapper');
    this.searchResults = document.querySelector('.search-results');
    this.searchResultsItems = document.querySelector('.search-results__items');
    this.searchInput = document.getElementById('search');
    this.searchIcon = document.getElementById('search-icon');
    this.searchContainer = document.querySelector('.search-container');
    this.searchBackdrop = document.querySelector('.search-backdrop');
    this.isActive = false;
    this._searchTimeout = null;
    this.currentQuery = '';

    // Check if all required elements are found
    if (!this.searchWrapper || !this.searchResults || !this.searchResultsItems ||
        !this.searchInput || !this.searchIcon || !this.searchContainer || !this.searchBackdrop) {
      console.error('Required search elements not found');
      return;
    }

    this.init();
  }

  init() {
    // Load the search index
    const baseUrl = window.location.origin;
    const indexUrl = `${baseUrl}/search_index.en.json`;
    console.log('Loading search index from:', indexUrl);

    fetch(indexUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (!data) {
          throw new Error('Search index is empty');
        }
        console.log('Search index loaded successfully');

        // Load the index
        try {
          this.searchIndex = elasticlunr.Index.load(data);
          console.log('Search index loaded and parsed');
          
          // Store the document store for later use
          this.documentStore = data.documentStore.docs;
          console.log('Document store loaded:', Object.keys(this.documentStore).length, 'documents');
          
          // Test the index
          const testQuery = 'test';
          const testResults = this.searchIndex.search(testQuery);
          console.log('Test search results:', testResults);
        } catch (e) {
          console.error('Error loading search index:', e);
          throw e;
        }
      })
      .catch(error => {
        console.error('Failed to load search index:', error);
      });

    // Set up event listeners
    this.searchIcon.addEventListener('click', this.toggleSearch.bind(this));
    this.searchBackdrop.addEventListener('click', this.hideSearch.bind(this));
    this.searchInput.addEventListener('input', this.onSearchInput.bind(this));
    this.searchInput.addEventListener('keydown', this.onKeyDown.bind(this));
    this.searchResults.addEventListener('keydown', this.onKeyDown.bind(this));

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isActive) {
        this.hideSearch();
      }
    });
  }

  onSearchInput() {
    clearTimeout(this._searchTimeout);
    this._searchTimeout = setTimeout(() => this.performSearch(), 300);
  }

  onKeyDown(e) {
    const items = this.searchResultsItems.querySelectorAll('.search-results__item a');
    if (!items.length) return;

    const currentIndex = Array.from(items).findIndex(item => item === document.activeElement);
    let nextIndex = currentIndex;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        items[nextIndex].focus();
        break;

      case 'ArrowUp':
        e.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        items[nextIndex].focus();
        break;

      case 'Enter':
        if (document.activeElement === this.searchInput && items.length) {
          e.preventDefault();
          items[0].focus();
        }
        break;

      case 'Tab':
        // Allow normal tab behavior but ensure focus stays within the search modal
        if (e.shiftKey && document.activeElement === this.searchInput) {
          e.preventDefault();
          items[items.length - 1].focus();
        } else if (!e.shiftKey && document.activeElement === items[items.length - 1]) {
          e.preventDefault();
          this.searchInput.focus();
        }
        break;
    }
  }

  toggleSearch(e) {
    e && e.preventDefault();
    this.isActive ? this.hideSearch() : this.showSearch();
  }

  showSearch() {
    this.searchBackdrop.classList.add('active');
    this.searchResultsItems.innerHTML = '';
    this.isActive = true;
    this.searchContainer.classList.add('active');
    
    setTimeout(() => {
      this.searchInput.focus();
      // Don't show results panel until there are results
      this.searchResults.style.opacity = '0';
      this.searchResults.style.visibility = 'hidden';
    }, 100);

    document.body.style.overflow = 'hidden';
  }

  hideSearch() {
    this.isActive = false;
    this.searchContainer.classList.remove('active');
    this.searchBackdrop.classList.remove('active');
    
    this.searchResults.style.opacity = '0';
    this.searchResults.style.visibility = 'hidden';
    
    setTimeout(() => {
      if (!this.isActive) {
        this.searchInput.value = '';
        this.searchResultsItems.innerHTML = '';
      }
    }, 300);

    document.body.style.overflow = '';
  }

  highlightText(text, query) {
    if (!text) return '';
    if (!query) return text;

    const words = query.trim().toLowerCase().split(/\s+/);
    let result = text;
    
    words.forEach(word => {
      if (word.length < 2) return;
      const regex = new RegExp(`(${word})`, 'gi');
      result = result.replace(regex, '<span class="search-results__highlight">$1</span>');
    });

    return result;
  }

  getSnippet(text, query, length = 150) {
    if (!text) return '';
    if (text.length <= length) return text;

    const words = query.trim().toLowerCase().split(/\s+/);
    const textLower = text.toLowerCase();
    
    // Find the first match position
    let matchPos = -1;
    for (const word of words) {
      if (word.length < 2) continue;
      const pos = textLower.indexOf(word);
      if (pos !== -1) {
        matchPos = pos;
        break;
      }
    }

    // If no match found, use the middle of the text
    if (matchPos === -1) {
      const middle = Math.floor(length / 2);
      const start = text.lastIndexOf(' ', middle);
      const end = text.indexOf(' ', middle + length/2);
      const snippetStart = start > 0 ? start : 0;
      const snippetEnd = end > 0 ? end : length;
      return text.substring(snippetStart, snippetEnd) + '...';
    }

    // Get text around the match
    const snippetStart = Math.max(0, matchPos - length/2);
    const snippetEnd = Math.min(text.length, matchPos + length/2);
    let snippet = text.substring(snippetStart, snippetEnd);

    // Ensure we start and end at word boundaries
    if (snippetStart > 0) {
      const firstSpace = snippet.indexOf(' ');
      if (firstSpace > 0) {
        snippet = '...' + snippet.substring(firstSpace + 1);
      }
    }
    if (snippetEnd < text.length) {
      const lastSpace = snippet.lastIndexOf(' ');
      if (lastSpace !== -1) {
        snippet = snippet.substring(0, lastSpace) + '...';
      }
    }

    return snippet;
  }

  performSearch() {
    const query = this.searchInput.value.trim();
    this.currentQuery = query;
    
    if (!query || query.length < 2) {
      this.searchResults.style.opacity = '0';
      this.searchResults.style.visibility = 'hidden';
      this.searchResultsItems.innerHTML = '';
      return;
    }

    if (!this.searchIndex || !this.documentStore) {
      console.error('Search index not loaded yet');
      const errorMsg = document.createElement('div');
      errorMsg.className = 'search-results__empty';
      errorMsg.innerHTML = 'Search functionality is still initializing. Please try again in a moment.';
      this.searchResultsItems.innerHTML = '';
      this.searchResultsItems.appendChild(errorMsg);
      this.searchResults.style.opacity = '1';
      this.searchResults.style.visibility = 'visible';
      return;
    }

    this.searchContainer.classList.add('loading');

    try {
      console.log('Performing search for:', query);
      const results = this.searchIndex.search(query);
      console.log('Raw search results:', results);

      setTimeout(() => {
        this.searchContainer.classList.remove('loading');
      }, 300);

      if (!results || results.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'search-results__empty';
        noResults.innerHTML = `No results found for <strong>${this.searchInput.value}</strong>`;
        this.searchResultsItems.innerHTML = '';
        this.searchResultsItems.appendChild(noResults);
        this.searchResults.style.opacity = '1';
        this.searchResults.style.visibility = 'visible';
        return;
      }

      this.displayResults(results);
    } catch (error) {
      console.error('Search error:', error);
      this.searchContainer.classList.remove('loading');
      
      const errorMsg = document.createElement('div');
      errorMsg.className = 'search-results__empty';
      errorMsg.innerHTML = `An error occurred while searching: ${error.message}`;
      this.searchResultsItems.innerHTML = '';
      this.searchResultsItems.appendChild(errorMsg);
      this.searchResults.style.opacity = '1';
      this.searchResults.style.visibility = 'visible';
    }
  }
displayResults(results) {
  this.searchResultsItems.innerHTML = '';
  
  // Limit to top 8 results
  const displayResults = results.slice(0, 8);
  let firstLink = null;
  
  displayResults.forEach((result, index) => {
    const resultItem = document.createElement('div');
    resultItem.className = 'search-results__item';
    
    const link = document.createElement('a');
    // Convert localhost URLs to relative paths
    const url = new URL(result.ref);
    link.href = url.pathname;
    
    // Store reference to first link
    if (index === 0) {
      firstLink = link;
    }
      link.href = url.pathname;
      
      // Get the document from the store
      const doc = this.documentStore[result.ref];
      if (!doc) {
        console.error('Document not found in store:', result.ref);
        return;
      }

      const title = document.createElement('div');
      title.className = 'search-results__title';
      title.innerHTML = this.highlightText(doc.title || url.pathname.split('/').pop() || 'Untitled', this.currentQuery);
      
      const description = document.createElement('div');
      description.className = 'search-results__description';
      
      // Get a snippet of text around the matches
      const snippet = this.getSnippet(doc.body, this.currentQuery, 150);
      description.innerHTML = this.highlightText(snippet, this.currentQuery);
      
      link.appendChild(title);
      link.appendChild(description);
      resultItem.appendChild(link);
      this.searchResultsItems.appendChild(resultItem);
    });

    // Show results with transition
    this.searchResults.style.opacity = '1';
    this.searchResults.style.visibility = 'visible';

    // Focus the first result if available
    if (firstLink) {
      // Small delay to ensure the focus works after the transition
      setTimeout(() => {
        firstLink.focus();
      }, 100);
    }
  }
}

// Initialize search when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Search();
});