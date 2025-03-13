fetch("/api/our_teachers")
    .then( res => res.json())
    .then( data => {
        const photoBlock = document.querySelector(".content");
        data.forEach(item => {
            photoBlock.innerHTML += `<div style="background-color:#ccc; font-size:10px; margin:10px;">
                <img src="./${item.photo_path}" alt="Teacher image">
                <p>${item.full_name}</p>
                <p>${item.subject}</p>
                <p>${item.description}</p>
            </div>`;
        });
    })
    .catch( error => console.error("Error fetching our_techers:", error))