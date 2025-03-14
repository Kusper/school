document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".section__gallery-button");
    const hiddenItems = document.querySelectorAll(".section__gallery-item.hidden");

    button.addEventListener("click", function () {
        let shown = 0;

        hiddenItems.forEach((item) => {
            if (shown < 2) {
                item.classList.remove("hidden");
                shown++;
            }
        });

        if (document.querySelectorAll(".section__gallery-item.hidden").length === 0) {
            button.style.display = "none";
        }
    });
});
