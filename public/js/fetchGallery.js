fetch("/api/gallery")
    .then( res => res.json())
    .then( data => {
        const photoBlock = document.querySelector(".content");
        data.forEach(item => {
            photoBlock.innerHTML += `<img src="./${item.photo_path}" alt="Gallery image">`;
        });
    })
    .catch( error => console.error("Error fetching gallery:", error))