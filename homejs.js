document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chatBox");
    const chatToggle = document.getElementById("chatToggle");
    const chatClose = document.getElementById("chatClose");

    // Closed when page loads; opens only after clicking the floating button.
    chatToggle.addEventListener("click", function () {
        const isOpen = chatBox.classList.toggle("open");
        chatBox.setAttribute("aria-hidden", String(!isOpen));
    });

    chatClose.addEventListener("click", function () {
        chatBox.classList.remove("open");
        chatBox.setAttribute("aria-hidden", "true");
    });

    // Flash Sale countdown.
    let saleEnd = Date.now() + ((12 * 60 * 60) + (35 * 60) + 48) * 1000;

    function updateCountdown() {
        let remaining = Math.max(0, saleEnd - Date.now());
        let totalSeconds = Math.floor(remaining / 1000);

        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;

        document.getElementById("hours").textContent = String(hours).padStart(2, "0");
        document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
        document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");

        if (remaining <= 0) {
            saleEnd = Date.now() + 24 * 60 * 60 * 1000;
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});