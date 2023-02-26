<?php

require_once('database.php');

// Database connexion.
$db = dbConnect();
if (!$db) {
    header($_SERVER["SERVER_PROTOCOL"]." 503 Service Unavailable");
    exit;
}

// Send data to the client.
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');
header('Cache-control: no-store, no-cache, must-revalidate');
header('Pragma: no-cache');

$requestMethod = $_SERVER['REQUEST_METHOD'];
$request = substr($_SERVER['PATH_INFO'], 1);
$request = explode('/', $request); //["API","i","j"]
$requestRessource = array_shift($request);
$id = array_shift($request);
$param = array_shift($request);
$num_commande = $param;

if ($requestRessource == "api") {

    if ($requestMethod == "GET") //si on est sur une méthode get et isen on fait une requette sql pour afficher les différents nom de site_isen
    {
        if ($id == "users" && $param == NULL) {
            $request = "SELECT mail, nom, prenom FROM users";
        }
        try {
            header($_SERVER["SERVER_PROTOCOL"]." 200 OK");
            if($request == NULL)
                throw new Exception("Request is null");
            $data = dbRequest($db, $request);
            echo json_encode($data);
        } catch (Exception $e) {
            header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found");
            //echo $e;
        }
    }
    if ($requestMethod == "POST") //si on est sur une méthode get et isen on fait une requette sql pour afficher les différents nom de site_isen
    {
        if ($id == "addUser" && $param == NULL) {
            try {
                header($_SERVER["SERVER_PROTOCOL"]." 201 OK");
                addUser($db, $_POST["mail"], $_POST["nom"], $_POST["prenom"], $_POST["pwd"], $_POST["adresse"], $_POST["age"], $_POST["telephone"]);
                echo "success";
            } catch (Exception $e) {
                header($_SERVER["SERVER_PROTOCOL"]." 200 OK");
                echo "error";
            }
        }else if($id == "connection"){
            header($_SERVER["SERVER_PROTOCOL"]." 201 OK");
            $mail = $_POST['mail'];
            $password= $_POST['password'];
            if (checkPassword($db, $mail, $password)) {
                // si le token n'existe pas on le crée
                $token = createApiToken($db,$mail);
                // on renvoie le token et son id
                echo json_encode(array('api_key' => $token['api_key'], 'auth_key' => $token['auth_key'],'expires' => $token['expires']));
            } else {
              header($_SERVER["SERVER_PROTOCOL"]." 200 OK");
              echo "false";
            }
        }else if($id == "tryconnection" && $param == NULL){
            header($_SERVER["SERVER_PROTOCOL"]." 201 OK");
            $api_key = $_POST['api_key'];
            $auth_key = $_POST['auth_key'];
            if (checkApiToken($db,$api_key,$auth_key)) {
              echo "true";
            } else {
              header($_SERVER["SERVER_PROTOCOL"]." 200 OK");
            }
            
        }
        
    }
}




exit;