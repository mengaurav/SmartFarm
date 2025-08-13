document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    
    // Get error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');
    
    // Get modal elements
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const closeModalButton = document.getElementById('closeModal');
    
    // Form validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        nameError.textContent = '';
        emailError.textContent = '';
        phoneError.textContent = '';
        messageError.textContent = '';
        
        // Flag to track validation status
        let isValid = true;
        
        // Validate name (at least 3 characters)
        if (nameInput.value.trim().length < 3) {
            nameError.textContent = 'Name must be at least 3 characters';
            isValid = false;
        }
        
        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Validate phone (10 digits for Indian phone numbers)
        const phonePattern = /^[6-9]\d{9}$/;
        if (!phonePattern.test(phoneInput.value.trim().replace(/[\s-]/g, ''))) {
            phoneError.textContent = 'Please enter a valid 10-digit phone number';
            isValid = false;
        }
        
        // Validate message (at least 10 characters)
        if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            isValid = false;
        }
        
        // If form is valid, show success modal
        if (isValid) {
            // In a real application, you would send the form data to a server here
            // For now, we'll just show the success modal
            showSuccessModal();
            contactForm.reset();
        }
    });
    
    // Show success modal
    function showSuccessModal() {
        successModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
    
    // Close modal when clicking the X button
    closeModalBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking the Close button
    closeModalButton.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the modal content
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeModal();
        }
    });
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal.classList.contains('show')) {
            closeModal();
        }
    });
    
    // Close modal function
    function closeModal() {
        successModal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Real-time validation for better user experience
    nameInput.addEventListener('input', function() {
        if (nameInput.value.trim().length >= 3) {
            nameError.textContent = '';
        }
    });
    
    emailInput.addEventListener('input', function() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(emailInput.value.trim())) {
            emailError.textContent = '';
        }
    });
    
    phoneInput.addEventListener('input', function() {
        // Format phone number as user types
        let phoneValue = phoneInput.value.replace(/\D/g, '');
        
        // Limit to 10 digits
        if (phoneValue.length > 10) {
            phoneValue = phoneValue.slice(0, 10);
        }
        
        // Apply formatting if there are enough digits
        if (phoneValue.length >= 6) {
            phoneInput.value = phoneValue.slice(0, 5) + ' ' + phoneValue.slice(5);
        } else {
            phoneInput.value = phoneValue;
        }
        
        // Clear error if valid
        const phonePattern = /^[6-9]\d{9}$/;
        if (phonePattern.test(phoneValue)) {
            phoneError.textContent = '';
        }
    });
    
    messageInput.addEventListener('input', function() {
        if (messageInput.value.trim().length >= 10) {
            messageError.textContent = '';
        }
    });
});