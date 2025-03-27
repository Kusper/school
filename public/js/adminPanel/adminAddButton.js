const addButton = document.querySelector(".sticky-button");

const popupType = {
    "rgb(243, 156, 18)": "Додати оголошення",
    "rgb(155, 89, 182)": "Додати фото в галерею",
    "rgb(55, 143, 125)": "Додати викладача"
}

const popup = document.querySelector(".advertisement__popup");

addButton.addEventListener("click", () => {
    const color = window.getComputedStyle(addButton).getPropertyValue("background-color")
    const type = popupType[color];

    if(type === "Додати оголошення"){
        popup.innerHTML = `<div class="section_advertisement-new-text-close-button">X</div>
                    <h2 class="section_advertisement-new_text_name">${type}</h2>
                    <form id="ad-form" class="user-form">
                            <fieldset>
                                <label for="picture_path">Картинка:</label>
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
    }
    else if(type === "Додати фото в галерею"){
        popup.innerHTML = `<div class="section_advertisement-new-text-close-button">X</div>
                    <h2 class="section_advertisement-new_text_name">${type}</h2>
                    <form id="photo-form" class="user-form">
                            <fieldset>
                                <label for="photo_path">Картинка</label>
                                <input type="text" id="photo_path" name="photo_path" placeholder="Введіть картинку" required autocomplete="photo_path">
                                <label for="alt_text">Альтернативний текст:</label>
                                <input type="text" id="alt_text" name="alt_text" placeholder="Альтернативний текст" required autocomplete="alt_text">
                                <button type="submit" class="btn-submit">Додати</button>
                            </fieldset>
                        </form>`
    }
    else if(type === "Додати викладача"){
        popup.innerHTML = `<div class="section_advertisement-new-text-close-button">X</div>
                    <h2 class="section_advertisement-new_text_name">${type}</h2>
                    <form id="teacher-form" class="user-form">
                            <fieldset>
                                <label for="picture_path">Фото виклада:</label>
                                <input type="text" id="picture_path" name="picture_path" placeholder="Введіть картинку" required autocomplete="picture_path">
                                <label for="full_name">ПІБ:</label>
                                <input type="text" id="full_name" name="full_name" placeholder="Іванов Іван Іванович" required autocomplete="full_name">
                                <label for="subject">Предмет:</label>
                                <input type="text" id="subject" name="subject" placeholder="Назва" required autocomplete="subject">
                                <label for="description">Опис:</label>
                                <input type="text" id="description" name="description" placeholder="Введіть опис" required autocomplete="description">
                                <button type="submit" class="btn-submit">Додати</button>
                            </fieldset>
                        </form>`
    }  
    popup.style.display = "block";
    
})