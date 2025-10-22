function addMiniPlayerButton() {
    if (document.getElementById('custom-miniplayer-button')) {
        return;
    }

    const rightControls = document.querySelector('.ytp-right-controls-right');

    // const newImageInImageButton = document.querySelector('.ytp-pip-button');

    // newImageInImageButton.setAttribute('style', '');

    // const newImageInImageButtonSvg = newImageInImageButton.querySelector('svg');

    // newImageInImageButtonSvg.setAttribute('style', 'width: 48px; height: 40px; padding: 0;');
    
    if (!rightControls) {
        setTimeout(addMiniPlayerButton, 500);
        return;
    }

    const newButton = document.createElement('button');
    newButton.id = 'custom-miniplayer-button';
    newButton.classList.add('ytp-button', 'ytp-fullscreen-button')
    newButton.setAttribute('title', '');
    newButton.setAttribute('data-tooltip-title',  'Trình phát thu nhỏ (i)');
    newButton.setAttribute('aria-label',  'Trình phát thu nhỏ (i)');
    newButton.setAttribute('data-title-no-tooltip',  'Trình phát thu nhỏ (i)');
    newButton.setAttribute('data-priority', 13)

    newButton.innerHTML = `
       <svg height="36" version="1.1" viewBox="0 0 36 36" width="36" style="width: 48px; height: 40px; padding: 0;"">
            <use class="ytp-svg-shadow" xlink:href="#ytp-id-17"></use>
            <path d="M25,17 L17,17 L17,23 L25,23 L25,17 L25,17 Z M29,25 L29,10.98 C29,9.88 28.1,9 27,9 L9,9 C7.9,9 7,9.88 7,10.98 L7,25 C7,26.1 7.9,27 9,27 L27,27 C28.1,27 29,26.1 29,25 L29,25 Z M27,25.02 L9,25.02 L9,10.97 L27,10.97 L27,25.02 L27,25.02 Z" fill="#fff"></path>
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

    if (fullScreenButton && fullScreenButton.parentNode === rightControls) {
        rightControls.insertBefore(newButton, fullScreenButton);
    } 
    else if (rightControls) {
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