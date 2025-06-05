// Mobile Menu Toggle
document.getElementById('menu-toggle').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Menu Tabs
const tabButtons = document.querySelectorAll('.menu-tab-btn');
    const menuCategories = document.querySelectorAll('.menu-category');

    tabButtons.forEach(button => {
    button.addEventListener('click', () => {
    // Remove active class from all buttons
    tabButtons.forEach(btn => btn.classList.remove('active', 'bg-yellow-600', 'text-white'));
    // Add active class to clicked button
    button.classList.add('active', 'bg-yellow-600', 'text-white');
                
    // Hide all menu categories
    menuCategories.forEach(category => category.classList.add('hidden'));
    // Show selected category
        const categoryId = button.getAttribute('data-category');
        document.getElementById(categoryId).classList.remove('hidden');
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');
        
    window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('opacity-100', 'visible');
    } else {
        backToTopButton.classList.remove('opacity-100', 'visible');
        backToTopButton.classList.add('opacity-0', 'invisible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
                
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
                    
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});