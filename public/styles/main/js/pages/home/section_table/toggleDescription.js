window.onload = function() {
    let isRotated = false;

    function rotateAndShowInfo(event) {
        const button = event.target;
        const card = button.closest('.schedule-container-lessons__card');

        if (!card) {
            return;
        }

        const info = card.querySelector('.schedule-container-lessons__card-description');

        if (!info) {
            console.error("Информация для урока не найдена!");
            return;
        }

        if (isRotated) {
            button.style.transform = 'rotate(0deg)';
            info.style.display = 'none';
            setTimeout(() => {
                info.style.opacity = '0';
            }, 300);
        } else {
            button.style.transform = 'rotate(180deg)';
            info.style.display = 'block';
            setTimeout(() => {
                info.style.opacity = '1';
            }, 10);
        }

        isRotated = !isRotated;
    }

    const scheduleContainer = document.querySelector('.schedule-container-lessons');
    if (scheduleContainer) {
        scheduleContainer.addEventListener('click', function(event) {

            if (event.target && event.target.classList.contains('schedule-container-lessons__card-button__img')) {
                rotateAndShowInfo(event);
            }
        });
    }
};
