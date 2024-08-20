document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause all videos when the tab is hidden (e.g., minimized or when switching to another application)
        const videos = document.querySelectorAll('video');
        videos.forEach(video => video.pause());
        console.log('Videos paused because the tab is hidden');
    } else {
        // Resume all videos when the tab becomes visible again
        const videos = document.querySelectorAll('video');
        videos.forEach(video => video.play());
        console.log('Videos resumed because the tab is visible again');
    }
});
