fetch("/api/schedule")
    .then( res => res.json())
    .then( data => {
        const photoBlock = document.querySelector(".content");
        data.forEach(item => {
            photoBlock.innerHTML += `<div style="background-color:#ccc; font-size:10px; margin:10px;">
                <p>${item.subject}</p>
                <p>${item.teacher}</p>
                <p>${item.date}</p>
                <p>${item.start_time} - ${item.end_time}</p>
                <p>${item.topic}</p>
            </div>`;
        });
    })
    .catch( error => console.error("Error fetching schedule:", error))