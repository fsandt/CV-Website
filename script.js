// Felix Sandt CV - Interactive JavaScript

// Tab Navigation Function
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all nav tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked nav tab
    event.target.classList.add('active');
}

// Modal Functions
function showImpressum() {
    document.getElementById('impressumModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function showDatenschutz() {
    document.getElementById('datenschutzModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Ensure profile tab is active on load
    document.getElementById('profile').classList.add('active');
    
    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const impressumModal = document.getElementById('impressumModal');
    const datenschutzModal = document.getElementById('datenschutzModal');
    
    if (event.target === impressumModal) {
        closeModal('impressumModal');
    }
    if (event.target === datenschutzModal) {
        closeModal('datenschutzModal');
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const impressumModal = document.getElementById('impressumModal');
        const datenschutzModal = document.getElementById('datenschutzModal');
        
        if (impressumModal.style.display === 'block') {
            closeModal('impressumModal');
        }
        if (datenschutzModal.style.display === 'block') {
            closeModal('datenschutzModal');
        }
    }
});

// Add loading animation completion
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Optional: Add scroll-based animations for timeline items
function addScrollAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Initialize scroll animations if supported
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', addScrollAnimations);
}