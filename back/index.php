<?php

require_once('database.php');

// Database connexion.
$db = dbConnect();
if (!$db) {
    header($_SERVER["SERVER_PROTOCOL"] . " 503 Service Unavailable");
    exit;
}

// Send data to the client.
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Content-Type: application/json; charset=utf-8');
header('Cache-control: no-store, no-cache, must-revalidate');
header('Pragma: no-cache');

$requestMethod = $_SERVER['REQUEST_METHOD'];
$request = substr($_SERVER['PATH_INFO'], 1);
$request = explode('/', $request); //["API","i","j"]
$requestRessource = array_shift($request);
$id = array_shift($request);
$param = array_shift($request);
$param = filter_var($param, FILTER_SANITIZE_NUMBER_INT); // pour éviter les injections sql et lorsque l'on cherche un id
$num_commande = $param;

if ($requestRessource == "api") {

    if ($requestMethod == "GET") //si on est sur une méthode get et isen on fait une requette sql pour afficher les différents nom de site_isen
    {
        try {
            header($_SERVER["SERVER_PROTOCOL"] . " 200 OK");
            $data = array();

            switch ($id) {
                case "users":
                    $stmt = $db->prepare("SELECT mail, nom, prenom FROM users");
                    $stmt->execute();
                    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    break;
                case "produits":
                    $stmt = $db->prepare("SELECT * FROM produits");
                    $stmt->execute();
                    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    break;
                case "produit":
                    if (empty($param) || !ctype_digit($param)) {
                        throw new Exception("Invalid product ID");
                    }
                    $stmt = $db->prepare("SELECT * FROM produits WHERE id = ?");
                    $stmt->bindValue(1, $param, PDO::PARAM_INT);
                    $stmt->execute();
                    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    break;
                case "commande":
                    if (empty($param) || !ctype_digit($param)) {
                        throw new Exception("Invalid order number");
                    }
                    $stmt = $db->prepare("SELECT produits.id, contient.quantite, produits.nom, produits.prix, produits.poids FROM contient 
                        INNER JOIN produits ON contient.id = produits.id
                        WHERE contient.numero = ?");
                    $stmt->bindValue(1, $param, PDO::PARAM_INT);
                    $stmt->execute();
                    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    break;
                default:
                    throw new Exception("Invalid request");
                    break;
            }

            echo json_encode($data, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
        } catch (Exception $e) {
            header($_SERVER["SERVER_PROTOCOL"] . " 404 Not Found");
            echo json_encode(array("error" => $e->getMessage()));
        }
    }

    if ($requestMethod == "POST") //si on est sur une méthode get et isen on fait une requette sql pour afficher les différents nom de site_isen
    {
        switch ($id) {
            case 'addUser':
                try {
                    $mail = filter_input(INPUT_POST, 'mail', FILTER_SANITIZE_EMAIL);
                    $nom = filter_input(INPUT_POST, 'nom', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
                    $prenom = filter_input(INPUT_POST, 'prenom', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
                    $pwd = password_hash(filter_input(INPUT_POST, 'pwd', FILTER_SANITIZE_SPECIAL_CHARS), PASSWORD_DEFAULT);
                    $adresse = filter_input(INPUT_POST, 'adresse', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
                    $age = filter_input(INPUT_POST, 'age', FILTER_SANITIZE_NUMBER_INT);
                    $telephone = filter_input(INPUT_POST, 'telephone', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

                    addUser($db,  $mail, $nom, $prenom, $pwd, $adresse, $age, $telephone);
                    header($_SERVER["SERVER_PROTOCOL"] . " 201 Created");
                    echo "success";
                } catch (Exception $e) {
                    header($_SERVER["SERVER_PROTOCOL"] . " 500 Internal Server Error");
                    echo "error";
                }
                break;

            case 'connection':
                try {

                    $mail = filter_var($_POST['mail'], FILTER_SANITIZE_EMAIL);
                    $password = $_POST['password'];

                    if (checkPassword($db, $mail, $password)) {
                        // si le token n'existe pas on le crée
                        $token = createApiToken($db, $mail);
                        //si une commande existe la mettre en annulé
                        $request = "SELECT numero FROM commandes WHERE mail = '$mail' AND id_type = 1";
                        $data = dbRequest($db, $request);
                        if ($data != NULL) {
                            $request = "UPDATE commandes SET id_type = 5 WHERE numero = " . $data[0]['numero'];
                            dbRequest($db, $request);
                        }

                        //creation d'une commande
                        $date = date("Y-m-d H:i:s");
                        $request = "INSERT INTO commandes (mail, id_type, date,numero) VALUES (:mail, 1, :date , NULL)";
                        $stmt = $db->prepare($request);
                        $stmt->bindParam(':mail', $mail, PDO::PARAM_STR);
                        $stmt->bindParam(':date', $date, PDO::PARAM_STR);
                        $stmt->execute();

                        // on renvoie le token et son id
                        echo json_encode(array('api_key' => $token['api_key'], 'auth_key' => $token['auth_key'], 'expires' => $token['expires']));
                        header($_SERVER['SERVER_PROTOCOL'] . ' 200 OK');
                    } else {
                        header($_SERVER['SERVER_PROTOCOL'] . ' 401 Unauthorized');
                        echo "false";
                    }
                } catch (PDOException $e) {
                    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error');
                }
                break;

                //si on est deja connecter sur la page de connection
            case 'tryconnection':
                try {
                    if (isset($_POST['api_key']) && isset($_POST['auth_key'])) {
                        $api_key = $_POST['api_key'];
                        $auth_key = $_POST['auth_key'];
                        if (checkApiToken($db, $api_key, $auth_key)) {
                            echo "true";
                        } else {
                            header($_SERVER['SERVER_PROTOCOL'] . ' 401 Unauthorized');
                        }
                    } else {
                        header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
                    }
                } catch (PDOException $e) {
                    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error');
                }
                break;

            case 'infouser' :
                try{
                    if(isset($_POST['api_key']) && isset($_POST['auth_key'])){
                        $api_key = $_POST['api_key'];
                        $auth_key = $_POST['auth_key'];
                        $mail = checkApiToken($db, $api_key, $auth_key);
                        if($mail != false){
                            $request = "SELECT prenom FROM users WHERE mail = :mail";
                            $stmt = $db->prepare($request);
                            $stmt->bindParam(':mail', $mail, PDO::PARAM_STR);
                            $stmt->execute();
                            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                            echo json_encode($data);
                        }else{
                            header($_SERVER['SERVER_PROTOCOL'] . ' 401 Unauthorized');                       
                        }
                        
                    }else{
                        header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
                    }
                }catch (PDOException $e) {
                    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error');
                }
                break;
            
            case 'pricecommande':
                try{
                    if(isset($_POST['api_key']) && isset($_POST['auth_key'])){
                        $api_key = $_POST['api_key'];
                        $auth_key = $_POST['auth_key'];
                        $mail = checkApiToken($db, $api_key, $auth_key);
                        if($mail != false){
                            $request = "SELECT SUM(co.quantite * p.prix) AS prix_total FROM commandes c
                            JOIN contient co ON co.numero = c.numero
                            JOIN produits p ON p.id = co.id
                            WHERE mail = :mail AND c.id_type = 1";
                            $stmt = $db->prepare($request);
                            $stmt->bindParam(':mail', $mail, PDO::PARAM_STR);
                            $stmt->execute();
                            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                            echo json_encode($data);
                        }else{
                            header($_SERVER['SERVER_PROTOCOL'] . ' 401 Unauthorized');                       
                        }                   
                    }else{
                        header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
                    }
                }catch (PDOException $e) {
                    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error');
                }
                break;
            
            case 'nbinproduct' :
                try{
                    if(isset($_POST['api_key']) && isset($_POST['auth_key']) && isset($_POST['id_product'])){
                        $api_key = $_POST['api_key'];
                        $auth_key = $_POST['auth_key'];
                        $id_product = $_POST['id_product'];
                        $mail = checkApiToken($db, $api_key, $auth_key);
                        if($mail != false){
                            $request = "SELECT co.quantite FROM commandes c
                            JOIN contient co ON co.numero = c.numero
                            JOIN produits p ON p.id = co.id
                            WHERE mail = :mail AND c.id_type = 1 AND p.id = :idproduct";
                            $stmt = $db->prepare($request);
                            $stmt->bindParam(':idproduct', $id_product, PDO::PARAM_INT);
                            $stmt->bindParam(':mail', $mail, PDO::PARAM_STR);
                            $stmt->execute();
                            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                            echo json_encode($data);
                        }else{
                            header($_SERVER['SERVER_PROTOCOL'] . ' 401 Unauthorized');                       
                        }                   
                    }else{
                        header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
                    }
                }catch (PDOException $e) {
                    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error');
                }
                break;

            case 'commande' : 
                try{
                    if(isset($_POST['api_key']) && isset($_POST['auth_key'])){
                        $api_key = $_POST['api_key'];
                        $auth_key = $_POST['auth_key'];
                        $mail = checkApiToken($db, $api_key, $auth_key);
                        if($mail != false){
                            $request = "UPDATE commandes SET id_type = 2
                            WHERE mail = :mail AND id_type = 1";
                            $stmt = $db->prepare($request);
                            $stmt->bindParam(':mail', $mail, PDO::PARAM_STR);
                            $stmt->execute();
                            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                            echo json_encode($data);
                        }else{
                            header($_SERVER['SERVER_PROTOCOL'] . ' 401 Unauthorized');                       
                        }                   
                    }else{
                        header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
                    }
                }catch (PDOException $e) {
                    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error');
                }
                break;

            case 'annuler' : 
                try{
                    if(isset($_POST['api_key']) && isset($_POST['auth_key'])){
                        $api_key = $_POST['api_key'];
                        $auth_key = $_POST['auth_key'];
                        $mail = checkApiToken($db, $api_key, $auth_key);
                        if($mail != false){
                            $request = "UPDATE commandes SET id_type = 5
                            WHERE mail = :mail AND id_type = 1";
                            $stmt = $db->prepare($request);
                            $stmt->bindParam(':mail', $mail, PDO::PARAM_STR);
                            $stmt->execute();
                            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                            echo json_encode($data);
                        }else{
                            header($_SERVER['SERVER_PROTOCOL'] . ' 401 Unauthorized');                       
                        }                   
                    }else{
                        header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
                    }
                }catch (PDOException $e) {
                    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error');
                }
                break;

            case 'infocommande' :
                try{
                    if(isset($_POST['api_key']) && isset($_POST['auth_key'])){
                        $api_key = $_POST['api_key'];
                        $auth_key = $_POST['auth_key'];
                        $mail = checkApiToken($db, $api_key, $auth_key);
                        if($mail != false){
                            $request = "SELECT contient.id, contient.quantite, produits.nom, produits.quantite as 'quantite_total' ,
                            produits.prix,produits.image,produits.poids FROM `commandes` 
                            INNER JOIN contient ON contient.numero = commandes.numero 
                            INNER JOIN produits ON produits.id = contient.id 
                            WHERE commandes.mail = :mail AND commandes.id_type = 1;";
                            $smtp = $db->prepare($request);
                            $smtp->bindParam(':mail', $mail, PDO::PARAM_STR);
                            $smtp->execute();
                            $data = $smtp->fetchAll(PDO::FETCH_ASSOC);
                            echo json_encode($data);
                        }else{
                            header($_SERVER['SERVER_PROTOCOL'] . ' 401 Unauthorized');                       
                        }                   
                    }else{
                        header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
                    }
                }catch (PDOException $e) {
                    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error');
                }
                break;

            case 'addproduct':
                try{
                    if(isset($_POST['api_key']) && isset($_POST['auth_key']) && isset($_POST['id_product']) && isset($_POST['nb_product'])){
                        $api_key = $_POST['api_key'];
                        $auth_key = $_POST['auth_key'];
                        $id_product = $_POST['id_product'];
                        $nb_product = $_POST['nb_product'];
                        $mail = checkApiToken($db, $api_key, $auth_key);
                        if($mail != false){
                            $request = "SELECT co.numero, co.quantite FROM commandes c
                            JOIN contient co ON co.numero = c.numero
                            WHERE mail = '$mail' AND c.id_type = 1 AND co.id = $id_product";
                            $data = dbRequest($db, $request);
                            if ($data == null) {
                                $request = "SELECT numero FROM commandes WHERE mail = '$mail' AND id_type = 1";
                                $data = dbRequest($db, $request);
                                $num_com = $data[0]['numero'];
                                $request = "INSERT IGNORE INTO contient (id,numero,quantite) VALUES ($id_product,$num_com,$nb_product)";
                                $data = dbRequest($db, $request);
                                echo json_encode($data);
                            } else {
                                $num_com = $data[0]['numero'];
                                $data = $data[0]['quantite'];
                                $request = "UPDATE contient SET quantite = $nb_product WHERE numero = $num_com AND id = $id_product";
                                $data = dbRequest($db, $request);
                                echo json_encode($data);
                            }

                        }else{
                            header($_SERVER['SERVER_PROTOCOL'] . ' 401 Unauthorized');                       
                        }                   
                    }else{
                        header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
                    }
                }catch (PDOException $e) {
                    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error');
                }
                break;

            case 'account':
                try{
                    if(isset($_POST['api_key']) && isset($_POST['auth_key'])){
                        $api_key = $_POST['api_key'];
                        $auth_key = $_POST['auth_key'];
                        $mail = checkApiToken($db, $api_key, $auth_key);
                        if($mail != false){
                            $request = "SELECT commandes.date, commandes.numero, etat.type, commandes.id_type  FROM commandes
                            INNER JOIN etat ON etat.id_type = commandes.id_type
                            WHERE commandes.mail = :mail and commandes.id_type != 1 and commandes.id_type != 5
                            ORDER BY commandes.date DESC";
                            $smtp = $db->prepare($request);
                            $smtp->bindParam(':mail', $mail, PDO::PARAM_STR);
                            $smtp->execute();
                            $data = $smtp->fetchAll(PDO::FETCH_ASSOC);
                            echo json_encode($data);
                        }else{
                            header($_SERVER['SERVER_PROTOCOL'] . ' 401 Unauthorized');                       
                        }                   
                    }else{
                        header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
                    }
                }catch (PDOException $e) {
                    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error');
                }
                break;

            case 'deleteProduct' :
                try{
                    if(isset($_POST['api_key']) && isset($_POST['auth_key']) && isset($_POST['id_product'])){
                        $api_key = $_POST['api_key'];
                        $auth_key = $_POST['auth_key'];
                        $id_product = $_POST['id_product'];
                        $mail = checkApiToken($db, $api_key, $auth_key);
                        if($mail != false){
                            $request = "DELETE FROM contient WHERE id = :id_product AND numero = ( SELECT numero FROM commandes WHERE mail = :mail AND id_type = 1);";
                            $smtp = $db->prepare($request);
                            $smtp->bindParam(':id_product', $id_product, PDO::PARAM_STR);
                            $smtp->bindParam(':mail', $mail, PDO::PARAM_STR);
                            $smtp->execute();
                            $data = $smtp->fetchAll(PDO::FETCH_ASSOC);
                            echo json_encode("true");
                        }else{
                            header($_SERVER['SERVER_PROTOCOL'] . ' 401 Unauthorized');                       
                        }                   
                    }else{
                        header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
                    }
                }catch (PDOException $e) {
                    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error');
                }
                break;

            case 'updateProduct' :
                try{
                    if(isset($_POST['api_key']) && isset($_POST['auth_key']) && isset($_POST['id_product']) && isset($_POST['quantite'])){
                        $api_key = $_POST['api_key'];
                        $auth_key = $_POST['auth_key'];
                        $id_product = $_POST['id_product'];
                        $nb_product = $_POST['quantite'];
                        $mail = checkApiToken($db, $api_key, $auth_key);
                        if($mail != false){
                            $request = "UPDATE contient SET quantite = :nb_product WHERE id = :id_product AND numero = ( SELECT numero FROM commandes WHERE mail = :mail AND id_type = 1);";
                            $smtp = $db->prepare($request);
                            $smtp->bindParam(':id_product', $id_product, PDO::PARAM_STR);
                            $smtp->bindParam(':mail', $mail, PDO::PARAM_STR);
                            $smtp->bindParam(':nb_product', $nb_product, PDO::PARAM_STR);
                            $smtp->execute();
                            $data = $smtp->fetchAll(PDO::FETCH_ASSOC);
                            echo json_encode("true");
                        }else{
                            header($_SERVER['SERVER_PROTOCOL'] . ' 401 Unauthorized');                       
                        }                   
                    }else{
                        header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
                    }
                }catch (PDOException $e) {
                    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error');
                }
                break;
            
                
                case 'getInfoUser' :
                    try{
                        if(isset($_POST['api_key']) && isset($_POST['auth_key'])){
                            $api_key = $_POST['api_key'];
                            $auth_key = $_POST['auth_key'];
                            $mail = checkApiToken($db, $api_key, $auth_key);
                            if($mail != false){
                                $request = "SELECT * FROM users WHERE mail = :mail";
                                $smtp = $db->prepare($request);
                                $smtp->bindParam(':mail', $mail, PDO::PARAM_STR);
                                $smtp->execute();
                                $data = $smtp->fetchAll(PDO::FETCH_ASSOC);
                                echo json_encode($data);
                            }else{
                                header($_SERVER['SERVER_PROTOCOL'] . ' 401 Unauthorized');                       
                            }                   
                        }else{
                            header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
                        }
                    }catch (PDOException $e) {
                        header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error');
                    }
                    break;
                    
                    case 'changeInfoUser' :
                        try{
                            if(isset($_POST['api_key']) && isset($_POST['auth_key']) && isset($_POST['nom']) && isset($_POST['prenom']) && isset($_POST['adresse']) && isset($_POST['telephone']) && isset($_POST['age'])){
                                $api_key = $_POST['api_key'];
                    $auth_key = $_POST['auth_key'];
                    $nom = $_POST['nom'];
                    $prenom = $_POST['prenom'];
                    $adresse = $_POST['adresse'];
                    $telephone = $_POST['telephone'];
                    $age = $_POST['age'];
                    $mail = checkApiToken($db, $api_key, $auth_key);
                    if($mail != false){
                        $request = "UPDATE users SET nom = :nom, prenom = :prenom, adresse = :adresse, telephone = :telephone, age = :age WHERE mail = :mail";
                        $smtp = $db->prepare($request);
                        $smtp->bindParam(':mail', $mail, PDO::PARAM_STR);
                        $smtp->bindParam(':nom', $nom, PDO::PARAM_STR);
                        $smtp->bindParam(':prenom', $prenom, PDO::PARAM_STR);
                        $smtp->bindParam(':adresse', $adresse, PDO::PARAM_STR);
                        $smtp->bindParam(':telephone', $telephone, PDO::PARAM_STR);
                        $smtp->bindParam(':age', $age, PDO::PARAM_STR);
                        $smtp->execute();
                        $data = $smtp->fetchAll(PDO::FETCH_ASSOC);
                        echo json_encode("true");
                    }else{
                        header($_SERVER['SERVER_PROTOCOL'] . ' 401 Unauthorized');                       
                    }                   
                }else{
                    header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
                }
            }catch (PDOException $e) {
                header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error');
            }
            break;
            
            case 'simpleconnexion' : 
                //supprimer ca avant la prod + supprimer le react(allaccount, la redirection dans namewebsite, le fichier scss)
                try{
                    if(isset($_POST['mail'])){
                        $mail = $_POST['mail'];
                        if($mail != false){
                            $token = createApiToken($db, $mail);
                            //si une commande existe la mettre en annulé
                            $request = "SELECT numero FROM commandes WHERE mail = '$mail' AND id_type = 1";
                            $data = dbRequest($db, $request);
                            if ($data != NULL) {
                                $request = "UPDATE commandes SET id_type = 5 WHERE numero = " . $data[0]['numero'];
                                dbRequest($db, $request);
                            }
                            //creation d'une commande
                            $date = date("Y-m-d H:i:s");
                            $request = "INSERT INTO commandes (mail, id_type, date,numero) VALUES (:mail, 1, :date , NULL)";
                            $stmt = $db->prepare($request);
                            $stmt->bindParam(':mail', $mail, PDO::PARAM_STR);
                            $stmt->bindParam(':date', $date, PDO::PARAM_STR);
                            $stmt->execute();
                            // on renvoie le token et son id
                            echo json_encode(array('api_key' => $token['api_key'], 'auth_key' => $token['auth_key'], 'expires' => $token['expires']));
                        }else{
                            header($_SERVER['SERVER_PROTOCOL'] . ' 401 Unauthorized');                       
                        }                   
                    }else{
                        header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
                    }
                }catch (PDOException $e) {
                    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error');
                }
                break;
        }
     
    }
}




exit;
