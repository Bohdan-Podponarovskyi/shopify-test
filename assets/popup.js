class Popup {
    constructor(popup) {
        this.popup = popup;
        this.delay = this.popup.dataset.popupDelay;
        this.showOnce = this.popup.dataset.showOnce;
        this.popupShown = localStorage.getItem('popupShown');
        this.closeButton = document.querySelector('.js-popup-close');

        this.products = Array.from(document.querySelectorAll('[data-product-id]'))
            .map(product => ({
                'id': parseInt(product.getAttribute('data-product-id'), 10),
                'quantity': 1
            }));

        this.popupForm = document.querySelector('#popupForm');

        this.closeButton.addEventListener('click', () => {
            this.closePopup();
        })
        this.popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.addToCart();
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

    async addToCart() {
        let formData = {
            'items': this.products
        };

        try {
            const response = await fetch('/cart/add', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            console.log(response);

            await this.updateCartCounter();
            await this.closePopup();

        } catch (error) {
            console.error('Error:', error);
        }
    }

    async updateCartCounter() {
        try {
            const response = await fetch("/cart.json");
            const cart = await response.json();

            document.querySelectorAll(".cart-count-bubble").forEach((el) => {
                el.textContent = cart.item_count;
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

addEventListener('DOMContentLoaded', () => {
    const popupElement = document.querySelector('#popup');
    if (popupElement) {
        const myPopup = new Popup(popupElement);
        myPopup.showPopup();
    } else {
        console.error('Popup element not found');
    }
});

