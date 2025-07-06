// This function changes the text content of the paragraph with id="message"
function changeMessage() {
    // Find the paragraph by its ID
    const messageParagraph = document.getElementById("message");

    // Change the text content
    messageParagraph.textContent = "You clicked the button! ";
}

let player;

// Initialize YouTube Player
function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        height: '150',
        width: '300',
        videoId: 't1J6xJd1384', // Yeule's Sulky Baby video ID
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'showinfo': 0,
            'rel': 0,
            'loop': 1,
            'mute': 1,
            'playlist': 't1J6xJd1384'
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Set initial volume
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    player.setVolume(volumeSlider.value);
    volumeValue.textContent = `${volumeSlider.value}%`;

    // Add volume change event listener
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value;
        player.setVolume(volume);
        volumeValue.textContent = `${volume}%`;
    });

    // Start playing
    player.playVideo();
}

// Toggle music play/pause
function toggleMusic() {
    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
        player.pauseVideo();
        document.getElementById('playPause').innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
            </svg>
        `;
    } else {
        player.playVideo();
        document.getElementById('playPause').innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M6 19h4l10-10-10-10H6v4l12 12-12 12v-4z"/>
            </svg>
        `;
    }
}

// --- CYBERCORE PARTICLES ---
function spawnCyberParticles() {
    const colors = [
        'rgba(245,164,214,0.8)', 'rgba(233,69,96,0.7)', 'rgba(83,52,131,0.7)',
        'rgba(15,242,255,0.7)', 'rgba(255,255,255,0.5)'
    ];
    const particleCount = 16;
    const container = document.querySelector('.cyber-particles');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'cyber-particle';
        p.style.background = colors[Math.floor(Math.random()*colors.length)];
        p.style.width = p.style.height = `${16 + Math.random()*24}px`;
        p.style.left = `${Math.random()*100}vw`;
        p.style.top = `${Math.random()*100}vh`;
        p.style.animationDelay = `${Math.random()*10}s`;
        container.appendChild(p);
    }
}
spawnCyberParticles();

// --- CYBERCORE GLITCH SIMULATION ---
function triggerGlitch() {
    document.body.classList.add('flicker');
    document.querySelector('.glitch-overlay').style.opacity = '0.55';
    setTimeout(() => {
        document.body.classList.remove('flicker');
        document.querySelector('.glitch-overlay').style.opacity = '0.18';
    }, 1200);
}

// Show popup when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.getElementById('popup').style.display = 'block';
    }, 500);
});

// Close popup when close button is clicked
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Close popup when clicking outside
window.onclick = function(event) {
    var popup = document.getElementById('popup');
    if (event.target == popup) {
        popup.style.display = 'none';
    }
}