const teachersBlock = document.querySelector("#teachers .section-admin-panel__content");

async function adminFetchOurTeachers() {
    try{
        const response = await fetch("/api/our_teachers");
        const data = await response.json();
        
        // Check data existance
        if(!data || data.lenth === 0){
            console.error("No teacher to fetch");
            return;
        }

        teachersBlock.innerHTML = ``;

        data.forEach(item => {
            teachersBlock.innerHTML += `<article class="section_advertisement-active_list-item background-color" itemscope itemtype="https://schema.org/Person" data-id="${item.ID}">
                    <div class="section_advertisement-active_list-item-img">
                        <img
                                class="section_advertisement-active_list-item-img_image"
                                src="../${item.picture_path}"
                                alt="Портрет викладача ${item.full_name}"
                                loading="lazy"
                                itemprop="image">
                    </div>
                    <div class="section_advertisement-active_list-item-text">
                        <h2 class="section_advertisement-active_list-item-text-name" itemprop="name">${item.full_name}</h2>
                    </div>
                    <div class="section__advertisement-container-button">
                        <button class="section__gallery-container-button">Читати більше</button>
                        <div class="menu-container">
                        <button class="menu-button">⋮</button>
                        <div class="dropdown-menu">
                            <button class="edit-teacher">Редагувати</button>
                            <button class="delete-teacher">Видалити</button>
                        </div>
                    </div>
                </article>`
        });
    }
    catch(error){ console.error("Error fetching teachers:", error) }
}

const teacherPopup = document.querySelector(".advertisement__popup");
// Open popup
document.addEventListener("click", (event) => { 
    if(event.target.matches(".section__gallery-container-button"))
    {
        const teacherBlock = event.target.closest("#teachers .section_advertisement-active_list-item");
        if(!teacherBlock) return;
        const teacherID = teacherBlock.getAttribute("data-id");
        
        fetch(`/api/our_teachers/${teacherID}`)
        .then( res => res.json())
        .then( data => {

            // Check data existence
            if(!data || data.lenth == 0){
                console.error("[adminFetchPhotos.js] No teacher to fetch by ID");
                return;
            }

            teacherPopup.innerHTML = `<div class="advertisement__text advertisement__text--popup">
                    <div class="section_advertisement-new-text-close-button">X</div>
                    <div class="section_advertisement-active_list-item-img">
                        <img
                                class="section_advertisement-active_list-item-img_image section_advertisement-active_list-item-img_image-popup"
                                src="../${data[0].picture_path}"
                                alt="Портрет викладача ${data[0].full_name}"
                                loading="lazy"
                                itemprop="image">
                    </div>
                    <h2 class="section_advertisement-new_text_name">
                        ${data[0].full_name}
                    </h2>
                    <p class="section_advertisement-new_text_description section_advertisement-new_text_name">
                        ${data[0].subject}
                    </p>
                    <br>
                    <p class="section_advertisement-new_text_description">
                        ${data[0].description}
                    </p>
                </div>`    
                
                teacherPopup.style.display = "block";
        })
        .catch( error => console.error("[adminFetchPhotos.js] Error fetching our teachers:", error))
    }
})

adminFetchOurTeachers();

// Close popup 
document.addEventListener("click", (event) => { 
    if(event.target.matches(".section_advertisement-new-text-close-button"))
        teacherPopup.style.display = "none";
})

//  Add custom event
document.addEventListener("teachersRefresh", adminFetchOurTeachers);