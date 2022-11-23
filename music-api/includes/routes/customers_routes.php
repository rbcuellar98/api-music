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


function handleCreateCustomer(Request $request, Response $response, array $args)
{
    $data = $request->getParsedBody();
    //--  to go over the elements stored in the array of data 
    // in a for or foreach loop 
    $customer_model = new CustomerModel();
    // we retrieve the ley and its value
    // we perform an update/create sql statement
    // need a validation to receive data
    //  $artist_model->createArtists($new_artists);
    $customerId = "";
    $customerName = "";
    for ($index = 0; $index < count($data); $index++) {
        $single_customer = $data[$index];
        // retieve data the key and its value
        $customerId = $single_customer["CustomerId"];
        $customerFirstName = $single_customer["FirstName"];
        $customerLastName = $single_customer["LastName"];
        // validate the received data
        $new_customers_record = array(
            "CustomerId" => $customerId,
            "FirstName" => $customerFirstName,
            "LastName" => $customerLastName
        );
        //   $existing_artist_record = array(
        //     "ArtistsId" => $artistId,
        //     "Name" => $artistName
        // );

        // perform a crete sql statement
        $customer_model->createCustomers($new_customers_record);
        //   $artist_model->updateArtists($existing_artist_record,
        //   array("ArtistId" => $artistId));

    }
    $response->getBody()->write("New Customer created from handleCreateCustomer");
    return $response;
}

function handleDeleteCustomerById(Request $request, Response $response, array $args)
{
    $customer_info = array();
    $response_data = array();
    $response_code = HTTP_OK;
    $customer_model = new CustomerModel();

    // Retreive the artist if from the request's URI.
    $customer_id = $args["customer_id"];
    if (isset($customer_id)) {
        // Fetch the info about the specified artist.
        $customer_info = $customer_model->deleteCustomer($customer_id);
        $response->getBody()->write("Customer has been deleted from handleDeleteCustomer");
        return $response;
        
        if (!$customer_info) {
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
        $response_data = json_encode($customer_info, JSON_INVALID_UTF8_SUBSTITUTE);
    } else {
        $response_data = json_encode(getErrorUnsupportedFormat());
        $response_code = HTTP_UNSUPPORTED_MEDIA_TYPE;
    }
    $response->getBody()->write($response_data);
    return $response->withStatus($response_code);
}

