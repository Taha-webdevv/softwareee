// Contact page functionality

document.addEventListener('DOMContentLoaded', () => {
  // Set page title
  setPageTitle('Contact Us');
  
  // Setup contact form validation
  setupContactForm();
  
  // Setup FAQ accordions
  setupFaqAccordions();
});

/**
 * Setup contact form validation and submission
 */
function setupContactForm() {
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-message');
  const closeSuccessBtn = document.getElementById('close-success');
  
  if (!contactForm) return;
  
  // Setup form submission
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    
    // Validate form
    const formValid = validateForm(contactForm, {
      'name': { type: 'name', message: 'Please enter your name' },
      'email': { type: 'email' },
      'subject': { type: 'select', message: 'Please select a subject' },
      'message': { type: 'required', message: 'Please enter your message' }
    });
    
    if (formValid) {
      // Simulate form submission with a delay
      // In a real application, this would send the data to a server
      const submitButton = contactForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      
      setTimeout(() => {
        // Show success message
        if (successMessage) {
          successMessage.classList.add('visible');
        }
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
      }, 1500);
    }
  });
  
  // Setup close button for success message
  if (closeSuccessBtn && successMessage) {
    closeSuccessBtn.addEventListener('click', () => {
      successMessage.classList.remove('visible');
    });
  }
}

/**
 * Setup FAQ accordion functionality
 */
function setupFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.addEventListener('click', () => {
        // Toggle active class on clicked item
        item.classList.toggle('active');
        
        // Optional: Close other open FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
      });
    }
  });
}