const adsBlock = document.querySelector("#announcements .section-admin-panel__content");

async function adminFetchAdvertisement() {
    try{
        const response = await fetch("/api/advertisements");
        const data = await response.json();
        
        // Check data existance
        if(!data.allResults || data.allResults.lenth === 0){
            console.error("[adminFetchAdvertisement.js] No advertisements to fetch");
            return;
        }

        adsBlock.innerHTML = ``;

        data.allResults.forEach(item => {
            adsBlock.innerHTML += `<div class="section_advertisement-active_list-item" data-id="${item.ID}">
                    <div class="section_advertisement-active_list-item-img">
                        <img
                                class="section_advertisement-active_list-item-img_image"
                                src="../${item.picture_path}"
                                alt="${item.alt_text}"
                                loading="lazy">
                    </div>
                    <div class="section_advertisement-active_list-item-text">
                        <h3 class="section_advertisement-active_list-item-text-name">${item.title}</h3>
                    </div>
                    <div class="section__advertisement-container-button">
                        <button class="section__gallery-container-button">Читати більше</button>
                        <div class="menu-container">
                        <button class="menu-button">⋮</button>
                        <div class="dropdown-menu">
                            <button class="edit-ad">Редагувати</button>
                            <button class="delete-ad">Видалити</button>
                        </div>
                    </div>
                    </div>
                </div>`
        });
    }
    catch(error){ console.error("[adminFetchAdvertisement.js] Error fetching advertisements:", error) }
}

const adPopup = document.querySelector(".advertisement__popup");
// Open popup
document.addEventListener("click", (event) => { 
    if(event.target.matches(".section__gallery-container-button"))
    {
        const adBlock = event.target.closest("#announcements .section_advertisement-active_list-item");
        if(!adBlock) return;
        const adID = adBlock.getAttribute("data-id");

        fetch(`/api/advertisements/${adID}`)
        .then( res => res.json())
        .then( data => {

            // Check data existence
            if(!data || data.lenth == 0){
                console.error("[adminFetchAdvertisement.js] No advertisements to fetch");
                return;
            }
            
            adPopup.innerHTML = `<div class="advertisement__text advertisement__text--popup">
                    <div class="section_advertisement-new-text-close-button">X</div>
                    <h2 class="section_advertisement-new_text_name">
                        ${data[0].title}
                    </h2>
                    <p class="section_advertisement-new_text_description">
                        ${data[0].description}
                    </p>
                </div>`    
                
                adPopup.style.display = "block";
        })
        .catch( error => console.error("[adminFetchAdvertisement.js] Error fetching advertisements:", error))
    }
})

//  Insert ads on page loading
adminFetchAdvertisement();

// Close popup 
document.addEventListener("click", (event) => { 
    if(event.target.matches(".section_advertisement-new-text-close-button"))
        adPopup.style.display = "none";
})

//  Add custom event
document.addEventListener("adsUpdate", adminFetchAdvertisement);