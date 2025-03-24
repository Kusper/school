const button = document.querySelector(".section__gallery-container-button");
let offset = 0;
const limit = 12;
let totalPhotos = 0;

async function loadPhotos() {
    try{
        const response = await fetch(`/api/gallery?offset=${offset}&limit=${limit}`);
        const data = await response.json();

        // Check data existance
        if( data.results.length === 0 || offset >= data.totalPhotos){
            button.style.display = "none";
            return;
        }

        totalPhotos = data.totalPhotos;

        const galleryItems = document.querySelectorAll(".section__gallery-item");
        data.results.forEach((item, index) => {
            const targetDiv = galleryItems[(index + offset) % galleryItems.length];
            targetDiv.innerHTML += `<img
                            class="section__gallery-image"
                            src="../${item.photo_path}"
                            alt="${item.alt_text}"
                            loading="lazy"
                            itemprop="contentUrl">`; 
        });
    
        offset += limit;

        if( offset >= totalPhotos)
            button.style.display = "none";
    }
    catch(error) { console.error("[showMorePhotosButton.js] Error fetching gallery:", error) }
    
}

// Insert photos on page loading
loadPhotos();

button.addEventListener("click", function (e) {
    e.preventDefault();
    loadPhotos();
});

