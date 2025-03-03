fetch("/api/schedule")
    .then(res => {
        if(res.ok) console.log("/api/schedule SUCCESS")
        else console.log("/api/schedule FAILURE");
    })
    .then(data => { 
        // console.log("s")
    
    
    
    })
    .catch(error => console.error(error));