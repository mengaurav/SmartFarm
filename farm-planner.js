// Farm Planner JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const addCropForm = document.getElementById('addCropForm');
    const cropName = document.getElementById('cropName');
    const plantingDate = document.getElementById('plantingDate');
    const fieldLocation = document.getElementById('fieldLocation');
    const cropNotes = document.getElementById('cropNotes');
    const taskNotifications = document.getElementById('taskNotifications');
    const currentMonthElement = document.getElementById('currentMonth');
    const calendarDates = document.getElementById('calendarDates');
    const cropListBody = document.getElementById('cropListBody');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const viewButtons = document.querySelectorAll('.view-btn');
    const calendarView = document.getElementById('calendarView');
    const listView = document.getElementById('listView');
    const taskModal = document.getElementById('taskModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const completeTaskBtn = document.getElementById('completeTaskBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const addTaskModal = document.getElementById('addTaskModal');
    const addTaskForm = document.getElementById('addTaskForm');
    const taskDate = document.getElementById('taskDate');
    const taskCrop = document.getElementById('taskCrop');
    const taskName = document.getElementById('taskName');
    const taskDescription = document.getElementById('taskDescription');
    const taskPriority = document.getElementById('taskPriority');
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    const cancelTaskBtn = document.getElementById('cancelTaskBtn');
    const cropDetailsModal = document.getElementById('cropDetailsModal');
    const cropModalTitle = document.getElementById('cropModalTitle');
    const cropModalContent = document.getElementById('cropModalContent');
    const editCropBtn = document.getElementById('editCropBtn');
    const deleteCropBtn = document.getElementById('deleteCropBtn');
    const closeCropModalBtn = document.getElementById('closeCropModalBtn');
    const notificationBadge = document.getElementById('notificationBadge');
    const notificationCount = document.getElementById('notificationCount');
    
    // Current date and selected date for calendar
    let currentDate = new Date();
    let selectedDate = new Date();
    let selectedTask = null;
    let selectedCrop = null;
    
    // Initialize farm data from localStorage or create empty arrays
    let farmData = {
        crops: JSON.parse(localStorage.getItem('farmCrops')) || [],
        tasks: JSON.parse(localStorage.getItem('farmTasks')) || []
    };
    
    // Set today's date as the default planting date
    const today = new Date().toISOString().split('T')[0];
    plantingDate.value = today;
    
    // Add Crop Form Submission
    addCropForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Create new crop object
        const newCrop = {
            id: generateId(),
            name: cropName.value,
            plantingDate: plantingDate.value,
            location: fieldLocation.value,
            notes: cropNotes.value,
            status: 'active',
            createdAt: new Date().toISOString()
        };
        
        // Add to farm data
        farmData.crops.push(newCrop);
        
        // Save to localStorage
        saveFarmData();
        
        // Reset form
        addCropForm.reset();
        plantingDate.value = today;
        
        // Update UI
        updateCalendar();
        updateCropList();
        updateTaskNotifications();
        updateCropDropdown();
        
        // Show success message
        alert('Crop added successfully!');
    });
    
    // View Toggle
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Toggle views
            const view = this.dataset.view;
            if (view === 'calendar') {
                calendarView.style.display = 'block';
                listView.style.display = 'none';
            } else {
                calendarView.style.display = 'none';
                listView.style.display = 'block';
            }
        });
    });
    
    // Calendar Navigation
    prevMonthBtn.addEventListener('click', function() {
        selectedDate.setMonth(selectedDate.getMonth() - 1);
        updateCalendar();
    });
    
    nextMonthBtn.addEventListener('click', function() {
        selectedDate.setMonth(selectedDate.getMonth() + 1);
        updateCalendar();
    });
    
    // Modal Close Buttons
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            taskModal.style.display = 'none';
            addTaskModal.style.display = 'none';
            cropDetailsModal.style.display = 'none';
        });
    });
    
    closeModalBtn.addEventListener('click', function() {
        taskModal.style.display = 'none';
    });
    
    cancelTaskBtn.addEventListener('click', function() {
        addTaskModal.style.display = 'none';
    });
    
    closeCropModalBtn.addEventListener('click', function() {
        cropDetailsModal.style.display = 'none';
    });
    
    // Complete Task Button
    completeTaskBtn.addEventListener('click', function() {
        if (selectedTask) {
            // Find task in farm data
            const taskIndex = farmData.tasks.findIndex(task => task.id === selectedTask);
            if (taskIndex !== -1) {
                // Mark task as completed
                farmData.tasks[taskIndex].status = 'completed';
                
                // Save to localStorage
                saveFarmData();
                
                // Update UI
                updateCalendar();
                updateTaskNotifications();
                
                // Close modal
                taskModal.style.display = 'none';
            }
        }
    });
    
    // Save Task Button
    saveTaskBtn.addEventListener('click', function() {
        // Create new task object
        const newTask = {
            id: generateId(),
            cropId: taskCrop.value,
            name: taskName.value,
            description: taskDescription.value,
            date: taskDate.value,
            priority: taskPriority.value,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        
        // Add to farm data
        farmData.tasks.push(newTask);
        
        // Save to localStorage
        saveFarmData();
        
        // Update UI
        updateCalendar();
        updateTaskNotifications();
        
        // Close modal
        addTaskModal.style.display = 'none';
        
        // Reset form
        addTaskForm.reset();
    });
    
    // Edit Crop Button
    editCropBtn.addEventListener('click', function() {
        if (selectedCrop) {
            // Find crop in farm data
            const crop = farmData.crops.find(crop => crop.id === selectedCrop);
            if (crop) {
                // Populate form with crop data
                cropName.value = crop.name;
                plantingDate.value = crop.plantingDate;
                fieldLocation.value = crop.location;
                cropNotes.value = crop.notes;
                
                // Close modal
                cropDetailsModal.style.display = 'none';
                
                // Scroll to form
                document.querySelector('.add-crop-form').scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
    
    // Delete Crop Button
    deleteCropBtn.addEventListener('click', function() {
        if (selectedCrop) {
            // Confirm deletion
            if (confirm('Are you sure you want to delete this crop? All associated tasks will also be deleted.')) {
                // Find crop index in farm data
                const cropIndex = farmData.crops.findIndex(crop => crop.id === selectedCrop);
                if (cropIndex !== -1) {
                    // Remove crop from farm data
                    farmData.crops.splice(cropIndex, 1);
                    
                    // Remove associated tasks
                    farmData.tasks = farmData.tasks.filter(task => task.cropId !== selectedCrop);
                    
                    // Save to localStorage
                    saveFarmData();
                    
                    // Update UI
                    updateCalendar();
                    updateCropList();
                    updateTaskNotifications();
                    updateCropDropdown();
                    
                    // Close modal
                    cropDetailsModal.style.display = 'none';
                }
            }
        }
    });
    
    // Notification Badge Click
    notificationBadge.addEventListener('click', function() {
        // Scroll to notifications
        document.querySelector('.upcoming-tasks').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Update Calendar
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
            
            // Add add task button
            const addTaskBtn = document.createElement('button');
            addTaskBtn.className = 'add-task-btn';
            addTaskBtn.innerHTML = '<i class="fas fa-plus"></i>';
            addTaskBtn.title = 'Add Task';
            addTaskBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                showAddTaskModal(i);
            });
            dateCell.appendChild(addTaskBtn);
            
            // Add crops and tasks for this date
            addCropsToDate(dateCell, i);
            addTasksToDate(dateCell, i);
            
            calendarDates.appendChild(dateCell);
        }
    }
    
    // Add Crops to Calendar Date
    function addCropsToDate(dateCell, day) {
        // Format date string for comparison
        const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // Find crops planted on this date
        const crops = farmData.crops.filter(crop => crop.plantingDate === dateStr);
        
        // Add crop tags
        crops.forEach(crop => {
            const cropTag = document.createElement('div');
            cropTag.className = 'crop-tag';
            cropTag.textContent = crop.name;
            cropTag.dataset.cropId = crop.id;
            cropTag.addEventListener('click', function(e) {
                e.stopPropagation();
                showCropDetails(crop.id);
            });
            dateCell.appendChild(cropTag);
        });
    }
    
    // Add Tasks to Calendar Date
    function addTasksToDate(dateCell, day) {
        // Format date string for comparison
        const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // Find tasks for this date
        const tasks = farmData.tasks.filter(task => task.date === dateStr && task.status !== 'completed');
        
        // Add tasks
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = `task ${task.priority}`;
            taskElement.textContent = task.name;
            taskElement.dataset.taskId = task.id;
            taskElement.addEventListener('click', function(e) {
                e.stopPropagation();
                showTaskDetails(task.id);
            });
            dateCell.appendChild(taskElement);
        });
    }
    
    // Update Crop List
    function updateCropList() {
        // Clear list
        cropListBody.innerHTML = '';
        
        // Sort crops by planting date (newest first)
        const sortedCrops = [...farmData.crops].sort((a, b) => new Date(b.plantingDate) - new Date(a.plantingDate));
        
        // Add crops to list
        sortedCrops.forEach(crop => {
            const listItem = document.createElement('div');
            listItem.className = 'list-item';
            listItem.dataset.cropId = crop.id;
            
            // Format date
            const plantDate = new Date(crop.plantingDate);
            const formattedDate = `${plantDate.getDate()} ${plantDate.toLocaleString('default', { month: 'short' })} ${plantDate.getFullYear()}`;
            
            // Determine status
            let statusClass = 'active';
            let statusText = 'Active';
            
            if (crop.status === 'completed') {
                statusClass = 'completed';
                statusText = 'Completed';
            } else if (new Date(crop.plantingDate) > new Date()) {
                statusClass = 'upcoming';
                statusText = 'Upcoming';
            }
            
            listItem.innerHTML = `
                <div class="crop-name">${crop.name}</div>
                <div class="planting-date">${formattedDate}</div>
                <div class="location">${crop.location || 'N/A'}</div>
                <div class="status ${statusClass}">${statusText}</div>
                <div class="actions">
                    <button class="action-btn edit-btn" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete-btn" title="Delete"><i class="fas fa-trash"></i></button>
                </div>
            `;
            
            // Add event listeners
            listItem.addEventListener('click', function(e) {
                if (!e.target.closest('.action-btn')) {
                    showCropDetails(crop.id);
                }
            });
            
            listItem.querySelector('.edit-btn').addEventListener('click', function(e) {
                e.stopPropagation();
                selectedCrop = crop.id;
                editCropBtn.click();
            });
            
            listItem.querySelector('.delete-btn').addEventListener('click', function(e) {
                e.stopPropagation();
                selectedCrop = crop.id;
                deleteCropBtn.click();
            });
            
            cropListBody.appendChild(listItem);
        });
        
        // Show message if no crops
        if (sortedCrops.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = 'No crops added yet. Add your first crop using the form on the left.';
            emptyMessage.style.padding = '20px';
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.color = '#666';
            cropListBody.appendChild(emptyMessage);
        }
    }
    
    // Update Task Notifications
    function updateTaskNotifications() {
        // Clear notifications
        taskNotifications.innerHTML = '';
        
        // Get upcoming tasks (next 7 days)
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        
        const upcomingTasks = farmData.tasks.filter(task => {
            const taskDate = new Date(task.date);
            return taskDate >= today && taskDate <= nextWeek && task.status !== 'completed';
        });
        
        // Sort by date (soonest first)
        upcomingTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Add tasks to notifications
        upcomingTasks.forEach(task => {
            // Find associated crop
            const crop = farmData.crops.find(crop => crop.id === task.cropId);
            
            const notification = document.createElement('div');
            notification.className = `task-notification ${task.priority}`;
            notification.dataset.taskId = task.id;
            
            // Format date
            const taskDate = new Date(task.date);
            const formattedDate = `${taskDate.getDate()} ${taskDate.toLocaleString('default', { month: 'short' })} ${taskDate.getFullYear()}`;
            
            notification.innerHTML = `
                <h4>${task.name}</h4>
                <p>${crop ? `Crop: ${crop.name}` : 'No crop specified'}</p>
                <p class="task-date">${formattedDate}</p>
            `;
            
            notification.addEventListener('click', function() {
                showTaskDetails(task.id);
            });
            
            taskNotifications.appendChild(notification);
        });
        
        // Show message if no tasks
        if (upcomingTasks.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'no-tasks-message';
            emptyMessage.textContent = 'No upcoming tasks for the next 7 days';
            taskNotifications.appendChild(emptyMessage);
        }
        
        // Update notification badge
        updateNotificationBadge(upcomingTasks.length);
    }
    
    // Update Crop Dropdown in Add Task Modal
    function updateCropDropdown() {
        // Clear dropdown
        taskCrop.innerHTML = '';
        
        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select a crop';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        taskCrop.appendChild(defaultOption);
        
        // Add crops to dropdown
        farmData.crops.forEach(crop => {
            const option = document.createElement('option');
            option.value = crop.id;
            option.textContent = crop.name;
            taskCrop.appendChild(option);
        });
    }
    
    // Show Task Details Modal
    function showTaskDetails(taskId) {
        // Find task in farm data
        const task = farmData.tasks.find(task => task.id === taskId);
        if (task) {
            // Find associated crop
            const crop = farmData.crops.find(crop => crop.id === task.cropId);
            
            // Set selected task
            selectedTask = taskId;
            
            // Update modal title
            modalTitle.textContent = task.name;
            
            // Format date
            const taskDate = new Date(task.date);
            const formattedDate = `${taskDate.getDate()} ${taskDate.toLocaleString('default', { month: 'long' })} ${taskDate.getFullYear()}`;
            
            // Update modal content
            modalContent.innerHTML = `
                <div class="task-details">
                    <p><span class="label">Date:</span> ${formattedDate}</p>
                    <p><span class="label">Crop:</span> ${crop ? crop.name : 'No crop specified'}</p>
                    <p><span class="label">Priority:</span> <span class="priority ${task.priority}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span></p>
                    <p><span class="label">Status:</span> ${task.status.charAt(0).toUpperCase() + task.status.slice(1)}</p>
                    <h3>Description</h3>
                    <p>${task.description || 'No description provided'}</p>
                </div>
            `;
            
            // Update complete button visibility
            if (task.status === 'completed') {
                completeTaskBtn.style.display = 'none';
            } else {
                completeTaskBtn.style.display = 'block';
            }
            
            // Show modal
            taskModal.style.display = 'block';
        }
    }
    
    // Show Add Task Modal
    function showAddTaskModal(day) {
        // Format date string
        const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // Set task date
        taskDate.value = dateStr;
        
        // Update crop dropdown
        updateCropDropdown();
        
        // Reset form
        addTaskForm.reset();
        taskDate.value = dateStr;
        
        // Show modal
        addTaskModal.style.display = 'block';
    }
    
    // Show Crop Details Modal
    function showCropDetails(cropId) {
        // Find crop in farm data
        const crop = farmData.crops.find(crop => crop.id === cropId);
        if (crop) {
            // Set selected crop
            selectedCrop = cropId;
            
            // Update modal title
            cropModalTitle.textContent = crop.name;
            
            // Format date
            const plantDate = new Date(crop.plantingDate);
            const formattedDate = `${plantDate.getDate()} ${plantDate.toLocaleString('default', { month: 'long' })} ${plantDate.getFullYear()}`;
            
            // Find tasks for this crop
            const cropTasks = farmData.tasks.filter(task => task.cropId === cropId);
            
            // Sort tasks by date
            cropTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
            
            // Generate tasks HTML
            let tasksHTML = '';
            if (cropTasks.length > 0) {
                tasksHTML = `
                    <div class="crop-tasks-list">
                        <h4>Tasks</h4>
                        <ul>
                `;
                
                cropTasks.forEach(task => {
                    const taskDate = new Date(task.date);
                    const formattedTaskDate = `${taskDate.getDate()} ${taskDate.toLocaleString('default', { month: 'short' })} ${taskDate.getFullYear()}`;
                    
                    tasksHTML += `
                        <li>
                            ${formattedTaskDate} - ${task.name} 
                            (${task.status === 'completed' ? 'Completed' : 'Pending'})
                        </li>
                    `;
                });
                
                tasksHTML += `
                        </ul>
                    </div>
                `;
            } else {
                tasksHTML = `
                    <div class="crop-tasks-list">
                        <h4>Tasks</h4>
                        <p>No tasks added for this crop yet.</p>
                    </div>
                `;
            }
            
            // Update modal content
            cropModalContent.innerHTML = `
                <div class="crop-details">
                    <p><span class="label">Planting Date:</span> ${formattedDate}</p>
                    <p><span class="label">Field Location:</span> ${crop.location || 'Not specified'}</p>
                    <p><span class="label">Status:</span> ${crop.status.charAt(0).toUpperCase() + crop.status.slice(1)}</p>
                    <h3>Notes</h3>
                    <p>${crop.notes || 'No notes provided'}</p>
                    ${tasksHTML}
                </div>
            `;
            
            // Show modal
            cropDetailsModal.style.display = 'block';
        }
    }
    
    // Update Notification Badge
    function updateNotificationBadge(count) {
        notificationCount.textContent = count;
        
        if (count > 0) {
            notificationBadge.style.display = 'flex';
        } else {
            notificationBadge.style.display = 'none';
        }
    }
    
    // Save Farm Data to localStorage
    function saveFarmData() {
        localStorage.setItem('farmCrops', JSON.stringify(farmData.crops));
        localStorage.setItem('farmTasks', JSON.stringify(farmData.tasks));
    }
    
    // Generate Unique ID
    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }
    
    // Initialize UI
    updateCalendar();
    updateCropList();
    updateTaskNotifications();
    updateCropDropdown();
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === taskModal) {
            taskModal.style.display = 'none';
        }
        if (e.target === addTaskModal) {
            addTaskModal.style.display = 'none';
        }
        if (e.target === cropDetailsModal) {
            cropDetailsModal.style.display = 'none';
        }
    });
});