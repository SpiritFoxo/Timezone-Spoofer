# TIMEZONE SPOOFER
Timezone Spoofer is a lightweight but powerful extension for Chromium-based browsers that allows you to spoof browser environment parameters for specific websites:

- 🕒 Timezone

- 🌐 Locale

- 🧭 Geolocation

- 🧑💻 User-Agent and platform

This can be useful if you want to:

- Hide your real location when using a VPN

- Test how websites behave in different regions

- Emulate browsing from another country

#  **Features**
- User interface for configuring spoofing settings

- Stores configuration locally using chrome.storage

- Applies spoofing only to specified websites

- Uses the chrome.debugger API for accurate environment emulation

#  Usage
Open the popup or options page.

Enter:

- a list of target websites (comma-separated),

- your desired timezone (e.g., Europe/Amsterdam),

- latitude and longitude for geolocation,

- locale (e.g., nl-NL),

- optionally, a custom user-agent and platform.

- Click "Save".

- Reload the target tab - the extension will automatically apply overrides.
