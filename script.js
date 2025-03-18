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

