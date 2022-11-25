"use strict";
//All errors returned to the client must be detected and handled.
/** @function 
 * @name errorHandler
 * @description This function will display the error message.
*/
function errorHandler() {
    let alert = document.getElementById("alert");
    alert.classList.add("show");
    alert.classList.add("showAlert");
    alert.classList.remove("hide");
    setTimeout(() =>{
        alert.classList.remove("show");
        alert.classList.add("hide");
    }, 2000);

}

/** @function 
 * @name list all the artists
*/
//1. The list of artists
async function getListOfArtists() {
    console.log("Getting list of artists");
    // let resourceUri = "http://10.1.3.160/music-api/artists/1/albums/1/tracks";
    let resourceUri = "http://localhost/music-api/artists";
    let response = await fetch(resourceUri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });
    let artist = await response.json();
    if (response.ok) {
        getAllArtists(artist);
    }else{
        errorHandler();
    }
    // .then(response => response.json())
    //     .then(data => {
    //         getAllArtists(data);
            
    //     })
    //     .catch(error => errorHandler(error));
}
/** @function 
 * @name getAllTracks
*/
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
/** @function 
 * @name artist details
 * @description This function will display the artist details.
*/

// 2. The details of a given artist (resource URI: /artists/{artist_id})
async function getArtistDetails() {
    console.log("Getting artist details");
    let inputs = document.getElementById("inputs").value;
    let resourceUri = "http://localhost/music-api/artists/" + inputs;
    // let resourceUri = "http://localhost/music-api/artists/6";
    let response = await fetch(resourceUri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });
    let artist = await response.json();
    if (response.ok) {
        getArtist(artist);
    }else{
        errorHandler();
    }
        
}
/** @function 
 * @name getArtist
 **/
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
/** @function 
 * // 3 The list of albums released by a given artist
 * @name getListOfAlbumsByArtists
 * @description This function will display the list of albums by artists.
*/

async function getListOfAlbumsByArtists(){
    console.log("Getting list of albums by artists");
    let inputs = document.getElementById("inputs").value;
    let resourceUri = "http://localhost/music-api/artists/"+ inputs +"/albums";
    // let resourceUri = "http://localhost/music-api/artists/6/albums";  
    let response = await fetch(resourceUri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });
    let ListOfAlbumsByArtists = await response.json();
    if (response.ok) {
        getAllAlbums(ListOfAlbumsByArtists);
    }else{
        errorHandler();
    }
}
/** @function
 * // 3 The list of albums released by a given artist
 * @name getAllAlbums
 * @description getall the albums in the database
 * **/
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
/** @function 
 * // 4The list of tracks for the specified album and artist. The user should be able to filter the list by genre or media type. Actual values must be used (and not IDs of genre or media type)
 * @description URI: /artists/{artist_id}/albums/{album_id}/tracks)
 * @name getListOfTracksByAlbumsandArtist
 * @description This function will display the list of tracks by albums and artists.
 * **/
async function getListOfTracksByAlbumAndArtist() {
    console.log("Getting list of tracks by album and artist");
    let input = document.getElementById("input").value;
    let inputs = document.getElementById("inputs").value;
    let resourceUri = "http://localhost/music-api/artists/"+ input + "/albums/" + inputs +"/tracks";
    // let resourceUri = "http://localhost/music-api/artists/3/albums/2/tracks";
    let response = await fetch(resourceUri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });
    let TracksByAlbumAndArtist = await response.json();
    if (response.ok) {
        getAllTracksByAlbumAndArtists(TracksByAlbumAndArtist);
    }else{
        errorHandler();
    }
}
/** @function 
 * // 4The list of tracks for the specified album and artist. The user should be able to filter the list by genre or media type. Actual values must be used (and not IDs of genre or media type)
 * @description URI: /artists/{artist_id}/albums/{album_id}/tracks)
 * @name getListOfTracksByAlbumsandArtist
 * @description This function will display the list of tracks by albums and artists.
 * **/
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

/** @function 
 * 5. The list of tracks purchased by a given customer.
 * @description resource URI: /customers/{customer_id}/invoices) 
 * @name getListOfTracksPurchasedByCustomer
 * @description This function will display the list of tracks purchased by a given customer.
 * **/
async function getListOfTracksPurchasedByCustomer() {
    console.log("Getting list of tracks purchased by customer");
    let inputs = document.getElementById("inputs").value;
    let resourceUri = "http://localhost/music-api/customers/"+ inputs + "/invoices";
    // let resourceUri = "http://localhost/music-api/customers/1/invoices";
    let response = await fetch(resourceUri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });
    let TracksPurchasedByCustomer = await response.json();
    if (response.ok) {
        getAllTracks(TracksPurchasedByCustomer);
    }else{
        errorHandler();
    }
}
/** @function 
 * 5. The list of tracks purchased by a given customer.
 * @description resource URI: /customers/{customer_id}/invoices) 
 * @name getListOfTracksPurchasedByCustomer
 * @description This function will display the list of tracks purchased by a given customer.
 * **/
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

/** @function 
 * 6) The list of customers 
 * @description resource URI: /customers)
 * @name getListOfCustomers
 * @description This function will display the list of customers.
 */
async function getListOfCustomers() {
    console.log("Getting list of customers");
    let resourceUri = "http://localhost/music-api/customers";
    let response = await fetch(resourceUri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });
    let customers = await response.json();
    if (response.ok) {
        getAllCustomers(customers);
    }else{
        errorHandler();
    }
    
    
}
/** @function 
 * 6) The list of customers 
 * @description resource URI: /customers)
 * @name getListOfCustomers
 * @description This function will display the list of customers.
 */
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


