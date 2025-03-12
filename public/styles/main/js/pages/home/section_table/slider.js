document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".section_teacher-slide");
    const ribbonItems = document.querySelectorAll(".section_teacher-ribbon-item");
    const prevArrow = document.querySelector(".prev-arrow");
    const nextArrow = document.querySelector(".next-arrow");
    let currentIndex = 0;
    let autoSlideInterval;

    function changeSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });
        ribbonItems.forEach((item, i) => {
            item.classList.toggle("active", i === index);
        });
        updateIndicators(index);
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        changeSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        changeSlide(currentIndex);
    }

    function startAutoSlide(delay = 5000) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, delay);
    }

    function updateIndicators(index) {
        document.querySelectorAll(".indicator").forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }

    ribbonItems.forEach((item, index) => {
        item.addEventListener("click", function () {
            currentIndex = index;
            changeSlide(currentIndex);
            startAutoSlide(30000);
        });
    });

    prevArrow.addEventListener("click", function () {
        prevSlide();
        startAutoSlide(30000);
    });

    nextArrow.addEventListener("click", function () {
        nextSlide();
        startAutoSlide(30000);
    });

    changeSlide(currentIndex);
    startAutoSlide();
});
