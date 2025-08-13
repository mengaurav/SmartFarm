// Crop Recommendation System
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const cropForm = document.getElementById('cropForm');
    const resultsSection = document.getElementById('resultsSection');
    const cropCards = document.getElementById('cropCards');
    const selectedCropName = document.getElementById('selectedCropName');
    const currentMonthElement = document.getElementById('currentMonth');
    const calendarDates = document.getElementById('calendarDates');
    const taskList = document.getElementById('taskList');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    
    // Current date and selected date for calendar
    let currentDate = new Date();
    let selectedDate = new Date();
    let selectedCrop = null;
    
    // Crop database - static data for demonstration
    const cropDatabase = {
        // North India
        north: {
            alluvial: {
                january: [
                    { name: 'Wheat', suitability: 'high', description: 'Winter wheat variety suitable for North Indian climate' },
                    { name: 'Mustard', suitability: 'high', description: 'Oil crop that thrives in winter months' },
                    { name: 'Potato', suitability: 'medium', description: 'Tuber crop suitable for winter cultivation' }
                ],
                february: [
                    { name: 'Wheat', suitability: 'medium', description: 'Late sowing of wheat varieties' },
                    { name: 'Sunflower', suitability: 'high', description: 'Oil crop suitable for spring sowing' },
                    { name: 'Vegetables', suitability: 'high', description: 'Various vegetables like peas, carrots, etc.' }
                ],
                march: [
                    { name: 'Maize', suitability: 'high', description: 'Spring maize variety' },
                    { name: 'Sunflower', suitability: 'high', description: 'Oil crop with good yield in spring' },
                    { name: 'Vegetables', suitability: 'medium', description: 'Various summer vegetables' }
                ],
                april: [
                    { name: 'Maize', suitability: 'high', description: 'Summer maize variety' },
                    { name: 'Cotton', suitability: 'medium', description: 'Cotton sowing starts in April' },
                    { name: 'Vegetables', suitability: 'medium', description: 'Summer vegetables like okra, cucumber' }
                ],
                may: [
                    { name: 'Cotton', suitability: 'high', description: 'Main cotton sowing season' },
                    { name: 'Sugarcane', suitability: 'high', description: 'Ideal time for sugarcane planting' },
                    { name: 'Maize', suitability: 'medium', description: 'Late summer maize variety' }
                ],
                june: [
                    { name: 'Rice', suitability: 'high', description: 'Kharif rice varieties' },
                    { name: 'Maize', suitability: 'high', description: 'Kharif maize varieties' },
                    { name: 'Soybean', suitability: 'medium', description: 'Protein-rich legume crop' }
                ],
                july: [
                    { name: 'Rice', suitability: 'high', description: 'Main kharif rice sowing season' },
                    { name: 'Millet', suitability: 'high', description: 'Bajra and other millets' },
                    { name: 'Pulses', suitability: 'high', description: 'Moong, Urad and other pulses' }
                ],
                august: [
                    { name: 'Rice', suitability: 'medium', description: 'Late kharif rice varieties' },
                    { name: 'Pulses', suitability: 'high', description: 'Various pulses suitable for late sowing' },
                    { name: 'Vegetables', suitability: 'high', description: 'Various monsoon vegetables' }
                ],
                september: [
                    { name: 'Vegetables', suitability: 'high', description: 'Various vegetables for autumn season' },
                    { name: 'Maize', suitability: 'medium', description: 'Short duration maize varieties' },
                    { name: 'Pulses', suitability: 'medium', description: 'Short duration pulse varieties' }
                ],
                october: [
                    { name: 'Wheat', suitability: 'high', description: 'Early sowing wheat varieties' },
                    { name: 'Mustard', suitability: 'high', description: 'Rabi oil seed crop' },
                    { name: 'Potato', suitability: 'high', description: 'Main potato sowing season' }
                ],
                november: [
                    { name: 'Wheat', suitability: 'high', description: 'Main wheat sowing season' },
                    { name: 'Gram', suitability: 'high', description: 'Chickpea varieties for rabi season' },
                    { name: 'Peas', suitability: 'high', description: 'Green peas for winter season' }
                ],
                december: [
                    { name: 'Wheat', suitability: 'medium', description: 'Late sowing wheat varieties' },
                    { name: 'Vegetables', suitability: 'high', description: 'Winter vegetables like cauliflower, cabbage' },
                    { name: 'Barley', suitability: 'high', description: 'Winter cereal crop' }
                ]
            },
            // Add more soil types for North India
            black: {
                // Similar structure as above
                june: [
                    { name: 'Cotton', suitability: 'high', description: 'Ideal for black soil in summer' },
                    { name: 'Soybean', suitability: 'high', description: 'Protein-rich legume crop' },
                    { name: 'Pulses', suitability: 'medium', description: 'Various pulses suitable for black soil' }
                ],
                // Add more months
            }
            // Add more soil types
        },
        // South India
        south: {
            red: {
                june: [
                    { name: 'Rice', suitability: 'high', description: 'Suitable rice varieties for South India' },
                    { name: 'Groundnut', suitability: 'high', description: 'Major oil seed crop for red soils' },
                    { name: 'Millets', suitability: 'high', description: 'Ragi and other millets suitable for red soil' }
                ],
                // Add more months
            }
            // Add more soil types
        },
        // Add more regions
    };
    
    // Crop tasks database - for calendar view
    const cropTasks = {
        'Rice': [
            { week: 1, task: 'Ploughing', description: 'Prepare the field by ploughing and leveling' },
            { week: 2, task: 'Sowing', description: 'Sow pre-germinated seeds or transplant seedlings' },
            { week: 3, task: 'Irrigation', description: 'Maintain water level in the field' },
            { week: 4, task: 'Fertilizer', description: 'Apply first dose of nitrogen fertilizer' }
        ],
        'Wheat': [
            { week: 1, task: 'Ploughing', description: 'Prepare the field with 2-3 ploughings' },
            { week: 2, task: 'Sowing', description: 'Sow seeds in rows using seed drill' },
            { week: 3, task: 'Irrigation', description: 'First irrigation after sowing' },
            { week: 4, task: 'Weed Control', description: 'Remove weeds manually or use herbicides' }
        ],
        'Cotton': [
            { week: 1, task: 'Ploughing', description: 'Deep ploughing and field preparation' },
            { week: 2, task: 'Sowing', description: 'Sow seeds at proper spacing' },
            { week: 3, task: 'Thinning', description: 'Remove excess seedlings' },
            { week: 4, task: 'Irrigation', description: 'First irrigation if rainfall is inadequate' }
        ],
        'Maize': [
            { week: 1, task: 'Ploughing', description: 'Field preparation with proper tillage' },
            { week: 2, task: 'Sowing', description: 'Sow seeds in rows or ridges' },
            { week: 3, task: 'Fertilizer', description: 'Apply starter fertilizer' },
            { week: 4, task: 'Irrigation', description: 'First irrigation if needed' }
        ],
        'Sugarcane': [
            { week: 1, task: 'Ploughing', description: 'Deep ploughing and field preparation' },
            { week: 2, task: 'Planting', description: 'Plant cane setts in furrows' },
            { week: 3, task: 'Irrigation', description: 'First irrigation after planting' },
            { week: 4, task: 'Fertilizer', description: 'Apply basal dose of fertilizers' }
        ],
        'Potato': [
            { week: 1, task: 'Ploughing', description: 'Prepare field with proper tillage' },
            { week: 2, task: 'Planting', description: 'Plant seed potatoes in ridges or furrows' },
            { week: 3, task: 'Irrigation', description: 'Light irrigation after planting' },
            { week: 4, task: 'Earthing Up', description: 'First earthing up to cover developing tubers' }
        ],
        'Mustard': [
            { week: 1, task: 'Ploughing', description: 'Field preparation with 2-3 ploughings' },
            { week: 2, task: 'Sowing', description: 'Sow seeds in rows' },
            { week: 3, task: 'Thinning', description: 'Thin out seedlings to maintain proper spacing' },
            { week: 4, task: 'Irrigation', description: 'First irrigation if needed' }
        ],
        'Groundnut': [
            { week: 1, task: 'Ploughing', description: 'Field preparation with proper tillage' },
            { week: 2, task: 'Sowing', description: 'Sow seeds at proper spacing' },
            { week: 3, task: 'Irrigation', description: 'First irrigation after sowing' },
            { week: 4, task: 'Weed Control', description: 'Remove weeds manually or use herbicides' }
        ],
        // Default tasks for any other crop
        'default': [
            { week: 1, task: 'Ploughing', description: 'Prepare the field with proper tillage' },
            { week: 2, task: 'Sowing', description: 'Sow seeds according to recommended spacing' },
            { week: 3, task: 'Irrigation', description: 'First irrigation after sowing' },
            { week: 4, task: 'Fertilizer', description: 'Apply first dose of fertilizer' }
        ]
    };
    
    // Form submission handler
    cropForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const region = document.getElementById('region').value;
        const soilType = document.getElementById('soilType').value;
        const month = document.getElementById('month').value;
        
        // Get crop recommendations
        const recommendations = getCropRecommendations(region, soilType, month);
        
        // Display recommendations
        displayRecommendations(recommendations);
        
        // Show results section
        resultsSection.style.display = 'block';
        
        // Scroll to results section
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Get crop recommendations based on inputs
    function getCropRecommendations(region, soilType, month) {
        // Check if we have data for this combination
        if (cropDatabase[region] && 
            cropDatabase[region][soilType] && 
            cropDatabase[region][soilType][month]) {
            return cropDatabase[region][soilType][month];
        }
        
        // If no exact match, return default recommendations
        return [
            { name: 'Rice', suitability: 'medium', description: 'General purpose rice variety' },
            { name: 'Wheat', suitability: 'medium', description: 'General purpose wheat variety' },
            { name: 'Maize', suitability: 'medium', description: 'General purpose maize variety' }
        ];
    }
    
    // Display crop recommendations
    function displayRecommendations(crops) {
        // Clear previous recommendations
        cropCards.innerHTML = '';
        
        // Add new crop cards
        crops.forEach((crop, index) => {
            const cropCard = document.createElement('div');
            cropCard.className = `crop-card ${index === 0 ? 'active' : ''}`;
            cropCard.dataset.crop = crop.name;
            
            cropCard.innerHTML = `
                <h3>${crop.name}</h3>
                <p>${crop.description}</p>
                <p class="suitability ${crop.suitability}">
                    Suitability: ${crop.suitability.charAt(0).toUpperCase() + crop.suitability.slice(1)}
                </p>
            `;
            
            cropCard.addEventListener('click', function() {
                // Remove active class from all cards
                document.querySelectorAll('.crop-card').forEach(card => {
                    card.classList.remove('active');
                });
                
                // Add active class to clicked card
                this.classList.add('active');
                
                // Update selected crop
                selectedCrop = this.dataset.crop;
                selectedCropName.textContent = selectedCrop;
                
                // Update calendar and tasks
                updateCalendar();
                updateTasks();
            });
            
            cropCards.appendChild(cropCard);
            
            // Set first crop as selected by default
            if (index === 0) {
                selectedCrop = crop.name;
                selectedCropName.textContent = selectedCrop;
                updateCalendar();
                updateTasks();
            }
        });
    }
    
    // Calendar navigation
    prevMonthBtn.addEventListener('click', function() {
        selectedDate.setMonth(selectedDate.getMonth() - 1);
        updateCalendar();
    });
    
    nextMonthBtn.addEventListener('click', function() {
        selectedDate.setMonth(selectedDate.getMonth() + 1);
        updateCalendar();
    });
    
    // Update calendar display
    function updateCalendar() {
        // Update month display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthElement.textContent = `${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;
        
        // Clear calendar
        calendarDates.innerHTML = '';
        
        // Get first day of month and number of days
        const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
        const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
        
        // Add empty cells for days before first day of month
        for (let i = 0; i < firstDay; i++) {
            const emptyDate = document.createElement('div');
            emptyDate.className = 'date inactive';
            calendarDates.appendChild(emptyDate);
        }
        
        // Add cells for each day of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const dateCell = document.createElement('div');
            dateCell.className = 'date';
            
            // Check if this is today
            const today = new Date();
            if (selectedDate.getMonth() === today.getMonth() && 
                selectedDate.getFullYear() === today.getFullYear() && 
                i === today.getDate()) {
                dateCell.classList.add('today');
            }
            
            // Add date number
            const dateNumber = document.createElement('div');
            dateNumber.className = 'date-number';
            dateNumber.textContent = i;
            dateCell.appendChild(dateNumber);
            
            // Add tasks for this date if any
            if (selectedCrop) {
                addTasksToDate(dateCell, i);
            }
            
            calendarDates.appendChild(dateCell);
        }
    }
    
    // Add tasks to calendar date
    function addTasksToDate(dateCell, day) {
        // Determine which week of the month this day belongs to
        const week = Math.ceil(day / 7);
        
        // Get tasks for the selected crop
        const tasks = cropTasks[selectedCrop] || cropTasks['default'];
        
        // Add task if it matches the week
        tasks.forEach(taskItem => {
            if (taskItem.week === week) {
                const task = document.createElement('div');
                task.className = `task ${taskItem.task.toLowerCase()}`;
                task.textContent = taskItem.task;
                task.title = taskItem.description;
                dateCell.appendChild(task);
            }
        });
    }
    
    // Update tasks list
    function updateTasks() {
        // Clear tasks
        taskList.innerHTML = '';
        
        // Get tasks for the selected crop
        const tasks = cropTasks[selectedCrop] || cropTasks['default'];
        
        // Add tasks to list
        tasks.forEach(taskItem => {
            const task = document.createElement('div');
            task.className = `task-item week${taskItem.week}`;
            task.innerHTML = `
                <h4>Week ${taskItem.week}: ${taskItem.task}</h4>
                <p>${taskItem.description}</p>
            `;
            taskList.appendChild(task);
        });
    }
    
    // Initialize calendar
    updateCalendar();
});