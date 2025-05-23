chrome.webNavigation.onCommitted.addListener(({ tabId, frameId, url }) => {
    if (frameId === 0 && url.startsWith('http')) {
      applyOverrides(tabId);
    }
  });
  
  async function applyOverrides(tabId) {
    const { config } = await getConfig();
    
    if (!config) {
      console.log("No config found");
      return;
    }

    if (!config.enabled) {
      console.log("Extension is disabled");
      return;
    }
    
    try {
      await chrome.debugger.attach({ tabId: tabId }, "1.3");
      console.log('Debugger attached to tab', tabId);
    } catch (e) {
       if (e.message.includes("Already attached")) {
      console.log("Debugger already attached");
    } else {
      console.error("Attach failed", e);
      return;
    }
  }
  
    try {
      if (config.timezone) {
        await sendCommand(tabId, "Emulation.setTimezoneOverride", {
          timezoneId: config.timezone,
        });
      }
  
      if (config.latitude !== undefined && config.longitude !== undefined) {
        await sendCommand(tabId, "Emulation.setGeolocationOverride", {
          latitude: parseFloat(config.latitude),
          longitude: parseFloat(config.longitude),
          accuracy: 10,
        });
      }

      if (config.locale) {
        await sendCommand(tabId, "Emulation.setLocaleOverride", {
          locale: config.locale,
        });
      }

      if (config.userAgent) {
        await sendCommand(tabId, "Emulation.setUserAgentOverride", {
          userAgent: config.userAgent || navigator.userAgent,
          platform: "Win32",
        });
      }
      
    } catch (e) {
      console.error("Send command failed", e);
    }
  }
  
  function getConfig() {
    return new Promise((resolve) => {
      chrome.storage.local.get(['config'], (result) => {
        resolve(result);
      });
    });
  }
  
  function sendCommand(tabId, command, params) {
    return new Promise((resolve, reject) => {
      chrome.debugger.sendCommand({ tabId: tabId }, command, params, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result);
        }
      });
    });
  }
  