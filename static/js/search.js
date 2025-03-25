// Based on the Zola search implementation
// Modified for a minimalist search experience

function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// Search functionality
class Search {
  constructor() {
    this.searchIndex = null;
    this.searchWrapper = document.querySelector('.search-wrapper');
    this.searchResults = document.querySelector('.search-results');
    this.searchResultsItems = document.querySelector('.search-results__items');
    this.searchInput = document.getElementById('search');
    this.searchIcon = document.getElementById('search-icon');
    this.searchContainer = document.querySelector('.search-container');
    this.isActive = false;
    
    this.bindEvents();
    this.loadSearchIndex();
  }
  
  loadSearchIndex() {
    fetch('/search_index.en.json')
      .then(response => response.json())
      .then(data => {
        this.searchIndex = elasticlunr.Index.load(data);
      })
      .catch(e => {
        console.error('Error loading search index:', e);
      });
  }
  
  bindEvents() {
    
    // Toggle search box visibility
    this.searchIcon.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent the link from navigating
      e.stopPropagation();
      this.toggleSearch(e);
    });
    
    // Close search when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isActive &&
          !this.searchWrapper.contains(e.target)) {
        this.hideSearch();
      }
    });
    // Perform search on input
    this.searchInput.addEventListener('input', 
      debounce(this.performSearch.bind(this), 150)
    );
    
    // Handle keypress events
    this.searchInput.addEventListener('keydown', (e) => {
      // Escape key
      if (e.key === 'Escape') {
        this.hideSearch();
      }
    });
  }
  
  toggleSearch(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (this.isActive) {
      this.hideSearch();
    } else {
      this.showSearch();
    }
  }
  
  showSearch() {
    // Ensure any previous results are cleared
    this.searchResultsItems.innerHTML = '';
    this.searchResults.style.display = 'none';
    
    // Show the search input
    this.isActive = true;
    this.searchContainer.classList.add('active');
    
    // Focus the input after the animation completes
    setTimeout(() => this.searchInput.focus(), 100);
  }
  
  hideSearch() {
    this.isActive = false;
    this.searchContainer.classList.remove('active');
    this.searchInput.value = '';
    this.searchResults.style.display = 'none';
    this.searchResultsItems.innerHTML = '';
  }
  
  performSearch() {
    const query = this.searchInput.value.trim();
    
    if (!query || query.length < 2) {
      this.searchResults.style.display = 'none';
      return;
    }
    
    if (!this.searchIndex) {
      return;
    }

    // Perform the search
    const results = this.searchIndex.search(query, {
      bool: "OR",
      expand: true
    });

    // Display results
    this.displayResults(query, results);
  }
  
  displayResults(query, results) {
    this.searchResultsItems.innerHTML = '';
    
    if (results.length === 0) {
      this.searchResultsItems.innerHTML = '<div class="search-results__item">No results found</div>';
      this.searchResults.style.display = 'block';
      return;
    }
    
    // Limit to top 5 results
    results.slice(0, 5).forEach(result => {
      const resultItem = document.createElement('div');
      resultItem.classList.add('search-results__item');
      
      const resultLink = document.createElement('a');
      resultLink.href = `/${result.ref}`;
      
      // Get the document from the search index
      const doc = this.searchIndex.documentStore.getDoc(result.ref);
      
      // Create title with highlight
      const resultTitle = document.createElement('div');
      resultTitle.classList.add('search-results__title');
      resultTitle.textContent = doc.title;
      resultLink.appendChild(resultTitle);
      
      // Create description with highlight
      if (doc.description) {
        const resultDesc = document.createElement('div');
        resultDesc.classList.add('search-results__description');
        
        // Truncate description and highlight matches
        let description = doc.description;
        if (description.length > 150) {
          description = description.substring(0, 150) + '...';
        }
        
        // Simple highlighting by wrapping query terms with <mark>
        const regex = new RegExp(`(${query.split(' ').join('|')})`, 'gi');
        description = description.replace(regex, '<mark>$1</mark>');
        resultDesc.innerHTML = description;
        resultLink.appendChild(resultDesc);
      }
      
      resultItem.appendChild(resultLink);
      this.searchResultsItems.appendChild(resultItem);
    });
    
    this.searchResults.style.display = 'block';
  }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Search();
});