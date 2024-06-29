document.getElementById('save').addEventListener('click', saveUrl);

function saveUrl() {
    let url = document.getElementById('url').value.trim();
    const messageDiv = document.getElementById('message');

    // Clear previous messages
    messageDiv.textContent = '';
    messageDiv.classList.remove('error', 'message');

    // Check if the URL is not empty
    if (url === '') {
        messageDiv.textContent = 'Please enter a URL.';
        messageDiv.classList.add('error');
        return;
    }

    // Add http:// if the URL does not start with http:// or https://
    if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
    }

    // Save the cleaned URL to sync storage, background.js sync listener should update the local storage
    chrome.storage.sync.set({ newTabUrl: url }, () => {
        // chrome.storage.local.set({ newTabUrl: url }, () => {
            messageDiv.textContent = 'New Tab URL saved!';
            messageDiv.classList.add('message');
        // });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get('newTabUrl', (data) => {
        document.getElementById('url').value = data.newTabUrl || '';
    });
});