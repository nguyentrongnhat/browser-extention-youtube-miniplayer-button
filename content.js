function addMiniPlayerButton() {
    if (document.getElementById('custom-miniplayer-button')) {
        return;
    }

    const rightControls = document.querySelector('.ytp-right-controls');
    
    if (!rightControls) {
        setTimeout(addMiniPlayerButton, 500);
        return;
    }

    const newButton = document.createElement('button');
    newButton.id = 'custom-miniplayer-button';
    newButton.className = 'ytp-button';
    newButton.title = 'Trình phát thu nhỏ (phím tắt I)'; // Tooltip khi rê chuột

    newButton.innerHTML = `
        <svg 
            height="100%" 
            version="1.1" 
            viewBox="0 0 36 36" 
            width="100%"
            style="transform: scale(0.70); transform-origin: center;"
        >
            <path fill="#fff" d="M25,17 L17,17 L17,25 L25,25 L25,17 L25,17 Z M29,29 L7,29 L7,7 L29,7 L29,29 Z M27,9 L9,9 L9,27 L27,27 L27,9 L27,9 Z"></path>
        </svg>
    `;

    newButton.addEventListener('click', () => {
        const event = new KeyboardEvent('keydown', {
            key: 'i',
            keyCode: 73,
            which: 73,
            code: 'KeyI',
            bubbles: true
        });
        document.dispatchEvent(event);
    });

    const fullScreenButton = rightControls.querySelector('.ytp-fullscreen-button');

    if (fullScreenButton) {
        rightControls.insertBefore(newButton, fullScreenButton);
    } 
    else {
        rightControls.appendChild(newButton);
    }
}

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
            // Kiểm tra xem trình phát video đã được thêm vào DOM chưa
            if (document.querySelector('.ytp-chrome-bottom')) {
                addMiniPlayerButton();
            }
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });

addMiniPlayerButton();