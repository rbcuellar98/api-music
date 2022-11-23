"use strict";
// PART II: WRITE OPERATION
// Implement a user interface that allows the user to create an artist. A POST request containing the
// information about the artist to be created must be sent using the Fetch API. The data must be sent in JSON
// format. 

// 1. Create a new artist
function createArtist() {
    console.log("Creating new artist");
    let resourceUri = "http://localhost/music-api/artists";
    let artist = {
        "Name": "New Artist"
    };
    fetch(resourceUri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(artist)
    }).then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log(error));
}

