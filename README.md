# Chrome Extension: Auto-Pause Videos

## Problem Statement

When users are working with Chrome and Visual Studio Code side-by-side, they often need to switch between the two applications. Videos playing in Chrome tabs continue to play even when the user is focusing on Visual Studio Code, which can be distracting.

## Solution

A Chrome extension that automatically pauses videos when the user switches to Visual Studio Code (or any other application) and resumes them when returning to Chrome.

## How It Works

1. **Focus Detection:**
   - The extension monitors Chrome's focus state using both the `chrome.windows.onFocusChanged` event and a periodic check.

2. **Video Control:**
   - When Chrome loses focus (i.e., the user switches to another application), the extension pauses all videos in the active tab.
   - When Chrome regains focus, the extension resumes video playback.

3. **Tab Management:**
   - The extension manages video playback when switching between tabs within Chrome.
   - It ensures safe execution of scripts to avoid errors with non-accessible tabs.

## Key Components

- **Focus Detection:** Using Chrome APIs and periodic checks.
- **Video Control Functions:** Functions to pause and resume videos.
- **Tab Management:** Keeping track of the active tab.
- **Safe Execution:** Avoiding errors with non-accessible tabs.

## Why It's Useful

- **Improves Focus:** Automatically pausing videos reduces distractions when working in Visual Studio Code.
- **Enhances Productivity:** Users don't need to manually pause/resume videos when switching applications.
- **Seamless Experience:** Provides a smooth transition between coding and browsing/watching videos.
- **Time-Saving:** Eliminates the need for users to locate and interact with video controls each time they switch applications.

## Why Use This Extension

- **Automatic Control:** No need for manual intervention to manage video playback.
- **Application-Aware:** Works specifically when switching between Chrome and other applications, not just when minimizing Chrome.
- **Tab-Aware:** Manages playback correctly even when switching between multiple Chrome tabs.
- **Low Resource Usage:** Uses efficient event listeners and minimal periodic checks.
- **Non-Intrusive:** Doesn't interfere with normal browsing or video watching when staying within Chrome.

## Benefits

- **Improved Focus and Productivity:** For developers who frequently switch between browser and IDE.
- **Reduced Cognitive Load:** No need to remember to pause/resume videos manually.
- **Better Resource Management:** Automatically pauses video playback when not in view.
- **Enhanced User Experience:** When multitasking between web browsing and coding.

## Key Features

- **Auto-Pause:** When switching to other apps.
- **Smart Resume:** When returning to Chrome.
- **Effortless Tab Management:** Handles video playback across different tabs.
- **Lightweight and Resource-Friendly:** Uses minimal resources for efficient operation.

This extension addresses a common pain point for developers and multitaskers, providing an automated solution to manage media playback across applications. Its main strength lies in its ability to detect application switches reliably and control video playback accordingly, all while being lightweight and non-intrusive to the user's workflow.

