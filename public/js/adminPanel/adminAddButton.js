const addButton = document.querySelector(".sticky-button");

const buttonsBackgrounds = {
    "rgb(243, 156, 18)": "Додати оголошення",
    "rgb(155, 89, 182)": "Додати фото в галерею",
    "rgb(55, 143, 125)": "Додати викладача"
}

const popup = document.querySelector(".advertisement__popup");

addButton.addEventListener("click", () => {
    const color = window.getComputedStyle(addButton).getPropertyValue("background-color")

    popup.innerHTML = `<div class="section_advertisement-new-text-close-button">X</div>
                <h2 class="section_advertisement-new_text_name">${buttonsBackgrounds[color]}</h2>
                <form id="user-form" class="user-form">
                        <fieldset>
                            <label for="picture_path">Картинка</label>
                            <input type="text" id="picture_path" name="picture_path" placeholder="Введіть картинку" required autocomplete="picture_path">
                            <label for="title">Заголовок:</label>
                            <input type="text" id="title" name="title" placeholder="Заголовок" required autocomplete="title">
                            <label for="description">Опис:</label>
                            <input type="text" id="description" name="description" placeholder="Введіть опис" required autocomplete="description">
                            <label for="alt_text">Альтернативний текст:</label>
                            <input type="text" id="alt_text" name="alt_text" placeholder="Альтернативний текст" required autocomplete="alt_text">
                            <button type="submit" class="btn-submit">Додати</button>
                        </fieldset>
                    </form>`
    
    popup.style.display = "block";
    
})