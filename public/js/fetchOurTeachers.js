const teachersBlock = document.querySelector(".section_advertisement-active_list");


fetch("/api/our_teachers")
    .then( res => res.json())
    .then( data => {
        data.forEach(item => {
            teachersBlock.innerHTML += `<article class="section_advertisement-active_list-item" itemscope itemtype="https://schema.org/Person">
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
                </article>`;
        });
    })
    .catch( error => console.error("Error fetching our_techers:", error))