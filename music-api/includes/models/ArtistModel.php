<?php

class ArtistModel extends BaseModel {

    private $table_name = "artist";

    /**
     * A model class for the `artist` database table.
     * It exposes operations that can be performed on artists records.
     */
    function __construct() {
        // Call the parent class and initialize the database connection settings.
        parent::__construct();
    }

    /**
     * Retrieve all artists from the `artist` table.
     * @return array A list of artists. 
     */
    public function getAll() {
        $sql = "SELECT * FROM artist";
        $data = $this->rows($sql);
        return $data;
    }

    /**
     * Get a list of artists whose name matches or contains the provided value.       
     * @param string $artistName 
     * @return array an array containing information about the query provided.
     */
    public function getWhereLike($artistName) {
        $sql = "SELECT * FROM artist WHERE Name LIKE :name";
        $data = $this->run($sql, [":name" => $artistName . "%"])->fetchAll();
        return $data;
    }

    /**
     * Retrive genre like ? of a given track, album and artist
     * @param int $artist_id the id of the artist int $album_id the id of the album and the genre.
     * @return array an array containing information about the query provided.
     */
    public function getWhereLikeGenre($album_id, $artist_id, $genre) {
        $sql = "SELECT * FROM artist, album, track, genre WHERE artist.ArtistId = album.ArtistId AND track.AlbumId = album.AlbumId AND genre.GenreId = track.GenreId AND album.ArtistId = :artist_id AND track.AlbumId = :album_id AND genre.Name LIKE :genre";
        $data = $this->run($sql, [$artist_id, $album_id, ":genre" => $genre . "%"])->fetchAll();
        return $data;
    }

    /**
     * Retrieve an artist by its id.
     * @param int $artist_id the id of the artist.
     * @return array an array containing information about the query provided.
     */
    public function getArtistById($artist_id) {
        $sql = "SELECT * FROM artist WHERE ArtistId = ?";
        $data = $this->run($sql, [$artist_id])->fetch();
        return $data;
    }

    /**
     * Retrieve the album of an artist.
     * @param int $artist_id the id of the artist.
     * @return array an array containing information about the query provided.
     */
    public function getAlbumsOfArtist($artist_id) {
     $sql = "SELECT * FROM artist LEFT JOIN album ON artist.ArtistId = album.ArtistId WHERE album.ArtistId = :artist_id";
     $data = $this->run($sql, [$artist_id])->fetchAll();
     return $data;
    }

    /**
     * Retrieve the list of tracks of an album by an artist.
     * @param int $artist_id the id of the artist, int $album_id the id of the album.
     * @return array an array containing information about the query provided.
     */
    public function getTracksOfAlbumAndArtist($album_id, $artist_id) {
        //echo "Counterer:" .$album_id .$artist_id ; exit;
        $sql = "SELECT * FROM artist, album, track, genre WHERE artist.ArtistId = album.ArtistId AND track.AlbumId = album.AlbumId AND genre.GenreId = track.GenreId AND album.ArtistId = :artist_id AND track.AlbumId = :album_id";
        //echo $sql ;exit;
        $data = $this->run($sql, [$artist_id, $album_id])->fetchAll();
        return $data;
    }

    /**
     * create an artist.
     * @param takes in the data.
     * @return $data.
     */
    public function createArtists($data){
        $data = $this->insert("artist",$data) ;
        return $data;
    }

    /**
     * update the artist table.
     * @param takes in the data.
     * @return $data.
     */
    public function updateArtists($data, $where){
        $data = $this->update("artist",$data, $where);
        return $data;
    }

    /**
     * create a customer.
     * @param takes in the data.
     * @return $data.
     */
    public function createCustomers($data){
        $data = $this->insert("customer",$data) ;
        return $data;
    }   

    /**
     * delete an artist.
     * @param takes in the data.
     * @return $data.
     */
    public function deleteArtist($artist_id) {
     $sql = "DELETE FROM artist WHERE ArtistId = :artist_id";
     $data = $this->run($sql, [$artist_id])->fetchAll();
     return $data;
    }
    
}
