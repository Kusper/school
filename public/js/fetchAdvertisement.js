const newAdBlock = document.querySelector(".section_advertisement-new");
const activeAdBlocks = document.querySelector(".section_advertisement-active_list");

// Insert ads on page loading
fetch("/api/advertisements")
    .then( res => res.json())
    .then( data => {

        // Check data existance
        if(!data.resultForLast){
            console.error("[fetchAdvertisement.js] No advertisements to fetch");
            return;
        }

        ///////////////////////////////////////
        ///         Load new Ad             ///
        ///////////////////////////////////////
        newAdBlock.innerHTML = `<div class="section_advertisement-new-img">
                <img
                        class="section_advertisement-new-img_image"
                        src="../${data.resultForLast[0].picture_path}"
                        alt="${data.resultForLast[0].alt_text}"
                        loading="lazy">
            </div>
            <div class="section_advertisement-new_text hidden-tablet">
                <h2 class="section_advertisement-new_text_name">
                    ${data.resultForLast[0].title}
                </h2>
                <p class="section_advertisement-new_text_description">
                    ${data.resultForLast[0].description}
                </p>
            </div>
            <div class="section__gallery-container">
                <button class="section__gallery-container-button visible-tablet">Читати більше</button>
            </div>`;

        ///////////////////////////////////////
        ///        Load active Ads          ///
        ///////////////////////////////////////
        data.resultsNoLast.forEach(item => {
            activeAdBlocks.innerHTML += `<div class="section_advertisement-active_list-item" data-id="${item.ID}">
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
                    </div>
                </div>`
        });
    })
    .catch( error => console.error("[fetchAdvertisement.js] Error fetching new advertisement:", error))

///////////////////////////////////////
///        Event listeners          ///
///////////////////////////////////////
const popup = document.querySelector(".advertisement__popup");
// Open popup
document.addEventListener("click", (event) => { 
    if(event.target.matches(".section__gallery-container-button"))
    {
        const adBlock = event.target.closest(".section_advertisement-active_list-item");
        const adID = adBlock.getAttribute("data-id");

        fetch(`/api/advertisements/${adID}`)
        .then( res => res.json())
        .then( data => {

            // Check data existence
            if(!data || data.lenth == 0){
                console.error("[fetchAdvertisement.js] No advertisements to fetch by ID");
                return;
            }

            popup.innerHTML = `<div class="advertisement__text advertisement__text--popup">
                    <div class="section_advertisement-new-text-close-button">X</div>
                    <h2 class="section_advertisement-new_text_name">
                        ${data[0].title}
                    </h2>
                    <p class="section_advertisement-new_text_description">
                        ${data[0].description}
                    </p>
                </div>`    
                
            popup.style.display = "block";
        })
        .catch( error => console.error("[fetchAdvertisement.js] Error fetching new advertisement:", error))
    }
})

// Close popup 
document.addEventListener("click", (event) => { 
    if(event.target.matches(".section_advertisement-new-text-close-button"))
    {
        popup.style.display = "none";
        popup.innerHTML = ``;
    }
})