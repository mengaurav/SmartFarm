// Fertilizer Guide JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Fertilizer recommendation functionality
    const recommendBtn = document.getElementById('recommendBtn');
    const recommendationResult = document.getElementById('recommendationResult');

    recommendBtn.addEventListener('click', generateRecommendation);

    function generateRecommendation() {
        const cropSelect = document.getElementById('cropSelect');
        const soilTypeSelect = document.getElementById('soilTypeSelect');
        const areaInput = document.getElementById('areaInput');

        // Validate inputs
        if (cropSelect.value === '' || soilTypeSelect.value === '' || areaInput.value === '') {
            alert('Please fill all the fields to get a recommendation.');
            return;
        }

        // Get selected values
        const crop = cropSelect.value;
        const soilType = soilTypeSelect.value;
        const area = parseFloat(areaInput.value);

        // Update result header
        document.getElementById('resultCropName').textContent = getCropDisplayName(crop);
        document.getElementById('resultSoilType').textContent = getSoilDisplayName(soilType);
        document.getElementById('resultArea').textContent = area;

        // Calculate fertilizer amounts based on crop and area
        const { nitrogen, phosphorus, potassium } = calculateFertilizerAmounts(crop, soilType, area);

        // Update fertilizer amounts
        document.getElementById('nitrogenAmount').textContent = `${nitrogen} kg`;
        document.getElementById('phosphorusAmount').textContent = `${phosphorus} kg`;
        document.getElementById('potassiumAmount').textContent = `${potassium} kg`;

        // Generate application schedule
        generateSchedule(crop);

        // Generate notes
        generateNotes(crop, soilType);

        // Show result
        recommendationResult.style.display = 'block';

        // Scroll to result
        recommendationResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function getCropDisplayName(cropValue) {
        const cropNames = {
            'rice': 'Rice (Paddy)',
            'wheat': 'Wheat',
            'maize': 'Maize (Corn)',
            'cotton': 'Cotton',
            'sugarcane': 'Sugarcane',
            'potato': 'Potato',
            'tomato': 'Tomato',
            'onion': 'Onion',
            'chilli': 'Chilli',
            'groundnut': 'Groundnut'
        };
        return cropNames[cropValue] || cropValue;
    }

    function getSoilDisplayName(soilValue) {
        const soilNames = {
            'alluvial': 'Alluvial Soil',
            'black': 'Black Soil',
            'red': 'Red Soil',
            'laterite': 'Laterite Soil',
            'arid': 'Arid Soil',
            'forest': 'Forest Soil'
        };
        return soilNames[soilValue] || soilValue;
    }

    function calculateFertilizerAmounts(crop, soilType, area) {
        // NPK recommendations per acre for different crops (in kg)
        // These are approximate values and should be adjusted based on actual recommendations
        const fertilizerRates = {
            'rice': { n: 100, p: 50, k: 50 },
            'wheat': { n: 120, p: 60, k: 40 },
            'maize': { n: 150, p: 75, k: 50 },
            'cotton': { n: 120, p: 60, k: 60 },
            'sugarcane': { n: 150, p: 60, k: 60 },
            'potato': { n: 120, p: 100, k: 120 },
            'tomato': { n: 100, p: 80, k: 80 },
            'onion': { n: 80, p: 60, k: 80 },
            'chilli': { n: 120, p: 60, k: 60 },
            'groundnut': { n: 20, p: 40, k: 75 }
        };

        // Soil type adjustment factors
        const soilAdjustment = {
            'alluvial': { n: 1.0, p: 1.0, k: 1.0 },
            'black': { n: 0.9, p: 1.2, k: 0.8 },
            'red': { n: 1.1, p: 1.3, k: 0.9 },
            'laterite': { n: 1.2, p: 1.4, k: 1.0 },
            'arid': { n: 1.3, p: 1.0, k: 1.1 },
            'forest': { n: 0.8, p: 1.1, k: 1.0 }
        };

        // Get base rates for the crop
        const baseRates = fertilizerRates[crop] || { n: 100, p: 50, k: 50 };
        
        // Get adjustment factors for the soil type
        const adjustment = soilAdjustment[soilType] || { n: 1.0, p: 1.0, k: 1.0 };

        // Calculate adjusted amounts
        const nitrogen = Math.round(baseRates.n * adjustment.n * area);
        const phosphorus = Math.round(baseRates.p * adjustment.p * area);
        const potassium = Math.round(baseRates.k * adjustment.k * area);

        return { nitrogen, phosphorus, potassium };
    }

    function generateSchedule(crop) {
        const scheduleTimeline = document.getElementById('scheduleTimeline');
        scheduleTimeline.innerHTML = '';

        // Application schedules for different crops
        const schedules = {
            'rice': [
                { stage: 'Basal Application', timing: 'Before transplanting', description: 'Apply 50% of N, 100% of P, and 50% of K as basal dose.' },
                { stage: 'First Top Dressing', timing: '15-20 days after transplanting', description: 'Apply 25% of N.' },
                { stage: 'Second Top Dressing', timing: '40-45 days after transplanting', description: 'Apply remaining 25% of N and 50% of K.' }
            ],
            'wheat': [
                { stage: 'Basal Application', timing: 'At sowing', description: 'Apply 50% of N, 100% of P, and 100% of K as basal dose.' },
                { stage: 'First Top Dressing', timing: 'At crown root initiation (21-25 days after sowing)', description: 'Apply 25% of N.' },
                { stage: 'Second Top Dressing', timing: 'At tillering stage (45-50 days after sowing)', description: 'Apply remaining 25% of N.' }
            ],
            'maize': [
                { stage: 'Basal Application', timing: 'At sowing', description: 'Apply 40% of N, 100% of P, and 100% of K as basal dose.' },
                { stage: 'First Top Dressing', timing: '30-35 days after sowing (knee-high stage)', description: 'Apply 30% of N.' },
                { stage: 'Second Top Dressing', timing: '55-60 days after sowing (tasseling stage)', description: 'Apply remaining 30% of N.' }
            ],
            'cotton': [
                { stage: 'Basal Application', timing: 'At sowing', description: 'Apply 30% of N, 100% of P, and 50% of K as basal dose.' },
                { stage: 'First Top Dressing', timing: '30-35 days after sowing', description: 'Apply 30% of N and 25% of K.' },
                { stage: 'Second Top Dressing', timing: '60-65 days after sowing (flowering stage)', description: 'Apply remaining 40% of N and 25% of K.' }
            ],
            'sugarcane': [
                { stage: 'Basal Application', timing: 'At planting', description: 'Apply 20% of N, 100% of P, and 50% of K as basal dose.' },
                { stage: 'First Top Dressing', timing: '30-40 days after planting', description: 'Apply 30% of N.' },
                { stage: 'Second Top Dressing', timing: '90-100 days after planting', description: 'Apply 30% of N and 50% of K.' },
                { stage: 'Third Top Dressing', timing: '150-160 days after planting', description: 'Apply remaining 20% of N.' }
            ],
            'potato': [
                { stage: 'Basal Application', timing: 'At planting', description: 'Apply 50% of N, 100% of P, and 50% of K as basal dose.' },
                { stage: 'First Top Dressing', timing: '30-35 days after planting (earthing up)', description: 'Apply remaining 50% of N and 50% of K.' }
            ],
            'tomato': [
                { stage: 'Basal Application', timing: 'Before transplanting', description: 'Apply 30% of N, 100% of P, and 50% of K as basal dose.' },
                { stage: 'First Top Dressing', timing: '30 days after transplanting', description: 'Apply 30% of N and 25% of K.' },
                { stage: 'Second Top Dressing', timing: '60 days after transplanting (flowering stage)', description: 'Apply remaining 40% of N and 25% of K.' }
            ],
            'onion': [
                { stage: 'Basal Application', timing: 'Before transplanting', description: 'Apply 40% of N, 100% of P, and 50% of K as basal dose.' },
                { stage: 'First Top Dressing', timing: '30 days after transplanting', description: 'Apply 30% of N and 25% of K.' },
                { stage: 'Second Top Dressing', timing: '60 days after transplanting (bulb formation)', description: 'Apply remaining 30% of N and 25% of K.' }
            ],
            'chilli': [
                { stage: 'Basal Application', timing: 'Before transplanting', description: 'Apply 30% of N, 100% of P, and 50% of K as basal dose.' },
                { stage: 'First Top Dressing', timing: '30 days after transplanting', description: 'Apply 30% of N and 25% of K.' },
                { stage: 'Second Top Dressing', timing: '60 days after transplanting (flowering stage)', description: 'Apply remaining 40% of N and 25% of K.' }
            ],
            'groundnut': [
                { stage: 'Basal Application', timing: 'At sowing', description: 'Apply 100% of N, 100% of P, and 50% of K as basal dose.' },
                { stage: 'Top Dressing', timing: '35-40 days after sowing (pegging stage)', description: 'Apply remaining 50% of K.' }
            ]
        };

        // Get schedule for the selected crop
        const cropSchedule = schedules[crop] || schedules['rice'];

        // Create schedule items
        cropSchedule.forEach(item => {
            const scheduleItem = document.createElement('div');
            scheduleItem.className = 'schedule-item';
            scheduleItem.innerHTML = `
                <h5>${item.stage} - ${item.timing}</h5>
                <p>${item.description}</p>
            `;
            scheduleTimeline.appendChild(scheduleItem);
        });
    }

    function generateNotes(crop, soilType) {
        const fertilizerNotes = document.getElementById('fertilizerNotes');
        fertilizerNotes.innerHTML = '';

        // Common notes for all crops
        const commonNotes = [
            'Always conduct a soil test before applying fertilizers for precise recommendations.',
            'Apply fertilizers when soil is moist but not waterlogged.',
            'Incorporate fertilizers into the soil to prevent nutrient loss.',
            'Follow recommended doses to avoid over-fertilization which can harm plants and the environment.'
        ];

        // Crop-specific notes
        const cropNotes = {
            'rice': [
                'Split application of nitrogen is crucial to reduce losses and improve efficiency.',
                'Maintain standing water during fertilizer application to reduce nitrogen losses.',
                'Consider using slow-release nitrogen fertilizers for better efficiency.'
            ],
            'wheat': [
                'Apply nitrogen at crown root initiation stage for better tillering.',
                'Avoid late nitrogen application as it may delay maturity.',
                'Foliar spray of 2% urea at heading stage can improve grain protein content.'
            ],
            'maize': [
                'Ensure adequate nitrogen during the knee-high to tasseling stage for maximum yield.',
                'Zinc deficiency is common in maize; consider applying zinc sulfate if needed.',
                'Side placement of fertilizers is more effective than broadcasting.'
            ],
            'cotton': [
                'Excessive nitrogen can promote vegetative growth at the expense of boll formation.',
                'Apply potassium during the flowering and boll formation stages.',
                'Foliar application of 2% DAP during flowering can improve boll retention.'
            ],
            'sugarcane': [
                'Split application of nitrogen is recommended for extended growth period.',
                'Apply micronutrients like zinc and iron if deficiency symptoms appear.',
                'Avoid applying nitrogen during the ripening phase as it may reduce sugar content.'
            ],
            'potato': [
                'Potassium is crucial for tuber development and quality.',
                'Apply fertilizers away from seed tubers to prevent burning.',
                'Consider foliar application of micronutrients during tuber initiation.'
            ],
            'tomato': [
                'Calcium deficiency can cause blossom end rot; ensure adequate calcium supply.',
                'Reduce nitrogen application during fruiting to improve fruit quality.',
                'Foliar spray of micronutrients can improve fruit set and quality.'
            ],
            'onion': [
                'Sulfur is important for flavor development in onions.',
                'Avoid high nitrogen during bulb development as it may delay maturity.',
                'Apply potassium during bulb formation for better storage quality.'
            ],
            'chilli': [
                'Balanced nutrition is essential for good fruit set and quality.',
                'Calcium and magnesium are important for preventing fruit disorders.',
                'Foliar spray of micronutrients during flowering can improve yield.'
            ],
            'groundnut': [
                'Being a legume, groundnut requires less nitrogen but more phosphorus and potassium.',
                'Apply gypsum (calcium sulfate) at pegging stage for better pod development.',
                'Boron and zinc are important micronutrients for groundnut.'
            ]
        };

        // Soil-specific notes
        const soilNotes = {
            'alluvial': [
                'Alluvial soils are generally fertile but may require balanced fertilization.',
                'Watch for zinc deficiency, especially in rice-wheat cropping systems.'
            ],
            'black': [
                'Black soils have high clay content and may retain nutrients well.',
                'These soils are generally rich in potassium but may be deficient in nitrogen and phosphorus.',
                'Improve drainage before fertilizer application to prevent waterlogging.'
            ],
            'red': [
                'Red soils are often deficient in nitrogen, phosphorus, and organic matter.',
                'Apply organic manures to improve soil structure and nutrient retention.',
                'These soils may require higher doses of phosphatic fertilizers.'
            ],
            'laterite': [
                'Laterite soils are highly leached and may require higher fertilizer doses.',
                'These soils are often acidic; consider lime application to correct pH.',
                'Split application of fertilizers is recommended to reduce leaching losses.'
            ],
            'arid': [
                'Arid soils often have high pH and may be deficient in micronutrients.',
                'Apply fertilizers along with organic matter to improve nutrient retention.',
                'Avoid excessive nitrogen application as it may increase soil salinity.'
            ],
            'forest': [
                'Forest soils are often rich in organic matter but may be acidic.',
                'These soils may require phosphorus and lime application.',
                'Micronutrient deficiencies may occur; watch for symptoms.'
            ]
        };

        // Add common notes
        commonNotes.forEach(note => {
            const li = document.createElement('li');
            li.textContent = note;
            fertilizerNotes.appendChild(li);
        });

        // Add crop-specific notes
        const specificCropNotes = cropNotes[crop] || [];
        specificCropNotes.forEach(note => {
            const li = document.createElement('li');
            li.textContent = note;
            fertilizerNotes.appendChild(li);
        });

        // Add soil-specific notes
        const specificSoilNotes = soilNotes[soilType] || [];
        specificSoilNotes.forEach(note => {
            const li = document.createElement('li');
            li.textContent = note;
            fertilizerNotes.appendChild(li);
        });
    }
});