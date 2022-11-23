"use strict";
//All errors returned to the client must be detected and handled.
function errorHandler() {
    document.getElementById('alert').style.display = 'none';
}

//1. The list of artists
function getListOfArtists() {
    console.log("Getting list of artists");
    // let resourceUri = "http://10.1.3.160/music-api/artists/1/albums/1/tracks";
    let resourceUri = "http://localhost/music-api/artists";
    fetch(resourceUri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            getAllArtists(data);
            
        })
        .catch(error => errorHandler(error));
}

//1. The list of artists
function getAllArtists(artists) {
    document.getElementById("artistTable").style.display = "block";
    document.getElementById("givenArtistTable").style.display = "none";
    document.getElementById("albumsByArtist").style.display = "none";
    document.getElementById("specificsTable").style.display = "none";
    document.getElementById("givenPurchaseTable").style.display = "none";
    document.getElementById("customerTable").style.display = "none";
    //-- parse the json response data
    console.log(artists);
    let rows = '';
    let artistsList = document.getElementById("artistsList")

    for (let item in artists) {
        console.log(artists[item]);
        let artist = artists[item];
        //- mediatype, name, publisher, isbn
        rows += `
        <tr>
            <td> ${artist.ArtistId} </td>
            <td> ${artist.Name} </td>
            
        </tr>`;
    }
    artistsList.innerHTML = rows;
    console.log(artists.aritstID);
}

// 2. The details of a given artist (resource URI: /artists/{artist_id})
function getArtistDetails() {
    console.log("Getting artist details");
    let inputs = document.getElementById("inputs").value;
    let resourceUri = "http://localhost/music-api/artists/" + inputs;
    // let resourceUri = "http://localhost/music-api/artists/6";
    fetch(resourceUri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            getArtist(data);

        })
        .catch(error => errorHandler(error));
        
}
// 2. The details of a given artist (resource URI: /artists/{artist_id})
function getArtist(artist) {
    document.getElementById("artistTable").style.display = "none";
    document.getElementById("givenArtistTable").style.display = "block";
    document.getElementById("albumsByArtist").style.display = "none";
    document.getElementById("specificsTable").style.display = "none";
    document.getElementById("givenPurchaseTable").style.display = "none";
    document.getElementById("customerTable").style.display = "none";
    //-- parse the json response data
    console.log(artist);
    let rows = '';
    let givenArtistsList = document.getElementById("givenArtistsList");
        //- mediatype, name, publisher, isbn
        rows += `
        <tr>
            <td> ${artist.ArtistId} </td>
            <td> ${artist.Name} </td> 
        </tr>`;
        console.log(rows);
    givenArtistsList.innerHTML = rows;
}

// 3 The list of albums released by a given artist
function getListOfAlbumsByArtists(){
    console.log("Getting list of albums by artists");
    let inputs = document.getElementById("inputs").value;
    let resourceUri = "http://localhost/music-api/artists/"+ inputs +"/albums";
    // let resourceUri = "http://localhost/music-api/artists/6/albums";  
    fetch(resourceUri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            getAllAlbums(data);
            
        })
        .catch(error => errorHandler(error));
}
// 3 The list of albums released by a given artist
function getAllAlbums(albums) {
    document.getElementById("artistTable").style.display = "none";
    document.getElementById("givenArtistTable").style.display = "none";
    document.getElementById("albumsByArtist").style.display = "block";
    document.getElementById("specificsTable").style.display = "none";
    document.getElementById("givenPurchaseTable").style.display = "none";
    document.getElementById("customerTable").style.display = "none";
    

    //-- parse the json response data
    console.log(albums);
    let rows = '';
    let albumsByArtistList = document.getElementById("albumsByArtistList")
    for (let item in albums) {
        console.log(albums[item]);
        let album = albums[item];
        //- mediatype, name, publisher, isbn
        rows += `
        <tr>
            <td> ${album.ArtistId} </td>
            <td> ${album.Name} </td>
            <td> ${album.AlbumId} </td>
            <td> ${album.Title} </td>
        </tr>`;
    }   
    albumsByArtistList.innerHTML = rows;
    
}

// 4The list of tracks for the specified album and artist. The user should be able to filter the list by genre or
// media type. Actual values must be used (and not IDs of genre or media type).
// (resource URI: /artists/{artist_id}/albums/{album_id}/tracks)
function getListOfTracksByAlbumAndArtist() {
    console.log("Getting list of tracks by album and artist");
    let inputs = document.getElementById("inputs").value;
    let resourceUri = "http://localhost/music-api/artists/"+ inputs+ "/albums/" + inputs+"/tracks";
    // let resourceUri = "http://localhost/music-api/artists/3/albums/2/tracks";
    fetch(resourceUri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            getAllTracksByAlbumAndArtists(data);

        })
        .catch(error => errorHandler(error));
}
// 4 The list of tracks for the specified album and artist. The user should be able to filter
// the list by genre or media type. Actual values must be used (and not IDs of genre or media type).
// (resource URI: /artists/{artist_id}/albums/{album_id}/tracks)
function getAllTracksByAlbumAndArtists(tracks) {
    document.getElementById("artistTable").style.display = "none";
    document.getElementById("givenArtistTable").style.display = "none";
    document.getElementById("albumsByArtist").style.display = "none";
    document.getElementById("specificsTable").style.display = "block";
    document.getElementById("givenPurchaseTable").style.display = "none";
    document.getElementById("customerTable").style.display = "none";

    //-- parse the json response data
    let rows = '';
    console.log(tracks);
    let tracksByArtistList = document.getElementById("tracksByArtistList")
    for (let item in tracks) {
        // console.log(tracks[item]);
        let track = tracks[item];
        //- mediatype, name, publisher, isbn
        rows += `
        <tr>
        <td> ${track.ArtistId} </td>
            <td> ${track.Name} </td>
            <td> ${track.AlbumId} </td>
            <td> ${track.Title} </td>
            <td> ${track.TrackId} </td>
            <td> ${track.MediaTypeId} </td>
            <td> ${track.GenreId} </td>
            <td> ${track.Composer} </td>
            <td> ${track.Milliseconds} </td>
            <td> ${track.Bytes} </td>
            <td> ${track.UnitPrice} </td>
        </tr>`;
    }
    tracksByArtistList.innerHTML = rows;
}


// 5. The list of tracks purchased by a given customer.(resource URI: /customers/{customer_id}/invoices)
function getListOfTracksPurchasedByCustomer() {
    console.log("Getting list of tracks purchased by customer");
    let inputs = document.getElementById("inputs").value;
    let resourceUri = "http://localhost/music-api/customers/"+ inputs + "/invoices";
    // let resourceUri = "http://localhost/music-api/customers/1/invoices";
    fetch(resourceUri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            getAllTracks(data);


        })
        .catch(error => errorHandler(error));
}
// 5. The list of tracks purchased by a given customer.(resource URI: /customers/{customer_id}/invoices)

function getAllTracks(invoices) {
    document.getElementById("artistTable").style.display = "none";
    document.getElementById("givenArtistTable").style.display = "none";
    document.getElementById("albumsByArtist").style.display = "none";
    document.getElementById("specificsTable").style.display = "none";
    document.getElementById("givenPurchaseTable").style.display = "block";
    document.getElementById("customerTable").style.display = "none";
    //-- parse the json response data
    console.log(invoices);
    let rows = '';
    let givenPurchaseList = document.getElementById("givenPurchaseList")
    for (let item in invoices) {
        console.log(invoices[item]);
        let invoice = invoices[item];
        //- mediatype, name, publisher, isbn
        rows += `
        <tr>
            <td> ${invoice.InvoiceId} </td>
            <td> ${invoice.CustomerId} </td>
            <td> ${invoice.InvoiceDate} </td>
            <td> ${invoice.BillingAddress} </td>
            <td> ${invoice.BillingCity} </td>
            <td> ${invoice.BillingState} </td>
            <td> ${invoice.BillingCountry} </td>
            <td> ${invoice.BillingPostalCode} </td>
            <td> ${invoice.Total} </td>
        </tr>`;
    }
    givenPurchaseList.innerHTML = rows;
}

// 6) The list of customers 
function getListOfCustomers() {
    console.log("Getting list of customers");
    let resourceUri = "http://localhost/music-api/customers";
    fetch(resourceUri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            getAllCustomers(data);
        })
        .catch(error => errorHandler(error));
}
// 6) The list of customers 
function getAllCustomers(customers) {
    document.getElementById("artistTable").style.display = "none";
    document.getElementById("givenArtistTable").style.display = "none";
    document.getElementById("albumsByArtist").style.display = "none";
    document.getElementById("specificsTable").style.display = "none";
    document.getElementById("givenPurchaseTable").style.display = "none";
    document.getElementById("customerTable").style.display = "block";
    
    console.log("Getting all customers");
    let rows = '';
    let customersList = document.getElementById("customersList")
    for (let item in customers) {
        console.log(customers[item]);
        let customer = customers[item];
        rows += `
        <tr>
            <td> ${customer.CustomerId} </td>
            <td> ${customer.FirstName} </td>
            <td> ${customer.LastName} </td>
            <td> ${customer.Company} </td>
            <td> ${customer.Address} </td>
            <td> ${customer.City} </td>
            <td> ${customer.State} </td>
            <td> ${customer.Country} </td>
            <td> ${customer.PostalCode} </td>
            <td> ${customer.Phone} </td>
            <td> ${customer.Fax} </td>
            <td> ${customer.Email} </td>
            <td> ${customer.SupportRepId} </td>
        </tr>`;
    }
    customersList.innerHTML = rows;
}
