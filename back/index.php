<?php

require_once('database.php');

// Database connexion.
$db = dbConnect();
if (!$db) {
    header('HTTP/1.1 503 Service Unavailable');
    exit;
}

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
        /*
        if ($id == "commande" && $param == NULL) {

            $request = "SELECT c.numero, c.date, c.mail, u.nom, u.prenom, c.id_type AS 'Statut'
             FROM commande c 
             JOIN users u ON c.mail = u.mail";
            $data = dbRequest($db, $request);
            echo json_encode($data);
        }

        if ($id == "commande" && $param != NULL) {
            $request = "SELECT co.numero, p.nom,  co.quantite, CAST(p.prix*co.quantite as DECIMAL(10,2)) AS 'prixtot',p.quantite AS 'stock'
            FROM contient co 
            JOIN produit p ON co.id = p.id
            WHERE co.numero = $param ";
            $data = dbRequest($db, $request);
            echo json_encode($data);
        }

        if ($id == "nbtotal") {
            $request = "SELECT
            (SELECT COUNT(*) FROM commande WHERE id_type = 1) as 'atraiter',
            (SELECT COUNT(*) FROM commande WHERE id_type = 2) as 'continuer',
            (SELECT COUNT(*) FROM commande WHERE id_type = 4) as 'annulee',
            (SELECT COUNT(*) FROM commande WHERE id_type = 3) as 'envoirobot'";

            $data = dbRequest($db, $request);
            echo json_encode($data);
        }*/

        if ($id == "users" && $param == NULL) {

            $request = "SELECT mail, nom, prenom
            FROM users";
            $data = dbRequest($db, $request);
            echo json_encode($data);
        }
    }
    if ($requestMethod == "POST") //si on est sur une méthode get et isen on fait une requette sql pour afficher les différents nom de site_isen
    {
        if ($id == "add_user" && $param == NULL) {

            $data = add_user($db, $_POST["mail"], $_POST["nom"], $_POST["prenom"], $_POST["pwd"], $_POST["adresse"], $_POST["age"], $_POST["telephone"]);
            echo $data;
        }
    }
}


// Send data to the client.
header('Content-Type: application/json; charset=utf-8');
header('Cache-control: no-store, no-cache, must-revalidate');
header('Pragma: no-cache');
header('HTTP/1.1 200 OK');
header('Access-Control-Allow-Origin: http://localhost:3000');

exit;