// Market Price JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Sample market price data (in a real application, this would come from an API)
    const marketPriceData = [
        {
            crop: 'Rice',
            category: 'cereals',
            variety: 'Basmati',
            market: 'Karnal',
            state: 'Haryana',
            price: 3800,
            trend: 'up',
            change: '+5.2%'
        },
        {
            crop: 'Rice',
            category: 'cereals',
            variety: 'Sona Masuri',
            market: 'Nizamabad',
            state: 'Telangana',
            price: 3200,
            trend: 'up',
            change: '+3.8%'
        },
        {
            crop: 'Wheat',
            category: 'cereals',
            variety: 'Sharbati',
            market: 'Indore',
            state: 'Madhya Pradesh',
            price: 2250,
            trend: 'up',
            change: '+8.7%'
        },
        {
            crop: 'Wheat',
            category: 'cereals',
            variety: 'Lokwan',
            market: 'Pune',
            state: 'Maharashtra',
            price: 2100,
            trend: 'up',
            change: '+6.5%'
        },
        {
            crop: 'Maize',
            category: 'cereals',
            variety: 'Yellow',
            market: 'Davangere',
            state: 'Karnataka',
            price: 1850,
            trend: 'down',
            change: '-2.1%'
        },
        {
            crop: 'Jowar',
            category: 'cereals',
            variety: 'White',
            market: 'Solapur',
            state: 'Maharashtra',
            price: 2400,
            trend: 'stable',
            change: '0%'
        },
        {
            crop: 'Chana (Chickpea)',
            category: 'pulses',
            variety: 'Desi',
            market: 'Delhi',
            state: 'Delhi',
            price: 5100,
            trend: 'down',
            change: '-1.5%'
        },
        {
            crop: 'Tur/Arhar (Pigeon Pea)',
            category: 'pulses',
            variety: 'Local',
            market: 'Mumbai',
            state: 'Maharashtra',
            price: 6800,
            trend: 'up',
            change: '+2.3%'
        },
        {
            crop: 'Moong (Green Gram)',
            category: 'pulses',
            variety: 'Local',
            market: 'Jaipur',
            state: 'Rajasthan',
            price: 7200,
            trend: 'up',
            change: '+1.8%'
        },
        {
            crop: 'Urad (Black Gram)',
            category: 'pulses',
            variety: 'Local',
            market: 'Chennai',
            state: 'Tamil Nadu',
            price: 6500,
            trend: 'stable',
            change: '+0.5%'
        },
        {
            crop: 'Soybean',
            category: 'oilseeds',
            variety: 'Yellow',
            market: 'Indore',
            state: 'Madhya Pradesh',
            price: 4200,
            trend: 'up',
            change: '+3.8%'
        },
        {
            crop: 'Groundnut',
            category: 'oilseeds',
            variety: 'Bold',
            market: 'Rajkot',
            state: 'Gujarat',
            price: 5800,
            trend: 'up',
            change: '+2.1%'
        },
        {
            crop: 'Mustard',
            category: 'oilseeds',
            variety: 'Local',
            market: 'Alwar',
            state: 'Rajasthan',
            price: 4900,
            trend: 'down',
            change: '-1.2%'
        },
        {
            crop: 'Sunflower',
            category: 'oilseeds',
            variety: 'Local',
            market: 'Kurnool',
            state: 'Andhra Pradesh',
            price: 5500,
            trend: 'stable',
            change: '+0.3%'
        },
        {
            crop: 'Potato',
            category: 'vegetables',
            variety: 'Kufri Jyoti',
            market: 'Agra',
            state: 'Uttar Pradesh',
            price: 1200,
            trend: 'down',
            change: '-8.5%'
        },
        {
            crop: 'Onion',
            category: 'vegetables',
            variety: 'Red',
            market: 'Nashik',
            state: 'Maharashtra',
            price: 1500,
            trend: 'down',
            change: '-12.3%'
        },
        {
            crop: 'Tomato',
            category: 'vegetables',
            variety: 'Local',
            market: 'Kolar',
            state: 'Karnataka',
            price: 1800,
            trend: 'up',
            change: '+15.2%'
        },
        {
            crop: 'Cauliflower',
            category: 'vegetables',
            variety: 'Local',
            market: 'Delhi',
            state: 'Delhi',
            price: 1400,
            trend: 'down',
            change: '-5.1%'
        },
        {
            crop: 'Mango',
            category: 'fruits',
            variety: 'Alphonso',
            market: 'Ratnagiri',
            state: 'Maharashtra',
            price: 8000,
            trend: 'up',
            change: '+10.5%'
        },
        {
            crop: 'Apple',
            category: 'fruits',
            variety: 'Royal Delicious',
            market: 'Shimla',
            state: 'Himachal Pradesh',
            price: 7500,
            trend: 'stable',
            change: '+0.8%'
        },
        {
            crop: 'Banana',
            category: 'fruits',
            variety: 'G9',
            market: 'Jalgaon',
            state: 'Maharashtra',
            price: 2200,
            trend: 'up',
            change: '+3.2%'
        },
        {
            crop: 'Orange',
            category: 'fruits',
            variety: 'Nagpur',
            market: 'Nagpur',
            state: 'Maharashtra',
            price: 3500,
            trend: 'down',
            change: '-2.5%'
        },
        {
            crop: 'Turmeric',
            category: 'spices',
            variety: 'Erode',
            market: 'Erode',
            state: 'Tamil Nadu',
            price: 7800,
            trend: 'up',
            change: '+4.2%'
        },
        {
            crop: 'Chilli',
            category: 'spices',
            variety: 'Guntur',
            market: 'Guntur',
            state: 'Andhra Pradesh',
            price: 12500,
            trend: 'up',
            change: '+6.8%'
        },
        {
            crop: 'Coriander',
            category: 'spices',
            variety: 'Local',
            market: 'Kota',
            state: 'Rajasthan',
            price: 6200,
            trend: 'down',
            change: '-1.8%'
        },
        {
            crop: 'Cumin',
            category: 'spices',
            variety: 'Local',
            market: 'Unjha',
            state: 'Gujarat',
            price: 21500,
            trend: 'up',
            change: '+2.5%'
        }
    ];

    // Get DOM elements
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceTableBody = document.getElementById('priceTableBody');
    const noResults = document.getElementById('noResults');

    // Initialize table with all data
    populateTable(marketPriceData);

    // Add event listeners for search and filter
    searchInput.addEventListener('input', filterData);
    categoryFilter.addEventListener('change', filterData);

    // Function to filter data based on search input and category filter
    function filterData() {
        const searchTerm = searchInput.value.toLowerCase();
        const categoryTerm = categoryFilter.value;

        const filteredData = marketPriceData.filter(item => {
            const matchesSearch = 
                item.crop.toLowerCase().includes(searchTerm) || 
                item.market.toLowerCase().includes(searchTerm) || 
                item.state.toLowerCase().includes(searchTerm) || 
                item.variety.toLowerCase().includes(searchTerm);
            
            const matchesCategory = categoryTerm === 'all' || item.category === categoryTerm;
            
            return matchesSearch && matchesCategory;
        });

        populateTable(filteredData);
    }

    // Function to populate the table with data
    function populateTable(data) {
        // Clear the table body
        priceTableBody.innerHTML = '';

        if (data.length === 0) {
            // Show no results message
            noResults.style.display = 'block';
            return;
        }

        // Hide no results message
        noResults.style.display = 'none';

        // Add rows to the table
        data.forEach(item => {
            const row = document.createElement('tr');
            
            // Create trend icon based on trend value
            let trendIcon, trendClass;
            if (item.trend === 'up') {
                trendIcon = '<i class="fas fa-arrow-up"></i>';
                trendClass = 'up';
            } else if (item.trend === 'down') {
                trendIcon = '<i class="fas fa-arrow-down"></i>';
                trendClass = 'down';
            } else {
                trendIcon = '<i class="fas fa-equals"></i>';
                trendClass = 'stable';
            }

            // Format price with commas for thousands
            const formattedPrice = item.price.toLocaleString('en-IN');

            // Set row content
            row.innerHTML = `
                <td>${item.crop}</td>
                <td>${capitalizeFirstLetter(item.category)}</td>
                <td>${item.variety}</td>
                <td>${item.market}</td>
                <td>${item.state}</td>
                <td>₹${formattedPrice}</td>
                <td><span class="trend ${trendClass}">${trendIcon} ${item.change}</span></td>
            `;
            
            priceTableBody.appendChild(row);
        });

        // Add fade-in animation to rows
        const rows = priceTableBody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            row.style.animation = `fadeIn 0.3s ease-in-out ${index * 0.05}s forwards`;
            row.style.opacity = '0';
        });
    }

    // Helper function to capitalize first letter of a string
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Add animation keyframes to the document
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});