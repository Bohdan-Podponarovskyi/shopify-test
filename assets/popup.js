class Popup {
    constructor(popup) {
        this.popup = popup;
        this.delay = this.popup.dataset.popupDelay;
        this.showOnce = this.popup.dataset.showOnce;
        this.popupShown = localStorage.getItem('popupShown');
        this.closeButton = document.querySelector('.js-popup-close');

        this.closeButton.addEventListener('click', () => {
            this.closePopup();
        })
    }

    showPopup() {
        if (this.popupShown !== 'true' || this.showOnce === 'false') {
            setTimeout(() => {
                this.popup.style.display = 'block';
                document.documentElement.classList.add('lock');

                if (this.showOnce === 'true') {
                    localStorage.setItem('popupShown', 'true');
                }
            }, this.delay * 1000)
        }
    }

    closePopup() {
        this.popup.style.display = 'none';
        document.documentElement.classList.remove('lock');
    }
}

addEventListener('DOMContentLoaded', () => {
    const popupElement = document.querySelector('#js-popup');
    if (popupElement) {
        const myPopup = new Popup(popupElement);
        myPopup.showPopup();
    } else {
        console.error('Popup element not found');
    }
});

