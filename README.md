
# SCC Student Tech Center - Digital Signage Setup Guide

This guide explains how to set up this application on a dedicated computer (NUC, Mac Mini, or PC) connected to a TV/Monitor.

## 1. Initial Software Setup
1. **Install Node.js**: Download and install from [nodejs.org](https://nodejs.org/).
2. **Download Files**: Ensure all project files are in one folder (e.g., `C:\Signage`).
3. **Install Dependencies**:
   - Open your terminal or Command Prompt.
   - Navigate to the folder: `cd C:\Signage`
   - Run: `npm install`

## 2. Setting the API Key
The signage uses Gemini AI for greetings. You must provide an API key:
- Create a file named `.env` in the root folder.
- Add this line: `VITE_GEMINI_API_KEY=your_key_here`
- *Note: In this specific setup, ensure your computer's environment variables include the key if you are not using a build tool.*

## 3. Running the App
To start the signage:
```bash
npm run dev
```
The terminal will show a link like `http://localhost:5173`.

## 4. Dedicated Display Configuration (Kiosk Mode)
For a professional look on your TV, you want the browser to start automatically without any address bars or tabs.

### Windows Setup:
1. Create a shortcut to Chrome on your desktop.
2. Right-click the shortcut > **Properties**.
3. In the "Target" field, add this to the end (after a space):
   `--kiosk http://localhost:5173`
4. Move this shortcut to the `Startup` folder so the sign turns on when the computer boots.

### Mac Setup:
1. Open **System Settings** > **Displays** and set the TV as the Main Display.
2. Use a browser extension like "Kiosk" or use a terminal command:
   `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --kiosk http://localhost:5173`

## 5. Critical Computer Settings
- **Power & Sleep**: Set "Screen off" and "Sleep" to **Never**.
- **Auto-Update**: Disable OS auto-updates or schedule them for 3:00 AM to avoid restart screens during business hours.
- **Mouse Cursor**: Hide the cursor by moving it to the bottom-right corner, or use a "Hide Mouse" utility.

## 6. Managing the Sign
- **Admin Menu**: Press `Ctrl + S` on the keyboard to open the settings panel to change hours or update support messages.
- **Refresh**: The clock and "Open/Closed" status update automatically every second.
