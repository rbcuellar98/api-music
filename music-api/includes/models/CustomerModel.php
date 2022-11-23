<?php

class CustomerModel extends BaseModel {

    private $table_name = "customer";

    /**
     * A model class for the `customer` database table.
     * It exposes operations that can be performed on customer records.
     */
    function __construct() {
        // Call the parent class and initialize the database connection settings.
        parent::__construct();
    }

    /**
     * Retrieve all customer from the `customer` table.
     * @return array A list of customer. 
     */
    public function getAll() {
        $sql = "SELECT * FROM customer";
        $data = $this->rows($sql);
        return $data;
    }

    /**
     * Get a list of customer whose name matches or contains the provided value.       
     * @param string $customerName 
     * @return array An array containing the matches found.
     */
    public function getWhereLike($CountryName) {
        $sql = "SELECT * FROM customer WHERE Country LIKE :country";
        $data = $this->run($sql, [":country" => $CountryName . "%"])->fetchAll();
        return $data;
    }

    /**
     * Retrieve an customer by its id.
     * @param int $customer_id the id of the artist.
     * @return array an array containing information about a given artist.
     */
    public function getCustomerById($customer_id) {
        $sql = "SELECT * FROM customer WHERE CustomerId = ?";
        $data = $this->run($sql, [$customer_id])->fetch();
        return $data;
    }
    
    /**
     * Retrieve tracks purchased by a customer id.
     * @param int $customer_id the id of the customer.
     * @return array an array containing information about the query provided.
     */
    public function getTracksPurchasedByCustomer($customer_id) {
        $sql = "SELECT * FROM invoice WHERE invoice.CustomerId = :customer_id";
        $data = $this->run($sql, [$customer_id])->fetchAll();
        return $data;
    }


    /**
     * Create a customer.
     * @param int $customer_id the id of the customer.
     * @return array an array containing information about the query provided.
     */
    public function createCustomers($data){
        $data = $this->insert("customer",$data) ;
        return $data;
    }
    
    /**
     * Retrieve the customers.
     * @param int $customer_id the id of the customer.
     * @return array an array containing information about the query provided.
     */
    public function getCustomers() {
        $sql = "SELECT * FROM customer";
        $data = $this->run($sql)->fetchAll();
        return $data;
    }

    /**
     * Delete a customer.
     * @param int $customer_id the id of the customer.
     * @return array an array containing information about the query provided.
     */
    public function deleteCustomer($customer_id) {
        $sql = "DELETE FROM customer WHERE CustomerId = :customer_id";
        $data = $this->run($sql, [$customer_id])->fetchAll();
        return $data;
    }
    
}
