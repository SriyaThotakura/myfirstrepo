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