document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".tab-button");
    const contents = document.querySelectorAll(".tab-content");
    const stickyButton = document.querySelector(".sticky-button");

    // Получаем SCSS переменные
    const rootStyles = getComputedStyle(document.documentElement);
    const colorMap = {
        "announcements": rootStyles.getPropertyValue("--color-announcements").trim(),
        "gallery": rootStyles.getPropertyValue("--color-gallery").trim(),
        "teachers": rootStyles.getPropertyValue("--color-teachers").trim(),
        "add-user": rootStyles.getPropertyValue("--color-add-user").trim()
    };

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // Удаляем активные классы
            buttons.forEach(btn => btn.classList.remove("active"));
            contents.forEach(content => content.classList.remove("active"));

            // Добавляем активный класс к кнопке и вкладке
            button.classList.add("active");
            const target = button.getAttribute("data-target");
            document.getElementById(target).classList.add("active");

            // Меняем цвет активной кнопки и стикер-кнопки
            updateButtonColors(target);
        });
    });

    function updateButtonColors(target) {
        // Сбрасываем цвета всех кнопок
        buttons.forEach(btn => {
            btn.style.backgroundColor = rootStyles.getPropertyValue("--color-default").trim();
        });

        // Меняем цвет активной кнопки
        const activeButton = document.querySelector(`.tab-button[data-target="${target}"]`);
        if (activeButton) {
            activeButton.style.backgroundColor = colorMap[target];
        }

        // Меняем цвет стикер-кнопки (меню)
        stickyButton.style.backgroundColor = colorMap[target] || rootStyles.getPropertyValue("--color-default").trim();
    }

    // Устанавливаем стартовый цвет
    updateButtonColors("announcements");
});
