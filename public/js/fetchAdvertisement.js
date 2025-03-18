const newAdBlock = document.querySelector(".section_advertisement-new");
const activeAdBlocks = document.querySelector(".section_advertisement-active_list");

fetch("/api/advertisements")
    .then( res => res.json())
    .then( data => {

        // Check data existance
        if(!data.resultForLast){
            console.error("[fetchNewAdvertisement.js] No advertisement to fetch");
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
        totalAds = data.totaAds;

        data.resultsNoLast.forEach(item => {
            activeAdBlocks.innerHTML += `<div class="section_advertisement-active_list-item">
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
                </div>`
        });
    })
    .catch( error => console.error("[fetchNewAdvertisement.js] Error fetching new ad:", error))