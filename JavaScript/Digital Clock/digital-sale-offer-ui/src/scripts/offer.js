const offerMessage = document.getElementById('offer-message');
const countdownElement = document.getElementById('countdown');
const saleEndDate = new Date('2023-08-15T23:59:59');

const updateCountdown = () => {
    const now = new Date();
    const timeRemaining = saleEndDate - now;

    if (timeRemaining <= 0) {
        offerMessage.innerText = "The sale has ended!";
        countdownElement.innerText = "";
        clearInterval(countdownInterval);
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    countdownElement.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const startCountdown = () => {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
};

document.addEventListener('DOMContentLoaded', startCountdown);