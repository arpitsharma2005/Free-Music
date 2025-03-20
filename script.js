document.addEventListener('DOMContentLoaded', function() {
    // Play button toggle
    const playBtn = document.querySelector('.play-btn');
    let isPlaying = false;

    playBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        playBtn.innerHTML = isPlaying ? 
            '<i class="fas fa-pause"></i>' : 
            '<i class="fas fa-play"></i>';
    });

    // Menu item selection
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Progress bar interaction
    const progress = document.querySelector('.progress');
    progress.addEventListener('click', function(e) {
        const progressBar = this.getBoundingClientRect();
        const percent = (e.clientX - progressBar.left) / progressBar.width;
        document.querySelector('.progress-filled').style.width = percent * 100 + '%';
    });

    // Volume bar interaction
    const volume = document.querySelector('.volume-bar');
    volume.addEventListener('click', function(e) {
        const volumeBar = this.getBoundingClientRect();
        const percent = (e.clientX - volumeBar.left) / volumeBar.width;
        document.querySelector('.volume-filled').style.width = percent * 100 + '%';
    });
});
// Add this to your existing script.js or create a new script tag in index.html
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in (you can modify this logic based on your needs)
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }
});

// Add this to your login page's handleLogin function
function handleLogin(event) {
    event.preventDefault();
    
    // Store login state (you can modify this based on your actual authentication logic)
    sessionStorage.setItem('isLoggedIn', 'true');
    
    // Add slide-up animation
    document.querySelector('.login-container').style.animation = 'slideUp 0.8s ease-in-out reverse';
    
    // Wait for animation to complete before redirecting
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 700);
}
const audio = new Audio();
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let currentTrackIndex = 0;

const tracks = [
    { src: "song1.mp3", title: "Song Name 1", artist: "Artist 1" },
    { src: "song2.mp3", title: "Song Name 2", artist: "Artist 2" },
    { src: "song3.mp3", title: "Song Name 3", artist: "Artist 3" }
];

document.querySelector(".play-btn").addEventListener("click", togglePlay);
document.querySelector(".fa-step-forward").addEventListener("click", nextTrack);
document.querySelector(".fa-step-backward").addEventListener("click", prevTrack);
document.querySelector(".fa-random").addEventListener("click", toggleShuffle);
document.querySelector(".fa-redo").addEventListener("click", toggleRepeat);

audio.addEventListener("ended", () => {
    if (isRepeat) {
        playTrack(currentTrackIndex);
    } else {
        nextTrack();
    }
});

function togglePlay() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying = !isPlaying;
    document.querySelector(".play-btn i").classList.toggle("fa-play");
    document.querySelector(".play-btn i").classList.toggle("fa-pause");
}

function playTrack(index) {
    currentTrackIndex = index;
    audio.src = tracks[index].src;
    audio.play();
    isPlaying = true;
    document.querySelector(".play-btn i").classList.replace("fa-play", "fa-pause");
    document.querySelector(".now-playing h4").textContent = tracks[index].title;
    document.querySelector(".now-playing p").textContent = tracks[index].artist;
}

function nextTrack() {
    if (isShuffle) {
        currentTrackIndex = Math.floor(Math.random() * tracks.length);
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    }
    playTrack(currentTrackIndex);
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(currentTrackIndex);
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    document.querySelector(".fa-random").classList.toggle("active", isShuffle);
}

function toggleRepeat() {
    isRepeat = !isRepeat;
    document.querySelector(".fa-redo").classList.toggle("active", isRepeat);
}
document.addEventListener('DOMContentLoaded', function () {
    // Player control variables
    let isPlaying = false;
    let currentVolume = 10;
    let isMuted = false;
    let isShuffleOn = false;
    let isRepeatOn = false;
    let currentTrackIndex = 0;

    // Get DOM elements
    const playerPlayButton = document.querySelector('.play-btn i'); // Play button inside player
    const volumeBtn = document.querySelector('.fa-volume-up');
    const volumeBar = document.querySelector('.volume-bar');
    const progressBar = document.querySelector('.progress');
    const shuffleBtn = document.querySelector('.fa-random');
    const repeatBtn = document.querySelector('.fa-redo');
    const prevBtn = document.querySelector('.fa-step-backward');
    const nextBtn = document.querySelector('.fa-step-forward');
    const likeButtons = document.querySelectorAll('.fa-heart');

    // Sample tracks data - replace with your actual tracks
    const tracks = [
        { title: "Track 1", duration: "3:30", artist: "Karan Aujla" },
        { title: "Track 2", duration: "4:15", artist: "Karan Aujla" }
    ];

    // Function to toggle play/pause
    function togglePlay() {
        isPlaying = !isPlaying;
        playerPlayButton.classList.toggle("fa-play", !isPlaying);
        playerPlayButton.classList.toggle("fa-pause", isPlaying);
    }

    // Attach event listener for play button
    playerPlayButton.addEventListener('click', togglePlay);

    // Volume control
    volumeBtn.addEventListener('click', function () {
        isMuted = !isMuted;
        this.className = `fas ${isMuted ? 'fa-volume-mute' : 'fa-volume-up'}`;
        document.querySelector('.volume-filled').style.width = isMuted ? '0%' : `${currentVolume}%`;
    });

    volumeBar.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        currentVolume = Math.floor(percent * 100);
        document.querySelector('.volume-filled').style.width = `${currentVolume}%`;

        // Update volume icon based on level
        if (currentVolume === 0) {
            volumeBtn.className = 'fas fa-volume-mute';
        } else if (currentVolume < 50) {
            volumeBtn.className = 'fas fa-volume-down';
        } else {
            volumeBtn.className = 'fas fa-volume-up';
        }
    });

    // Progress bar click event
    progressBar.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        document.querySelector('.progress-filled').style.width = `${percent * 100}%`;
    });

    // Shuffle button
    shuffleBtn.addEventListener('click', function () {
        isShuffleOn = !isShuffleOn;
        shuffleBtn.style.color = isShuffleOn ? 'var(--royal-blue)' : 'var(--text-primary)';
    });

    // Repeat button
    repeatBtn.addEventListener('click', function () {
        isRepeatOn = !isRepeatOn;
        repeatBtn.style.color = isRepeatOn ? 'var(--royal-blue)' : 'var(--text-primary)';
    });

    // Update track info function
    function updateTrackInfo(track) {
        document.querySelector('.now-playing h4').textContent = track.title;
        document.querySelector('.now-playing p').textContent = track.artist;
    }

    // Previous track
    prevBtn.addEventListener('click', function () {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        updateTrackInfo(tracks[currentTrackIndex]);
    });

    // Next track
    nextBtn.addEventListener('click', function () {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        updateTrackInfo(tracks[currentTrackIndex]);
    });

    // Like button functionality
    likeButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            this.classList.toggle('far');
            this.classList.toggle('fas');
            this.style.color = this.classList.contains('fas') ? '#1ed760' : 'var(--text-secondary)';
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // List of available pages (update this as needed)
    const pages = ["index.html", "search.html", "library.html"];
    let currentIndex = pages.indexOf(window.location.pathname.split("/").pop());

    // Function to navigate pages with animation
    function navigate(direction) {
        document.querySelector('.container').style.animation = 'slideLeft 0.5s ease-out';
        
        setTimeout(() => {
            if (direction === "prev") {
                currentIndex = (currentIndex - 1 + pages.length) % pages.length;
            } else if (direction === "next") {
                currentIndex = (currentIndex + 1) % pages.length;
            }
            window.location.href = pages[currentIndex];
        }, 400);
    }

    // Attach event listeners to buttons
    document.getElementById("prevPage").addEventListener("click", () => navigate("prev"));
    document.getElementById("nextPage").addEventListener("click", () => navigate("next"));
});
function logout() {
    // Clear session storage to remove login state
    sessionStorage.removeItem('isLoggedIn');

    // Add a slide animation before logging out (optional)
    document.querySelector('.container').style.animation = 'slideRight 0.5s ease-out';

    // Redirect user to login page after animation
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 400);
}
document.addEventListener('DOMContentLoaded', function() {
    // Redirect to login page if not logged in
    if (!sessionStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
    }
});



