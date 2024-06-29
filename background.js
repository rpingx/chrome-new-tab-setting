// Function to update the local cache from sync storage
function updateLocalCache() {
    chrome.storage.sync.get('newTabUrl', (data) => {
        if (data.newTabUrl) {
            chrome.storage.local.set({ newTabUrl: data.newTabUrl });
        }
    });
}

// Listen for changes in sync storage
chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync' && changes.newTabUrl) {
        chrome.storage.local.set({ newTabUrl: changes.newTabUrl.newValue });
    }
});

// Initial load of the local cache
chrome.runtime.onStartup.addListener(() => {
    updateLocalCache();
  });
  
  chrome.runtime.onInstalled.addListener(() => {
    updateLocalCache();
  });

// Handle new tab creation
chrome.tabs.onCreated.addListener((tab) => {
    if (tab.pendingUrl === 'chrome://newtab/' || tab.url === 'chrome://newtab/') {
        chrome.storage.local.get('newTabUrl', (data) => {
            const newTabUrl = data.newTabUrl;
            if (newTabUrl && newTabUrl.trim() !== '') {
                chrome.tabs.update(tab.id, { url: newTabUrl });
            }
        });
    }
});
