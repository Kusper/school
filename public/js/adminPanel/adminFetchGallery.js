const photoBlock = document.querySelector("#gallery .section-admin-panel__content");

// Insert photos on page loading
fetch("/api/gallery")
    .then( res => res.json())
    .then( data => {

        // Check data existance
        if(!data || data.lenth === 0){
            console.error("[adminFetchPhotos.js] No photos to fetch");
            return;
        }

        data.forEach(item => {
            photoBlock.innerHTML += `<img
                            class="section__gallery-image"
                            src="../${item.photo_path}"
                            alt="${item.alt_text}"
                            loading="lazy"
                            itemprop="contentUrl">`
        });
    })
    .catch( error => console.error("[adminFetchPhotos.js] Error fetching photos:", error))