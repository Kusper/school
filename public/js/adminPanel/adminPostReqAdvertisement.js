const popup = document.querySelector(".advertisement__popup");
const addButton = document.querySelector(".sticky-button");

const buttonsBackgrounds = {
    "rgb(243, 156, 18)": "Оновити оголошення",
    "rgb(155, 89, 182)": "Оновити фото в галерею",
    "rgb(55, 143, 125)": "Оновити викладача"
}

document.addEventListener("submit", async (event) => {

    //  Form for adding a record
    
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
                document.dispatchEvent(new CustomEvent("adsUpdate"));
            } 
            else 
                console.error("Error adding advertisement");
        }
        catch(error){ console.error("Error", error) }
    }

    //  Form for updating a record
    
    if(event.target && event.target.id === "update-form"){
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
                document.dispatchEvent(new CustomEvent("adsUpdate"));
            } 
            else 
                console.error("Error updating advertisement");
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
                document.dispatchEvent(new CustomEvent("adsUpdate"));
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
                        <form id="update-form" class="user-form">
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

    //  Handle update
    // if (event.target.classList.contains("edit-ad")) {
    //     const adItem = event.target.closest(".section_advertisement-active_list-item");
    //     const adID = adItem.dataset.id;
    //     console.log(`Editing ad wwith ID=${adID}`);

    //     try{
    //         const res = await fetch(`/api/deleteAdvertisement/${adID}`, { 
    //             method: "PATCH",

    //         })
    //         const result = await res.json();
    //         // console.log(result);
    //         if(result.removeSuccess) {
    //             // console.log("Inserted data successfully:", result);
    //             document.dispatchEvent(new CustomEvent("adsUpdate"));
    //         } 
    //         else 
    //             console.error("Error removing advertisement");
    //     }
    //     catch(error){ console.error("[adminAddAdvertisement.js] Error:", error) }
    // }    
});
