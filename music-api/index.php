<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
//var_dump($_SERVER["REQUEST_METHOD"]);
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';
require_once './includes/app_constants.php';
require_once './includes/helpers/helper_functions.php';


//--Step 1) Instantiate App.
$app = AppFactory::create();
// enable JSON XML body parsing
$app->addBodyParsingMiddleware();



//-- Step 2) Add routing middleware.
$app->addRoutingMiddleware();

//-- Step 3) Add error handling middleware.
$errorMiddleware = $app->addErrorMiddleware(true, true, true);

//-- Step 4)
// TODO: change the name of the sub directory here.
// You also need to change it in .htaccess
$app->setBasePath("/music-api");

//-- Step 5)
require_once './includes/routes/artists_routes.php';
require_once './includes/routes/customers_routes.php';

//-- Step 6)
// TODO: And here we define app routes.
// Get the list of all artists
$app->get("/artists", "handleGetAllArtists");
// Get the list of a specific artist
$app->get("/artists/{artist_id}", "handleGetArtistById");
// Get the list of albums made by an artist
$app->get("/artists/{artist_id}/albums", "handleGetAlbumsOfArtistById");
// Get the list of all tracks purchased by a given customer. The list must include the information about the purchased tracks
$app->get("/customers/{customer_id}/invoices", "handleGetPurchasedTracksOfCustomerById");
// Get the list of customers
$app->get("/customers", "handleGetAllCustomers");
// Get the list of tracks for the specified album and artist
$app->get("/artists/{artist_id}/albums/{album_id}/tracks", "handleGetTrackByGenre");
// Add a route for the create request
$app->post("/artists","handleCreateArtists");
// Testing route for creating customers route
$app->post("/customers","handleCreateCustomer");
// add route for put request
$app->put("/artists","handleUpdateArtists");
// add route for delete request
// $app->delete("/artists","handleDeleteArtists");
// add route for delete request for artists
$app->delete("/artists/{artist_id}","handleDeleteArtistById");
// add route for delete request for customer
$app->delete("/customers/{customer_id}","handleDeleteCustomerById");

// Define app routes.
$app->get('/hello/{your_name}', function (Request $request, Response $response, $args) {    
    //var_dump($args);
    $response->getBody()->write("Hello!" . $args["your_name"]);
    return $response;
});

// Run the app.
$app->run();
