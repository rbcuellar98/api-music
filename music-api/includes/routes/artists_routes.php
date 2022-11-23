<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
//var_dump($_SERVER["REQUEST_METHOD"]);
use Slim\Factory\AppFactory;

require_once __DIR__ . './../models/BaseModel.php';
require_once __DIR__ . './../models/ArtistModel.php';
require_once __DIR__ . './../models/CustomerModel.php';

// Callback for HTTP GET /artists
//-- Supported filtering operation: by artist name.
function handleGetAllArtists(Request $request, Response $response, array $args)
{
    $artists = array();
    $response_data = array();
    $response_code = HTTP_OK;
    $artist_model = new ArtistModel();

    // Retreive the query string parameter from the request's URI.
    $filter_params = $request->getQueryParams();
    if (isset($filter_params["name"])) {
        // Fetch the list of artists matching the provided name.
        $artists = $artist_model->getWhereLike($filter_params["name"]);
    } else {
        // No filtering by artist name detected.
        $artists = $artist_model->getAll();
    }
    // Handle serve-side content negotiation and produce the requested representation.    
    $requested_format = $request->getHeader('Accept');
    //--
    //-- We verify the requested resource representation.    
    if ($requested_format[0] === APP_MEDIA_TYPE_JSON) {
        $response_data = json_encode($artists, JSON_INVALID_UTF8_SUBSTITUTE);
    } else {
        $response_data = json_encode(getErrorUnsupportedFormat());
        $response_code = HTTP_UNSUPPORTED_MEDIA_TYPE;
    }
    $response->getBody()->write($response_data);
    return $response->withStatus($response_code);
}

// Gets the artist by the Id provided
function handleGetArtistById(Request $request, Response $response, array $args)
{
    $artist_info = array();
    $response_data = array();
    $response_code = HTTP_OK;
    $artist_model = new ArtistModel();

    // Retreive the artist if from the request's URI.
    $artist_id = $args["artist_id"];
    if (isset($artist_id)) {
        // Fetch the info about the specified artist.
        $artist_info = $artist_model->getArtistById($artist_id);
        if (!$artist_info) {
            // No matches found?
            $response_data = makeCustomJSONError("resourceNotFound", "No matching record was found for the specified artist.");
            $response->getBody()->write($response_data);
            return $response->withStatus(HTTP_NOT_FOUND);
        }
    }
    // Handle serve-side content negotiation and produce the requested representation.    
    $requested_format = $request->getHeader('Accept');
    //--
    //-- We verify the requested resource representation.    
    if ($requested_format[0] === APP_MEDIA_TYPE_JSON) {
        $response_data = json_encode($artist_info, JSON_INVALID_UTF8_SUBSTITUTE);
    } else {
        $response_data = json_encode(getErrorUnsupportedFormat());
        $response_code = HTTP_UNSUPPORTED_MEDIA_TYPE;
    }
    $response->getBody()->write($response_data);
    return $response->withStatus($response_code);
}

function handleGetAlbumsOfArtistById(Request $request, Response $response, array $args) {
    $artist_info = array();
    $response_data = array();
    $response_code = HTTP_OK;
    $artist_model = new ArtistModel();

    // Retreive the artist if from the request's URI.
    $artist_id = $args["artist_id"];
    if (isset($artist_id)) {
        // Fetch the info about the specified artist.
        $artist_info = $artist_model->getAlbumsOfArtist($artist_id);
        if (!$artist_info) {
            // No matches found?
            $response_data = makeCustomJSONError("resourceNotFound", "No matching record was found for the specified artist.");
            $response->getBody()->write($response_data);
            return $response->withStatus(HTTP_NOT_FOUND);
        }
    }
    // Handle serve-side content negotiation and produce the requested representation.    
    $requested_format = $request->getHeader('Accept');
    //--
    //-- We verify the requested resource representation.    
    if ($requested_format[0] === APP_MEDIA_TYPE_JSON) {
        $response_data = json_encode($artist_info, JSON_INVALID_UTF8_SUBSTITUTE);
    } else {
        $response_data = json_encode(getErrorUnsupportedFormat());
        $response_code = HTTP_UNSUPPORTED_MEDIA_TYPE;
    }
    $response->getBody()->write($response_data);
    return $response->withStatus($response_code);
}

// function to get the list of tracks for the specified album and artist
function handleGetTrackOfAlbumOfArtistById(Request $request, Response $response, array $args)
{
    $artist_info = array();
    $response_data = array();
    $response_code = HTTP_OK;
    $artist_model = new ArtistModel();

    // Retreive the artist if from the request's URI.
    $artist_id = $args["artist_id"];
    $album_id = $args["album_id"];
    // $track_id = $args["track_id"];
    if (isset($artist_id) && isset($album_id)) {
        // Fetch the info about the specified artist.
        $artist_info = $artist_model->getTracksOfAlbumAndArtist($artist_id, $album_id);
        echo "Count:" . count($artist_info);
        exit;
        if (count($artist_info) == 1) {
            // No matches found?
            $response_data = makeCustomJSONError("resourceNotFound", "No matching record was found for the specified artist.");
            $response->getBody()->write($response_data);
            return $response->withStatus(HTTP_NOT_FOUND);
        }
    }
    // Handle serve-side content negotiation and produce the requested representation.    
    $requested_format = $request->getHeader('Accept');
    //--
    //-- We verify the requested resource representation.    
    if ($requested_format[0] === APP_MEDIA_TYPE_JSON) {
        $response_data = json_encode($artist_info, JSON_INVALID_UTF8_SUBSTITUTE);
    } else {
        $response_data = json_encode(getErrorUnsupportedFormat());
        $response_code = HTTP_UNSUPPORTED_MEDIA_TYPE;
    }
    $response->getBody()->write($response_data);
    return $response->withStatus($response_code);
}
// function to get the list of all tracks purchased by a given customer. 
function handleGetPurchasedTracksOfCustomerById(Request $request, Response $response, array $args)
{
    $customer_info = array();
    $response_data = array();
    $response_code = HTTP_OK;
    $customer_model = new CustomerModel();

    // Retreive the artist if from the request's URI.
    $customer_id = $args["customer_id"];
    if (isset($customer_id)) {
        // Fetch the info about the specified artist.
        $customer_info = $customer_model->getTracksPurchasedByCustomer($customer_id);
        if (!$customer_info) {
            // No matches found?
            $response_data = makeCustomJSONError("404", "No invoice was found for the specified customer.");
            $response->getBody()->write($response_data);
            return $response->withStatus(HTTP_NOT_FOUND);
        }
    }
    // Handle serve-side content negotiation and produce the requested representation.    
    $requested_format = $request->getHeader('Accept');
    //--
    //-- We verify the requested resource representation.    
    if ($requested_format[0] === APP_MEDIA_TYPE_JSON) {
        $response_data = json_encode($customer_info, JSON_INVALID_UTF8_SUBSTITUTE);
    } else {
        $response_data = json_encode(getErrorUnsupportedFormat());
        $response_code = HTTP_UNSUPPORTED_MEDIA_TYPE;
    }
    $response->getBody()->write($response_data);
    return $response->withStatus($response_code);
}

// function to get the list of customers
function handleGetAllCustomers(Request $request, Response $response, array $args)
{
    $customers = array();
    $response_data = array();
    $response_code = HTTP_OK;
    $customer_model = new CustomerModel();

    // Retreive the query string parameter from the request's URI.
    $filter_params = $request->getQueryParams();
    if (isset($filter_params["country"])) {
        // Fetch the list of artists matching the provided name.
        $customers = $customer_model->getWhereLike($filter_params["country"]);
    } else {
        // No filtering by artist name detected.
        $customers = $customer_model->getAll();
    }
    // Handle serve-side content negotiation and produce the requested representation.    
    $requested_format = $request->getHeader('Accept');
    //--
    //-- We verify the requested resource representation.    
    if ($requested_format[0] === APP_MEDIA_TYPE_JSON) {
        $response_data = json_encode($customers, JSON_INVALID_UTF8_SUBSTITUTE);
    } else {
        $response_data = json_encode(getErrorUnsupportedFormat());
        $response_code = HTTP_UNSUPPORTED_MEDIA_TYPE;
    }
    $response->getBody()->write($response_data);
    return $response->withStatus($response_code);
}


function handleGetTrackByGenre(Request $request, Response $response, array $args)
{
    $artists = array();
    $response_data = array();
    $response_code = HTTP_OK;
    $artist_model = new ArtistModel();

    // Retreive the query string parameter from the request's URI.
    $artist_id = $args["artist_id"];
    $album_id = $args["album_id"];
    $filter_params = $request->getQueryParams();
    if (isset($filter_params["genre"]) && isset($artist_id) && isset($album_id)) {
        // Fetch the list of artists matching the provided name.
        $artists = $artist_model->getWhereLikeGenre($artist_id, $album_id, $filter_params["genre"]);
        // $artist = $artist_model->getWhereLikeGenre($filter_params["genre"]);
    } else if (isset($artist_id) && isset($album_id)) {
        // Get all tracks of the specified album and artist.
        // No filtering by artist name detected.        
        $artists = $artist_model->getTracksOfAlbumAndArtist($artist_id, $album_id);
        //echo "Count:" .count($artist); exit;
    }

    // No filtering by artist name detected.
    $requested_format = $request->getHeader('Accept');
    if (!empty($artists)) {

        //--
        //-- We verify the requested resource representation.    
        if ($requested_format[0] === APP_MEDIA_TYPE_JSON) {
            $response_data = json_encode($artists, JSON_INVALID_UTF8_SUBSTITUTE);
        } else {
            $response_data = json_encode(getErrorUnsupportedFormat());
            $response_code = HTTP_UNSUPPORTED_MEDIA_TYPE;
        }
    } else {
        //-- WE have no data. --> 404
        $response_data = makeCustomJSONError("404", "No data found for the specified resource...");
        $response_code = HTTP_NOT_FOUND;
    }
    $response->getBody()->write($response_data);
    return $response->withStatus($response_code);    
}

// creates and artist with the post method
function handleCreateArtists(Request $request, Response $response, array $args)
{
    $data = $request->getParsedBody();
    //--  to go over the elements stored in the array of data 
    // in a for or foreach loop 
    $artist_model = new ArtistModel();
    // we retrieve the ley and its value
    // we perform an update/create sql statement
    // need a validation to receive data
    //  $artist_model->createArtists($new_artists);
    $artistId = "";
    $artistName = "";
    for ($index = 0; $index < count($data); $index++) {
        $single_artist = $data[$index];
        // retieve data the key and its value
        $artistId = $single_artist["ArtistId"];
        $artistName = $single_artist["Name"];
        // validate the received data
        $new_artists_record = array(
            "ArtistId" => $artistId,
            "Name" => $artistName
        );
        //   $existing_artist_record = array(
        //     "ArtistsId" => $artistId,
        //     "Name" => $artistName
        // );

        // perform a crete sql statement
        $artist_model->createArtists($new_artists_record);
        //   $artist_model->updateArtists($existing_artist_record,
        //   array("ArtistId" => $artistId));

    }
    $response->getBody()->write("New artists has been created from handleCreateArtists");
    return $response;
}

// updates the artist by the put method
function handleUpdateArtists(Request $request, Response $response, array $args)
{
    $data = $request->getParsedBody();
    //--  to go over the elements stored in the array of data 
    // in a for or foreach loop 
    $artist_model = new ArtistModel();
    // we retrieve the ley and its value
    // we perform an update/create sql statement
    // need a validation to recive data
    
    for ($index = 0; $index < count($data); $index++) {
        $single_artist = $data[$index];
        if($artist_model->getArtistById($single_artist["ArtistId"]) != null){
        // retieve data the key and its value
        $artistId = $single_artist["ArtistId"];
        $artistName = $single_artist["Name"];
        // validate the received data
        $existing_artist_record = array(
            
            "Name" => $artistName
        );
        // perform a crete sql statement
        $artist_model->updateArtists(
            $existing_artist_record,
            array("ArtistId" => $artistId)
        );
    } 
}
    $response->getBody()->write("Artist has been updated from handleUpdateArtists");
    return $response;
}

// Deletes the artist by the delete method
function handleDeleteArtistById(Request $request, Response $response, array $args)
{
    $artist_info = array();
    $response_data = array();
    $response_code = HTTP_OK;
    $artist_model = new ArtistModel();

    // Retreive the artist if from the request's URI.
    $artist_id = $args["artist_id"];
    if (isset($artist_id)) {
        // Fetch the info about the specified artist.
        $artist_info = $artist_model->deleteArtist($artist_id);
        $response->getBody()->write("Artists has been deleted from handleDeleteCustomer");
        return $response;
        
        if (!$artist_info) {
            // No matches found?
            $response_data = makeCustomJSONError("404", "No matching record was found for the specified artist.");
            $response->getBody()->write($response_data);
            return $response->withStatus(HTTP_NOT_FOUND);
        }
    }
    // Handle serve-side content negotiation and produce the requested representation.    
    $requested_format = $request->getHeader('Accept');
    //--
    //-- We verify the requested resource representation.    
    if ($requested_format[0] === APP_MEDIA_TYPE_JSON) {
        $response_data = json_encode($artist_info, JSON_INVALID_UTF8_SUBSTITUTE);
    } else {
        $response_data = json_encode(getErrorUnsupportedFormat());
        $response_code = HTTP_UNSUPPORTED_MEDIA_TYPE;
    }
    $response->getBody()->write($response_data);
    return $response->withStatus($response_code);

    $response->getBody()->write("Artists has been deleted from handleDeleteCustomer");
    return $response;
}

