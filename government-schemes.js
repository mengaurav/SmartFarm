// Government Schemes Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const schemeSearch = document.getElementById('schemeSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const schemeCards = document.querySelectorAll('.scheme-card');
    const noResults = document.getElementById('noResults');
    const schemeHeaders = document.querySelectorAll('.scheme-header');

    // Initialize - show all schemes and hide no results message
    noResults.style.display = 'none';

    // Add click event listeners to scheme headers for accordion functionality
    schemeHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const card = this.parentElement;
            
            // Toggle active class on the clicked card
            card.classList.toggle('active');
            
            // Optional: Close other cards when one is opened
            schemeCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                }
            });
        });
    });

    // Function to filter schemes based on search input and category
    function filterSchemes() {
        const searchTerm = schemeSearch.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        
        let visibleCount = 0;
        
        schemeCards.forEach(card => {
            const title = card.querySelector('.scheme-title h3').textContent.toLowerCase();
            const description = card.querySelector('.scheme-description p').textContent.toLowerCase();
            const category = card.getAttribute('data-category');
            
            // Check if card matches both search term and category filter
            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
            
            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        if (visibleCount === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }

    // Add event listeners for search and filter
    schemeSearch.addEventListener('input', filterSchemes);
    categoryFilter.addEventListener('change', filterSchemes);

    // Add animation for scheme cards
    function animateSchemeCards() {
        schemeCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 100);
        });
    }

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Function to handle scroll animation for application process steps
    function handleScrollAnimation() {
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            if (isInViewport(step)) {
                setTimeout(() => {
                    step.classList.add('fade-in');
                }, index * 150);
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimation);

    // Trigger animations on page load
    animateSchemeCards();
    handleScrollAnimation();

    // Open the first scheme card by default
    if (schemeCards.length > 0) {
        schemeCards[0].classList.add('active');
    }
});

// Add CSS for animations
document.head.insertAdjacentHTML('beforeend', `
<style>
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .scheme-card {
        opacity: 0;
        transform: translateY(20px);
    }
    
    .scheme-card.fade-in {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .step {
        opacity: 0;
        transform: translateY(20px);
    }
    
    .step.fade-in {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
</style>
`);