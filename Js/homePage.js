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

// Image Zoom Modal Functionality
document.querySelectorAll('#gallery .fa-search-plus').forEach(icon => {
    icon.addEventListener('click', (e) => {
        const modal = document.getElementById('image-modal');
        const modalImage = document.getElementById('modal-image');
        // Find the image element related to the clicked icon
        const galleryItem = e.target.closest('.relative');
        if (galleryItem) {
            const img = galleryItem.querySelector('img');
            if (img) {
                modalImage.src = img.src;
                modal.classList.remove('opacity-0', 'pointer-events-none');
                modal.classList.add('opacity-100');
            }
        }
    });
});

document.getElementById('modal-close').addEventListener('click', () => {
    const modal = document.getElementById('image-modal');
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100');
});

document.getElementById('image-modal').addEventListener('click', (e) => {
    if (e.target.id === 'image-modal') {
        const modal = document.getElementById('image-modal');
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.classList.remove('opacity-100');
    }
});

// Review Modal Functionality
const reviewModal = document.getElementById('review-modal');
const reviewForm = document.getElementById('review-form');
const leaveReviewBtn = document.getElementById('leave-review-btn');
const reviewModalClose = document.getElementById('review-modal-close');

leaveReviewBtn.addEventListener('click', () => {
    reviewModal.classList.remove('opacity-0', 'pointer-events-none');
    reviewModal.classList.add('opacity-100');
});

reviewModalClose.addEventListener('click', () => {
    reviewModal.classList.add('opacity-0', 'pointer-events-none');
    reviewModal.classList.remove('opacity-100');
});

reviewModal.addEventListener('click', (e) => {
    if (e.target.id === 'review-modal') {
        reviewModal.classList.add('opacity-0', 'pointer-events-none');
        reviewModal.classList.remove('opacity-100');
    }
});

// Handle review form submission
reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = reviewForm['name'].value.trim();
    const email = reviewForm['email'].value.trim();
    const message = reviewForm['message'].value.trim();
    const imageInput = reviewForm['image'];

    if (!name || !email || !message) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    // Create new testimonial element
    const testimonialContainer = document.getElementById('testimonial-container');
    const newTestimonial = document.createElement('div');
    newTestimonial.className = 'bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-all';

    // Prepare image HTML
    let imageHTML = `<div class="w-12 h-12 rounded-full overflow-hidden mr-4 bg-yellow-600 flex items-center justify-center text-white font-bold text-lg">
                        ${name.charAt(0).toUpperCase()}
                    </div>`;

    if (imageInput && imageInput.files && imageInput.files[0]) {
        const file = imageInput.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            imageHTML = `<div class="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img src="${event.target.result}" alt="${name}" class="w-full h-full object-cover">
                         </div>`;
            // Update newTestimonial innerHTML with image
            newTestimonial.innerHTML = `
                <div class="flex items-center mb-4">
                    ${imageHTML}
                    <div>
                        <h4 class="font-bold">${name}</h4>
                        <div class="flex text-yellow-500">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                </div>
                <p class="text-gray-600">${message}</p>
            `;
            testimonialContainer.appendChild(newTestimonial);
            // Scroll testimonial container to the new testimonial
            newTestimonial.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        };
        reader.readAsDataURL(file);
    } else {
        // No image selected, use default initial
        newTestimonial.innerHTML = `
            <div class="flex items-center mb-4">
                ${imageHTML}
                <div>
                    <h4 class="font-bold">${name}</h4>
                    <div class="flex text-yellow-500">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                </div>
            </div>
            <p class="text-gray-600">${message}</p>
        `;
        testimonialContainer.appendChild(newTestimonial);
        // Scroll testimonial container to the new testimonial
        newTestimonial.scrollIntoView({ behavior: 'smooth', inline: 'start' });
    }

    // Close modal and reset form
    reviewModal.classList.add('opacity-0', 'pointer-events-none');
    reviewModal.classList.remove('opacity-100');
    reviewForm.reset();
});

// Automatic horizontal scrolling for testimonials with pause on hover
const testimonialContainer = document.getElementById('testimonial-container');
let scrollAmount = 0;
let scrollStep = 1; // pixels per interval
let scrollInterval = null;

function startAutoScroll() {
    scrollInterval = setInterval(() => {
        if (testimonialContainer.scrollLeft >= testimonialContainer.scrollWidth - testimonialContainer.clientWidth) {
            testimonialContainer.scrollLeft = 0;
        } else {
            testimonialContainer.scrollLeft += scrollStep;
        }
    }, 20); // adjust speed here
}

function stopAutoScroll() {
    clearInterval(scrollInterval);
}

testimonialContainer.addEventListener('mouseenter', stopAutoScroll);
testimonialContainer.addEventListener('mouseleave', startAutoScroll);

// Start auto scrolling on page load
startAutoScroll();
