// YouTube Player Global Variable
let player;
let isPlayerReady = false;

// Function to change message
function changeMessage() {
    const messageParagraph = document.getElementById("message");
    const messages = [
        "Reality has been transformed! Welcome to the digital realm.",
        "You clicked the button! The cybercore awakens.",
        "Digital dreams are now reality.",
        "Welcome to the cybercore dimension where digital dreams come alive."
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    messageParagraph.textContent = randomMessage;
}

// YT API Callback
function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        height: '150',
        width: '300',
        videoId: 't1J6xJd1384',
        playerVars: {
            autoplay: 0,
            controls: 0,
            showinfo: 0,
            rel: 0,
            loop: 1,
            mute: 1,
            playlist: 't1J6xJd1384'
        },
        events: {
            onReady: onPlayerReady,
            onError: onPlayerError
        }
    });
}

function onPlayerReady(event) {
    isPlayerReady = true;
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    
    if (volumeSlider && volumeValue) {
        player.setVolume(volumeSlider.value);
        volumeValue.textContent = `${volumeSlider.value}%`;

        volumeSlider.addEventListener('input', (e) => {
            if (isPlayerReady) {
                player.setVolume(e.target.value);
                volumeValue.textContent = `${e.target.value}%`;
            }
        });
    }
}

function onPlayerError(event) {
    console.log('YouTube Player Error:', event.data);
    // Hide player controls if video fails to load
    const controls = document.querySelector('.music-controls');
    if (controls) {
        controls.style.display = 'none';
    }
}

function toggleMusic() {
    if (!isPlayerReady || !player) return;
    
    const button = document.getElementById('playPause');
    if (!button) return;
    
    try {
        if (player.getPlayerState() === YT.PlayerState.PLAYING) {
            player.pauseVideo();
            button.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
        } else {
            player.playVideo();
            button.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8 0h4V5h-4v14z"/></svg>`;
        }
    } catch (error) {
        console.log('Error toggling music:', error);
    }
}

// --- CYBERCORE PARTICLES ---
function spawnCyberParticles() {
    const colors = [
        'rgba(245,164,214,0.8)', 
        'rgba(233,69,96,0.7)', 
        'rgba(83,52,131,0.7)',
        'rgba(15,242,255,0.7)', 
        'rgba(255,255,255,0.5)'
    ];
    const particleCount = 16;
    const container = document.querySelector('.cyber-particles');
    if (!container) return;
    
    container.innerHTML = '';
    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'cyber-particle';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.width = p.style.height = `${16 + Math.random() * 24}px`;
        p.style.left = `${Math.random() * 100}vw`;
        p.style.top = `${Math.random() * 100}vh`;
        p.style.animationDelay = `${Math.random() * 10}s`;
        container.appendChild(p);
    }
}

// --- CYBERCORE GLITCH SIMULATION ---
function triggerGlitch() {
    document.body.classList.add('flicker');
    const glitchOverlay = document.querySelector('.glitch-overlay');
    if (glitchOverlay) {
        glitchOverlay.style.opacity = '0.55';
    }
    
    setTimeout(() => {
        document.body.classList.remove('flicker');
        if (glitchOverlay) {
            glitchOverlay.style.opacity = '0.18';
        }
    }, 1200);
}

function closePopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'none';
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Spawn particles
    spawnCyberParticles();
    
    // Show popup after delay
    setTimeout(function() {
        const popup = document.getElementById('popup');
        if (popup) {
            popup.style.display = 'block';
        }
    }, 500);
    
    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});

// Close popup when clicking outside
window.onclick = function(event) {
    const popup = document.getElementById('popup');
    if (event.target === popup) {
        popup.style.display = 'none';
    }
};