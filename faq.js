document.addEventListener('DOMContentLoaded', function() {
    // Get all elements we need to work with
    const accordions = document.querySelectorAll('.accordion');
    const categoryTabs = document.querySelectorAll('.category-tab');
    const faqSearch = document.getElementById('faqSearch');
    const resetSearchBtn = document.getElementById('resetFaqSearch');
    const noResultsMessage = document.getElementById('noFaqResults');
    const faqCategories = document.querySelectorAll('.faq-category');
    
    // Initialize the page - show all FAQs initially
    showCategory('all');
    
    // Add click event listeners to all accordions
    accordions.forEach(accordion => {
        accordion.addEventListener('click', function() {
            // Toggle active class on the clicked accordion
            this.classList.toggle('active');
            
            // Close other accordions when one is opened (optional)
            // Uncomment the following code if you want only one accordion open at a time
            /*
            accordions.forEach(item => {
                if (item !== this) {
                    item.classList.remove('active');
                }
            });
            */
        });
    });
    
    // Add click event listeners to category tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show FAQs for the selected category
            const category = this.getAttribute('data-category');
            showCategory(category);
            
            // Reset search when changing categories
            faqSearch.value = '';
            noResultsMessage.style.display = 'none';
        });
    });
    
    // Add input event listener to search box
    faqSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        filterFAQs(searchTerm);
    });
    
    // Add click event listener to reset search button
    resetSearchBtn.addEventListener('click', function() {
        faqSearch.value = '';
        noResultsMessage.style.display = 'none';
        
        // Show FAQs for the currently selected category
        const activeTab = document.querySelector('.category-tab.active');
        const category = activeTab.getAttribute('data-category');
        showCategory(category);
    });
    
    // Function to show FAQs for a specific category
    function showCategory(category) {
        // If 'all' is selected, show all FAQs
        if (category === 'all') {
            accordions.forEach(accordion => {
                accordion.style.display = 'block';
            });
            return;
        }
        
        // Otherwise, show only FAQs for the selected category
        accordions.forEach(accordion => {
            const parentCategory = accordion.closest('.faq-category');
            if (parentCategory && parentCategory.getAttribute('data-category') === category) {
                accordion.style.display = 'block';
            } else {
                accordion.style.display = 'none';
            }
        });
    }
    
    // Function to filter FAQs based on search term
    function filterFAQs(searchTerm) {
        if (!searchTerm) {
            // If search term is empty, show FAQs for the currently selected category
            const activeTab = document.querySelector('.category-tab.active');
            const category = activeTab.getAttribute('data-category');
            showCategory(category);
            noResultsMessage.style.display = 'none';
            return;
        }
        
        let matchFound = false;
        
        // Loop through all accordions and check if they match the search term
        accordions.forEach(accordion => {
            const questionText = accordion.querySelector('.accordion-header h3').textContent.toLowerCase();
            const answerText = accordion.querySelector('.accordion-content').textContent.toLowerCase();
            
            // Check if the question or answer contains the search term
            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                accordion.style.display = 'block';
                matchFound = true;
            } else {
                accordion.style.display = 'none';
            }
        });
        
        // Show or hide the "no results" message
        noResultsMessage.style.display = matchFound ? 'none' : 'block';
    }
    
    // Add fade-in animation to accordions
    accordions.forEach((accordion, index) => {
        setTimeout(() => {
            accordion.style.opacity = '0';
            accordion.style.transform = 'translateY(20px)';
            accordion.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                accordion.style.opacity = '1';
                accordion.style.transform = 'translateY(0)';
            }, 50 * index);
        }, 0);
    });
    
    // Open the first accordion by default (optional)
    // Uncomment the following line if you want the first accordion to be open by default
    // if (accordions.length > 0) accordions[0].classList.add('active');
});