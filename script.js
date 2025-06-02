// Felix Sandt CV - Interactive JavaScript

// Tab Navigation Function - Fixed Version
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
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Find and activate the correct nav tab
    const clickedNavTab = document.querySelector(`[onclick="showTab('${tabName}')"]`);
    if (clickedNavTab) {
        clickedNavTab.classList.add('active');
    }
}

// Alternative: Event-based tab navigation (more robust)
function initTabNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get tab name from onclick attribute or data attribute
            const onclickValue = this.getAttribute('onclick');
            if (onclickValue) {
                const tabName = onclickValue.match(/showTab\('(.+?)'\)/);
                if (tabName && tabName[1]) {
                    showTab(tabName[1]);
                }
            }
        });
    });
}

// Modal Functions
function showImpressum() {
    const modal = document.getElementById('impressumModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function showDatenschutz() {
    const modal = document.getElementById('datenschutzModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Ensure profile tab is active on load
    const profileTab = document.getElementById('profile');
    if (profileTab) {
        profileTab.classList.add('active');
    }
    
    // Make sure first nav tab is active
    const firstNavTab = document.querySelector('.nav-tab');
    if (firstNavTab) {
        firstNavTab.classList.add('active');
    }
    
    // Initialize alternative tab navigation
    initTabNavigation();
    
    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    console.log('Initialization complete');
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
        
        if (impressumModal && impressumModal.style.display === 'block') {
            closeModal('impressumModal');
        }
        if (datenschutzModal && datenschutzModal.style.display === 'block') {
            closeModal('datenschutzModal');
        }
    }
});

// Add loading animation completion
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    console.log('Page fully loaded');
});

// Optional: Add scroll-based animations for timeline items
function addScrollAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const projectCards = document.querySelectorAll('.project-card');
    
    if ('IntersectionObserver' in window) {
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

        // Observe timeline items
        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
        
        // Observe project cards
        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
}

// Initialize scroll animations if supported
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', addScrollAnimations);
}

// Make showTab function globally available
window.showTab = showTab;
window.showImpressum = showImpressum;
window.showDatenschutz = showDatenschutz;
window.closeModal = closeModal;