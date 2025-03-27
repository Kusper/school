const popup = document.querySelector(".advertisement__popup");
const addButton = document.querySelector(".sticky-button");

const buttonsBackgrounds = {
    "rgb(243, 156, 18)": "Оновити оголошення",
    "rgb(155, 89, 182)": "Оновити фото в галерею",
    "rgb(55, 143, 125)": "Оновити викладача"
}

document.addEventListener("submit", async (event) => {

    ///////////////////////////////////////
    ///           Advertisement         ///
    ///////////////////////////////////////
    //  Form for adding ad
    if(event.target && event.target.id === "ad-form") {
        event.preventDefault();
        // console.log("Form submitted");

        const rawData = new FormData(event.target);
        const data = Object.fromEntries(rawData.entries());
        // console.log(data);

        try{
            const res = await fetch("/api/addAdvertisement", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(data)
            })
        
            const result = await res.json();
            if(result.addSuccess) {
                // console.log("Inserted data successfully:", result);
                document.dispatchEvent(new CustomEvent("adsRefresh"));
            } 
            else 
                console.error("Error adding advertisement");
        }
        catch(error){ console.error("Error", error) }
    }

    //  Form for updating ad
    if(event.target && event.target.id === "update-ad-form"){
        event.preventDefault();
        // console.log("Form submitted");

        const rawData = new FormData(event.target);
        const data = Object.fromEntries(rawData.entries());
        console.log(data);

        try{
            const res = await fetch("/api/updateAdvertisement", {
                method: "PATCH",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(data)
            })
            console.log(JSON.stringify(data));
        
            const result = await res.json();
            console.log(result);
            if(result.updateSuccess) {
                // console.log("Inserted data successfully:", result);
                document.dispatchEvent(new CustomEvent("adsRefresh"));
            } 
            else 
                console.error("Error updating advertisement");
        }
        catch(error){ console.error("Error", error) }
    }

    ///////////////////////////////////////
    ///           Our teachers          ///
    ///////////////////////////////////////
    //  Form for adding teacher
    if(event.target && event.target.id === "teacher-form") {
        event.preventDefault();
        console.log("Form submitted");

        const rawData = new FormData(event.target);
        const data = Object.fromEntries(rawData.entries());
        console.log(data);

        try{
            const res = await fetch("/api/addOur_teacher", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(data)
            })
        
            const result = await res.json();
            if(result.addSuccess) {
                console.log("Inserted data successfully:", result);
                document.dispatchEvent(new CustomEvent("teachersRefresh"));
            } 
            else 
                console.error("Error adding teacher");
        }
        catch(error){ console.error("Error", error) }
    }

    //  Form for updating teacher
    else if(event.target && event.target.id === "update-teacher-form"){
        event.preventDefault();
        console.log("Form submitted");

        const rawData = new FormData(event.target);
        const data = Object.fromEntries(rawData.entries());
        console.log(data);

        try{
            const res = await fetch("/api/updateOur_teacher", {
                method: "PATCH",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(data)
            })
            console.log(JSON.stringify(data));
        
            const result = await res.json();
            console.log(result);
            if(result.updateSuccess) {
                console.log("Inserted data successfully:", result);
                document.dispatchEvent(new CustomEvent("teachersRefresh"));
            } 
            else 
                console.error("Error updating teacher");
        }
        catch(error){ console.error("Error", error) }
    }

    ///////////////////////////////////////
    ///          Photo gallery          ///
    ///////////////////////////////////////
    //  Form for adding teacher
    if(event.target && event.target.id === "photo-form") {
        event.preventDefault();
        // console.log("Form submitted");

        const rawData = new FormData(event.target);
        const data = Object.fromEntries(rawData.entries());
        // console.log(data);

        try{
            const res = await fetch("/api/addPhoto", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(data)
            })
        
            const result = await res.json();
            if(result.addSuccess) {
                // console.log("Inserted data successfully:", result);
                document.dispatchEvent(new CustomEvent("galleryRefresh"));
            } 
            else 
                console.error("Error adding photo");
        }
        catch(error){ console.error("Error", error) }
    }
})

document.addEventListener("click", async (event) => {

    //  Close/open drop-down menu
    const menuButton = event.target.closest(".menu-button");
    const menuContainer = event.target.closest(".menu-container");
    
    document.querySelectorAll(".menu-container").forEach(container => {
        if (container !== menuContainer) container.classList.remove("open");
    });

    if (menuButton)
        menuContainer.classList.toggle("open");

    ///////////////////////////////////////
    ///           Advertisement         ///
    ///////////////////////////////////////
    //  Handle delete
    if (event.target.classList.contains("delete-ad")) {
        const adItem = event.target.closest(".section_advertisement-active_list-item");
        const adID = adItem.dataset.id;

        try{
            const res = await fetch(`/api/deleteAdvertisement/${adID}`, { method: "DELETE" })
            const result = await res.json();
            // console.log(result);
            if(result.removeSuccess) {
                // console.log("Inserted data successfully:", result);
                document.dispatchEvent(new CustomEvent("adsRefresh"));
            } 
            else 
                console.error("Error removing advertisement");
        }
        catch(error){ console.error("[adminAddAdvertisement.js] Error:", error) }
    }

    //  Open popup to handle edit
    if(event.target.classList.contains("edit-ad")){
            const adItem = event.target.closest(".section_advertisement-active_list-item");
            const adID = adItem.dataset.id;
            const color = window.getComputedStyle(addButton).getPropertyValue("background-color")

            popup.innerHTML = `<div class="section_advertisement-new-text-close-button">X</div>
                        <h2 class="section_advertisement-new_text_name">${buttonsBackgrounds[color]}</h2>
                        <form id="update-ad-form" class="user-form">
                                <fieldset>
                                    <label for="adID">adID</label>
                                    <input type="text" id="adID" name="adID" placeholder="adID" readonly autocomplete="adID" value="${adID}">
                                    <label for="picture_path">Картинка</label>
                                    <input type="text" id="picture_path" name="picture_path" placeholder="Введіть картинку" required autocomplete="picture_path">
                                    <label for="title">Заголовок:</label>
                                    <input type="text" id="title" name="title" placeholder="Заголовок" required autocomplete="title">
                                    <label for="description">Опис:</label>
                                    <input type="text" id="description" name="description" placeholder="Введіть опис" required autocomplete="description">
                                    <label for="alt_text">Альтернативний текст:</label>
                                    <input type="text" id="alt_text" name="alt_text" placeholder="Альтернативний текс" required autocomplete="alt_text">
                                    <button type="submit" class="btn-submit">Оновити</button>
                                </fieldset>
                            </form>`

            popup.style.display = "block";
    }
    
    ///////////////////////////////////////
    ///           Our teachers          ///
    ///////////////////////////////////////
    //  Handle delete
    if (event.target.classList.contains("delete-teacher")) {
        const teacherItem = event.target.closest(".section_advertisement-active_list-item");
        const teacherID = teacherItem.dataset.id;
        console.log("Deleting teacher ID=", teacherID);

        try{
            const res = await fetch(`/api/deleteOur_teacher/${teacherID}`, { method: "DELETE" })
            const result = await res.json();
            console.log(result);
            if(result.removeSuccess) {
                console.log("Inserted data successfully:", result);
                document.dispatchEvent(new CustomEvent("teachersRefresh"));
            } 
            else 
                console.error("Error removing advertisement");
        }
        catch(error){ console.error("Error:", error) }
    }

    //  Open popup to handle edit
    if(event.target.classList.contains("edit-teacher")){
        const teacherItem = event.target.closest(".section_advertisement-active_list-item");
        const teacherID = teacherItem.dataset.id;
        console.log("Now editing teacher ", teacherID);
        const color = window.getComputedStyle(addButton).getPropertyValue("background-color")

        popup.innerHTML = `<div class="section_advertisement-new-text-close-button">X</div>
                    <h2 class="section_advertisement-new_text_name">${buttonsBackgrounds[color]}</h2>
                    <form id="update-teacher-form" class="user-form">
                            <fieldset>
                                <label for="teacherID">teacherID</label>
                                <input type="text" id="teacherID" name="teacherID" placeholder="teacherID" readonly autocomplete="teacherID" value="${teacherID}">
                                <label for="picture_path">Картинка</label>
                                <input type="text" id="picture_path" name="picture_path" placeholder="Введіть картинку" required autocomplete="picture_path">
                                <label for="full_name">ПІБ</label>
                                <input type="text" id="full_name" name="full_name" placeholder="Іванов Іван Іванович" required autocomplete="full_name">
                                <label for="subject">Предмети</label>
                                <input type="text" id="subject" name="subject" placeholder="Введіть предмет" required autocomplete="subject">
                                <label for="description">Опис</label>
                                <input type="text" id="description" name="description" placeholder="Введіть опис" required autocomplete="description">
                                <button type="submit" class="btn-submit">Оновити</button>
                            </fieldset>
                        </form>`

        popup.style.display = "block";
}

    ///////////////////////////////////////
    ///          Photo gallery          ///
    ///////////////////////////////////////
    //  Handle delete
    if (event.target.classList.contains("delete-photo")) {
        const photoItem = event.target.closest(".section__gallery-image");
        const photoID = photoItem.getAttribute("data-id");
        console.log("Deleting photo ID=", photoID);

        // try{
        //     const res = await fetch(`/api/deletePhoto/${photoID}`, { method: "DELETE" })
        //     const result = await res.json();
        //     console.log(result);
        //     if(result.removeSuccess) {
        //         console.log("Deleted data successfully:", result);
        //         document.dispatchEvent(new CustomEvent("photosRefresh"));
        //     } 
        //     else 
        //         console.error("Error removing photo");
        // }
        // catch(error){ console.error("Error:", error) }
    }
});
