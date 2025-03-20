document.addEventListener('DOMContentLoaded', function() {
  // Only add the progress indicator on pages with the has-progress-indicator class
  if (document.body.classList.contains('has-progress-indicator')) {
    // Create the scroll progress indicator elements
    const progressContainer = document.createElement('div');
    progressContainer.className = 'scroll-progress-container';
    
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'scroll-progress-indicator';
    
    progressContainer.appendChild(progressIndicator);
    document.body.prepend(progressContainer);
    
    // Update scroll progress on scroll
    window.addEventListener('scroll', function() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      
      document.documentElement.style.setProperty('--scroll-progress', scrollPercent + '%');
    });
    
    // Initial update
    window.dispatchEvent(new Event('scroll'));
  }
  
  // Table of Contents toggle functionality
  const tocHeaders = document.querySelectorAll('.toc-header');
  
  tocHeaders.forEach(header => {
    header.addEventListener('click', function() {
      // Find the content element that follows this header
      const content = this.nextElementSibling;
      const toggleIcon = this.querySelector('.toc-toggle-icon');
      
      // Toggle the collapsed class
      content.classList.toggle('collapsed');
      
      // Update the toggle icon
      if (content.classList.contains('collapsed')) {
        toggleIcon.textContent = '▶';
        toggleIcon.style.transform = 'rotate(0deg)';
      } else {
        toggleIcon.textContent = '▼';
        toggleIcon.style.transform = 'rotate(90deg)';
      }
    });
  });
});
