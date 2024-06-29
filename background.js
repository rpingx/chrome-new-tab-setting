chrome.tabs.onCreated.addListener((tab) => {
    if (tab.pendingUrl === 'chrome://newtab/' || tab.url === 'chrome://newtab/') {
        chrome.storage.sync.get('newTabUrl', (data) => {
            const newTabUrl = data.newTabUrl;
            if (newTabUrl && newTabUrl.trim() !== '') {
                chrome.tabs.update(tab.id, { url: newTabUrl });
            }
        });
    }
});
