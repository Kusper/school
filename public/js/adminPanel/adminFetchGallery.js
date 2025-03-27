const photoBlock = document.querySelector("#gallery .section-admin-panel__content");

async function adminFetcGallery() {
    try{
        const response = await fetch("/api/gallery");
        const data = await response.json();
        
        // Check data existance
        if(!data || data.lenth === 0){
            console.error("No photos to fetch");
            return;
        }

        photoBlock.innerHTML = ``;

        data.forEach(item => {
            photoBlock.innerHTML += `<img 
                        class="section__gallery-image"
                        src="../${item.photo_path}"
                        alt="${item.alt_text}"
                        loading="lazy"
                        itemprop="contentUrl" data-id="${item.ID}">
                        <div class="menu-container">
                        <button class="menu-button">⋮</button>
                        <div class="dropdown-menu">
                            <button class="edit-photo">Редагувати</button>
                            <button class="delete-photo">Видалити</button>
                        </div>`
        });
    }
    catch(error){ console.error("Error fetching photos:", error) }
}

// Insert photos on page loading
adminFetcGallery();

const photoPopup = document.querySelector(".advertisement__popup");
document.addEventListener("click", (event) => { 
    if(event.target.matches(".section__gallery-image"))
    {
        const photoBlock = event.target.closest("#gallery .section__gallery-image");
        if(!photoBlock) return;
        const photoID = photoBlock.getAttribute("data-id");
        
        fetch(`/api/gallery/${photoID}`)
        .then( res => res.json())
        .then( data => {

            // Check data existence
            if(!data || data.lenth == 0){
                console.error("No photo to fetch by ID");
                return;
            }

            photoPopup.innerHTML = `<div class="section_advertisement-new-text-close-button">X</div>
                            <img
                            src="../${data[0].photo_path}"
                            alt="${data[0].alt_text}"
                            loading="lazy"
                            itemprop="contentUrl">`    
                
                photoPopup.style.display = "block";
        })
        .catch( error => console.error("Error fetching our teachers:", error))
    }
})

// Close popup 
document.addEventListener("click", (event) => { 
    if(event.target.matches(".section_advertisement-new-text-close-button"))
        photoPopup.style.display = "none";
})

document.addEventListener("galleryRefresh", adminFetcGallery);