let startTime, timerInterval;
let isRunning = false;
const display = document.getElementById('timer');

window.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
        if (!isRunning) {
            isRunning = true;
            startTime = Date.now();
            timerInterval = setInterval(() => {
                const time = (Date.now() - startTime) / 1000;
                display.innerText = time.toFixed(2);
            }, 10);
        } else {
            isRunning = false;
            clearInterval(timerInterval);
        }
    }
});
