document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".tab-button");
    const contents = document.querySelectorAll(".tab-content");
    const stickyButton = document.querySelector(".sticky-button");

    const rootStyles = getComputedStyle(document.documentElement);
    const colorMap = {
        "announcements": rootStyles.getPropertyValue("--color-announcements").trim(),
        "gallery": rootStyles.getPropertyValue("--color-gallery").trim(),
        "teachers": rootStyles.getPropertyValue("--color-teachers").trim()
    };

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("active"));
            contents.forEach(content => content.classList.remove("active"));

            button.classList.add("active");
            const target = button.getAttribute("data-target");
            document.getElementById(target).classList.add("active");

            updateButtonColors(target);
        });
    });

    function updateButtonColors(target) {
        buttons.forEach(btn => {
            btn.style.backgroundColor = rootStyles.getPropertyValue("--color-default").trim();
        });

        const activeButton = document.querySelector(`.tab-button[data-target="${target}"]`);
        if (activeButton) {
            activeButton.style.backgroundColor = colorMap[target];
        }

        stickyButton.style.backgroundColor = colorMap[target] || rootStyles.getPropertyValue("--color-default").trim();
    }

    updateButtonColors("announcements");
});
