"use strict";
// PART II: WRITE OPERATION
// Implement a user interface that allows the user to create an artist. A POST request containing the
// information about the artist to be created must be sent using the Fetch API. The data must be sent in JSON
// format. 


/** @function 
 * @name createArtist
 * @description Creates a new artist
 * @param {string} name - The name of the artist
*/
// 1. Create a new artist
async function createArtist() {
    console.log("Creating new artist");
    let resourceUri = "http://localhost/music-api/artists";
    let artistId = document.getElementById("creationid").value;
    let artistname = document.getElementById("creationame").value;
    let message = document.getElementById("createMessage");
    let artist = {
        "ArtistId": artistId,
        "Name": artistname
    };

    let response = await fetch(resourceUri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify([artist])
    });
    if (response.ok) {
        message.innerHTML = 'Artists created successfully';
        message.style.color = "#00FF00"
    }
    else{
        message.innerHTML = 'Error creating artist';
        message.style.color = "#FF0000"
    }
    
    
    // .then(response => response.text())
    //     .then(data => {
    //         if(data){
    //             
    //             // documente.getElementById("createMessage").innerHTML = 'A';
    //         }
    //         console.log(data);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         message.innerHTML = '';
    //         message.style.color = "#FF0000"
    //     });
}

const btn = document.querySelector('.enter-data');
btn.addEventListener("click",() =>{
    document.querySelector('.jip').classList.add('active');
});

const after = document.querySelector(".jip .close-btn");
after.addEventListener("click",() =>{
    document.querySelector('.jip').classList.remove('active');
});

