const END_DATE = new Date('2025-08-15T23:59:59');

const updateClock = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const clockElement = document.getElementById('clock');
    clockElement.innerText = `${hours}:${minutes}:${seconds}`;

    // Countdown logic
    const timeLeft = END_DATE - now;
    const countdownElement = document.getElementById('countdown');
    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutesLeft = Math.floor((timeLeft / (1000 * 60)) % 60);
        const secondsLeft = Math.floor((timeLeft / 1000) % 60);
        countdownElement.innerText = 
            `Sale ends in: ${days}d ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
    } else {
        countdownElement.innerText = "Sale Ended!";
    }
};

const startClock = () => {
    updateClock();
    setInterval(updateClock, 1000);
};

document.addEventListener('DOMContentLoaded', startClock);