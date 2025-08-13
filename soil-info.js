// Soil Info Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get the region select element and result container
    const regionSelect = document.getElementById('regionSelect');
    const regionResult = document.getElementById('regionResult');

    // Region soil data
    const regionSoilData = {
        north: {
            title: 'North India Soil Types',
            description: 'North India primarily has alluvial soil in the plains, with mountain and forest soils in the Himalayan regions.',
            soilTypes: [
                'Alluvial Soil - Found in the Indo-Gangetic plains',
                'Mountain Soil - Found in the Himalayan regions',
                'Arid Soil - Found in parts of Rajasthan and Haryana'
            ],
            crops: 'Wheat, Rice, Sugarcane, Maize, Pulses'
        },
        south: {
            title: 'South India Soil Types',
            description: 'South India has a variety of soils including red soil, laterite soil, and black soil in different regions.',
            soilTypes: [
                'Red Soil - Found in Tamil Nadu, parts of Karnataka and Andhra Pradesh',
                'Laterite Soil - Found in Kerala and coastal regions',
                'Black Soil - Found in parts of Karnataka and Telangana'
            ],
            crops: 'Rice, Coconut, Spices, Coffee, Tea, Millets'
        },
        east: {
            title: 'East India Soil Types',
            description: 'East India has predominantly alluvial soil in the plains and red and laterite soil in the plateau regions.',
            soilTypes: [
                'Alluvial Soil - Found in the Gangetic plains of West Bengal and Bihar',
                'Red and Yellow Soil - Found in Jharkhand and parts of Odisha',
                'Laterite Soil - Found in parts of Odisha and West Bengal'
            ],
            crops: 'Rice, Jute, Tea, Oilseeds, Pulses'
        },
        west: {
            title: 'West India Soil Types',
            description: 'West India has black soil in Maharashtra and parts of Gujarat, with arid soil in the drier regions.',
            soilTypes: [
                'Black Soil - Found in Maharashtra and parts of Gujarat',
                'Alluvial Soil - Found in coastal Gujarat',
                'Arid Soil - Found in parts of Rajasthan and Gujarat',
                'Laterite Soil - Found in the Western Ghats'
            ],
            crops: 'Cotton, Groundnut, Sugarcane, Jowar, Bajra'
        },
        central: {
            title: 'Central India Soil Types',
            description: 'Central India is dominated by black soil in the Deccan plateau, with mixed red and black soil in other areas.',
            soilTypes: [
                'Black Soil - Found in Madhya Pradesh and parts of Chhattisgarh',
                'Red and Yellow Soil - Found in parts of Chhattisgarh',
                'Mixed Red and Black Soil - Found in transitional zones'
            ],
            crops: 'Cotton, Soybean, Wheat, Pulses, Jowar'
        },
        northeast: {
            title: 'North-East India Soil Types',
            description: 'North-East India has mountain soil, forest soil, and alluvial soil in the valley regions.',
            soilTypes: [
                'Mountain Soil - Found in hilly regions',
                'Forest Soil - Found in forested areas',
                'Alluvial Soil - Found in the Brahmaputra valley',
                'Laterite Soil - Found in parts of Assam and Meghalaya'
            ],
            crops: 'Rice, Tea, Jute, Fruits, Spices'
        }
    };

    // Add event listener to the region select
    regionSelect.addEventListener('change', function() {
        const selectedRegion = this.value;
        if (selectedRegion && regionSoilData[selectedRegion]) {
            const data = regionSoilData[selectedRegion];
            
            // Create HTML for the result
            let resultHTML = `
                <h3>${data.title}</h3>
                <p>${data.description}</p>
                <ul>
            `;
            
            // Add soil types
            data.soilTypes.forEach(soilType => {
                resultHTML += `<li>${soilType}</li>`;
            });
            
            resultHTML += `
                </ul>
                <p><strong>Common Crops:</strong> ${data.crops}</p>
            `;
            
            // Update the result container
            regionResult.innerHTML = resultHTML;
            
            // Add animation class
            regionResult.classList.add('fade-in');
            setTimeout(() => {
                regionResult.classList.remove('fade-in');
            }, 500);
        } else {
            regionResult.innerHTML = '<p>Select a region to see common soil types</p>';
        }
    });

    // Add animation for soil cards
    const soilCards = document.querySelectorAll('.soil-card');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animation
    function handleScrollAnimation() {
        soilCards.forEach((card, index) => {
            if (isInViewport(card)) {
                setTimeout(() => {
                    card.classList.add('fade-in');
                }, index * 100);
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Trigger once on page load
    handleScrollAnimation();
});

// Add CSS for animations
document.head.insertAdjacentHTML('beforeend', `
<style>
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .fade-in {
        animation: fadeIn 0.5s ease forwards;
    }
    
    .soil-card, .tip-card {
        opacity: 0;
        transform: translateY(20px);
    }
    
    .soil-card.fade-in, .tip-card.fade-in {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
</style>
`);