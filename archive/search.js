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
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const items = this.searchResultsItems.querySelectorAll('.search-results__item a');
      if (!items.length) return;

      const currentIndex = Array.from(items).findIndex(item => item === document.activeElement);
      let nextIndex;

      if (e.key === 'ArrowDown') {
        nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      }

      items[nextIndex].focus();
    }

    if (e.key === 'Enter' && document.activeElement === this.searchInput) {
      const firstItem = this.searchResultsItems.querySelector('.search-results__item a');
      if (firstItem) {
        e.preventDefault();
        firstItem.focus();
      }
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
      this.searchResults.style.opacity = '1';
      this.searchResults.style.visibility = 'visible';
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

  performSearch() {
    const query = this.searchInput.value.trim();
    
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
    
    displayResults.forEach(result => {
      const resultItem = document.createElement('div');
      resultItem.className = 'search-results__item';
      
      const link = document.createElement('a');
      // Convert localhost URLs to relative paths
      const url = new URL(result.ref);
      link.href = url.pathname;
      
      // Get the document from the store
      const doc = this.documentStore[result.ref];
      if (!doc) {
        console.error('Document not found in store:', result.ref);
        return;
      }

      const title = document.createElement('div');
      title.className = 'search-results__title';
      title.textContent = doc.title || url.pathname.split('/').pop() || 'Untitled';
      
      const description = document.createElement('div');
      description.className = 'search-results__description';
      
      // Get a snippet of text around the first match
      const snippet = this.getSnippet(doc.body, 150);
      description.textContent = snippet;
      
      link.appendChild(title);
      link.appendChild(description);
      resultItem.appendChild(link);
      this.searchResultsItems.appendChild(resultItem);
    });

    // Show results with transition
    this.searchResults.style.opacity = '1';
    this.searchResults.style.visibility = 'visible';
  }

  getSnippet(text, length) {
    if (!text) return '';
    
    // If text is shorter than desired length, return it all
    if (text.length <= length) return text;
    
    // Find a good breaking point near the middle
    const middle = Math.floor(length / 2);
    const start = text.lastIndexOf(' ', middle);
    const end = text.indexOf(' ', middle + length/2);
    
    // If we can't find good break points, just cut at length
    const snippetStart = start > 0 ? start : 0;
    const snippetEnd = end > 0 ? end : length;
    
    return text.substring(snippetStart, snippetEnd) + '...';
  }
}

// Initialize search when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Search();
});