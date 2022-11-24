"use strict";
// PART II: WRITE OPERATION
// Implement a user interface that allows the user to create an artist. A POST request containing the
// information about the artist to be created must be sent using the Fetch API. The data must be sent in JSON
// format. 


// document.querySelector('button').click(function(){
//     document.querySelector('.alert').classList.add("show");
//     document.querySelector('.alert').classList.remove("hide");
//     document.querySelector('.alert').classList.add("showAlert");
//     setTimeout(function(){
//       document.querySelector('.alert').classList.remove("show");
//       document.querySelector('.alert').classList.add("hide");
//     },2000);
//   });
//     document.getElementByClassName("close-btn").click(function(){
//     document.getElementByClassName("alert").classList.remove("show");
//     document.getElementByClassName("alert").classList.add("hide");
//   });


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

const btn = document.querySelector('.enter-data');
btn.addEventListener("click",() =>{
    document.querySelector('.jip').classList.add('active');
});

const after = document.querySelector(".jip .close-btn");
after.addEventListener("click",() =>{
    document.querySelector('.jip').classList.remove('active');
});

