let isPlaying = false;
const playBtn = document.querySelector('.play-btn');
const volumeSlider = document.getElementById('volumeSlider');

function toggleMusic() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        playBtn.textContent = '⏸ PAUSE';
        playBtn.style.background = 'linear-gradient(45deg, var(--accent-green), var(--accent-blue))';
        startVisualizer();
    } else {
        playBtn.textContent = '▶ PLAY';
        playBtn.style.background = 'linear-gradient(45deg, var(--accent-pink), var(--accent-purple))';
        stopVisualizer();
    }
}

let visualizerInterval;
function startVisualizer() {
    visualizerInterval = setInterval(() => {
        const colorBlocks = document.querySelectorAll('.color-block');
        colorBlocks.forEach(block => {
            const randomOpacity = Math.random() * 0.5 + 0.5;
            block.style.opacity = randomOpacity;
        });
    }, 200);
}

function stopVisualizer() {
    clearInterval(visualizerInterval);
    const colorBlocks = document.querySelectorAll('.color-block');
    colorBlocks.forEach(block => {
        block.style.opacity = 0.7;
    });
}

// Volume control
volumeSlider.addEventListener('input', function() {
    const volume = this.value;
    // Visual feedback for volume
    const opacity = volume / 100;
    document.querySelector('.music-icon').style.opacity = opacity;
});

// Sticker click effects
document.querySelectorAll('.sticker').forEach(sticker => {
    sticker.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'float 3s ease-in-out infinite';
        }, 100);
        
        // Create particle effect
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '5px';
            particle.style.height = '5px';
            particle.style.background = 'var(--accent-pink)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            const rect = this.getBoundingClientRect();
            particle.style.left = rect.left + rect.width/2 + 'px';
            particle.style.top = rect.top + rect.height/2 + 'px';
            
            document.body.appendChild(particle);
            
            // Animate particle
            const angle = (Math.PI * 2 * i) / 5;
            const distance = 50;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            particle.animate([
                { transform: 'translate(0, 0)', opacity: 1 },
                { transform: `translate(${endX}px, ${endY}px)`, opacity: 0 }
            ], {
                duration: 500,
                easing: 'ease-out'
            }).onfinish = () => {
                document.body.removeChild(particle);
            };
        }
    });
});

// Random glitch effects
setInterval(() => {
    const title = document.querySelector('.title');
    title.style.transform = `skew(${Math.random() * 2 - 1}deg, ${Math.random() * 2 - 1}deg)`;
    setTimeout(() => {
        title.style.transform = 'skew(0deg, 0deg)';
    }, 50);
}, 3000);

// Cursor trail effect
document.addEventListener('mousemove', function(e) {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.width = '4px';
    trail.style.height = '4px';
    trail.style.background = 'var(--accent-pink)';
    trail.style.borderRadius = '50%';
    trail.style.pointerEvents = 'none';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trail.style.zIndex = '999';
    trail.style.opacity = '0.7';
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 500);
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add some random floating elements on load
    setTimeout(() => {
        const container = document.querySelector('.container');
        for (let i = 0; i < 3; i++) {
            const floatingEl = document.createElement('div');
            floatingEl.className = 'floating-element';
            floatingEl.textContent = ['◇', '◆', '◈'][i];
            floatingEl.style.top = Math.random() * 50 + 20 + '%';
            floatingEl.style.left = Math.random() * 50 + 10 + '%';
            floatingEl.style.animationDelay = Math.random() * 15 + 's';
            document.body.appendChild(floatingEl);
        }
    }, 1000);
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        e.preventDefault();
        toggleMusic();
    }
});

// Add smooth scrolling
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});