let previousTabId = null;
let isChromeFocused = true;
let checkInterval = null;

// Function to pause all videos on the page
function pauseVideo() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => video.pause());
    console.log('Videos paused');
}

// Function to resume all videos on the page
function resumeVideo() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => video.play());
    console.log('Videos resumed');
}

// Helper function to check if we can interact with the tab
function canInteractWithTab(tab) {
    return tab && tab.url && tab.url.startsWith('http');
}

// Function to safely execute script on a tab
function safeExecuteScript(tabId, func) {
    chrome.tabs.get(tabId, (tab) => {
        if (chrome.runtime.lastError || !canInteractWithTab(tab)) {
            console.error('Tab not found or unable to interact with the tab:', chrome.runtime.lastError);
            return;
        }
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: func
        }).catch(error => console.error('Error executing script:', error));
    });
}

// Function to handle focus change
function handleFocusChange(focused) {
    if (previousTabId === null) return;

    chrome.tabs.get(previousTabId, (tab) => {
        if (chrome.runtime.lastError || !canInteractWithTab(tab)) {
            console.error('Previous tab is no longer available or cannot be interacted with:', chrome.runtime.lastError);
            previousTabId = null;
            return;
        }

        if (focused && !isChromeFocused) {
            isChromeFocused = true;
            safeExecuteScript(previousTabId, resumeVideo);
            console.log('Chrome regained focus, attempting to resume video');
        } else if (!focused && isChromeFocused) {
            isChromeFocused = false;
            safeExecuteScript(previousTabId, pauseVideo);
            console.log('Chrome lost focus, attempting to pause video');
        }
    });
}

// Listen for window focus changes
chrome.windows.onFocusChanged.addListener((windowId) => {
    handleFocusChange(windowId !== chrome.windows.WINDOW_ID_NONE);
});

// Periodic check for focus
function checkFocus() {
    chrome.windows.getCurrent((window) => {
        handleFocusChange(window.focused);
    });
}

// Start periodic check
checkInterval = setInterval(checkFocus, 1000);  // Check every second

// Listen for tab activation (when the user switches tabs within Chrome)
chrome.tabs.onActivated.addListener((activeInfo) => {
    if (previousTabId !== null && previousTabId !== activeInfo.tabId) {
        safeExecuteScript(previousTabId, pauseVideo);
        console.log('Attempting to pause video in previous tab:', previousTabId);
    }

    safeExecuteScript(activeInfo.tabId, resumeVideo);
    console.log('Attempting to resume video in activated tab:', activeInfo.tabId);

    previousTabId = activeInfo.tabId;
});

// Handle tab removal
chrome.tabs.onRemoved.addListener((tabId) => {
    if (tabId === previousTabId) {
        previousTabId = null;
        isChromeFocused = true; // or adjust this based on your use case
        console.log('Previous tab has been closed');
    }
});
