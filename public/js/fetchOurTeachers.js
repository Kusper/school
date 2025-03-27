const teachersBlock = document.querySelector(".section_advertisement-active_list");

// Insert our teachers on page load
fetch("/api/our_teachers")
    .then( res => res.json())
    .then( data => {
        data.forEach(item => {
            // Check data existence
            if(!data || data.lenth == 0){
                console.error("[fetchOurTeachers.js] No teacher to fetch");
                return;
            }

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
                    </div>
                </article>`;
        });
    })
    .catch( error => console.error("[fetchOurTeachers.js] Error fetching our teachers:", error))

const popup = document.querySelector(".advertisement__popup");
// Open popup
document.addEventListener("click", (event) => { 
    if(event.target.matches(".section__gallery-container-button"))
    {
        const teacherBlock = event.target.closest(".section_advertisement-active_list-item");
        const teacherID = teacherBlock.getAttribute("data-id");
        
        fetch(`/api/our_teachers/${teacherID}`)
        .then( res => res.json())
        .then( data => {

            // Check data existence
            if(!data || data.lenth == 0){
                console.error("[fetchOurTeachers.js] No teacher to fetch by ID");
                return;
            }

            popup.innerHTML = `<div class="advertisement__text advertisement__text--popup">
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
                
            popup.style.display = "block";
        })
        .catch( error => console.error("[fetchOurTeachers.js] Error fetching our teacher:", error))
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