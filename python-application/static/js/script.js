// Initialize stats
let requestCount = 0;
let startTime = Date.now();

// Update stats on page load
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    requestCount++;
});

function updateStats() {
    // Calculate uptime
    const uptimeMs = Date.now() - startTime;
    const uptimeDays = (uptimeMs / (1000 * 60 * 60 * 24)).toFixed(1);
    document.getElementById('uptime').textContent = uptimeDays;
    
    // Update request count
    requestCount++;
    document.getElementById('requests').textContent = requestCount;
    
    // Add animation
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        stat.style.transform = 'scale(1.1)';
        setTimeout(() => {
            stat.style.transform = 'scale(1)';
        }, 200);
    });
}

function checkHealth() {
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.textContent = 'Checking health...';
    statusMessage.className = 'status-message info';
    
    fetch('/health')
        .then(response => response.json())
        .then(data => {
            statusMessage.textContent = '✓ Health check passed! Status: ' + data.status;
            statusMessage.className = 'status-message success';
            
            // Update request count
            requestCount++;
            document.getElementById('requests').textContent = requestCount;
        })
        .catch(error => {
            statusMessage.textContent = '✗ Health check failed: ' + error.message;
            statusMessage.className = 'status-message error';
        });
}

// Add some interactive animations
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Animate stat values on scroll (if needed)
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out';
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-item').forEach(item => {
    observer.observe(item);
});

