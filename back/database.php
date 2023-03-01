<?php

require_once('constants.php');

//Connecter a la bdd
function dbConnect()
{
    try {
        //connection a la bdd grace a la PDO
        $db = new PDO(
            'mysql:host=' . DB_SERVER . ';dbname=' . DB_NAME . ';charset=utf8',
            DB_USER,
            DB_PASSWORD
        );
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        //au cas ou une erreur
    } catch (PDOException $exception) {
        error_log('Connection error: ' . $exception->getMessage());
        return false;
    }
    return $db;
}

//fonction de requete sur le fichier sans parametre
function dbRequest($db, $request)
{
    try {
        //requete sur la bdd
        $statement = $db->prepare($request);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        //au cas ou une erreur
    } catch (PDOException $exception) {
        error_log('Request error: ' . $exception->getMessage());
        return $exception->getMessage();
    }
    //retourne le resultat
    return $result;
}

//fonction pour ajouter un utilisateur
function addUser($db, $mail, $nom, $prenom, $pwd, $adresse, $age, $telephone)
{
    $pwd = password_hash($pwd, PASSWORD_DEFAULT); //hashage du mot de passe
    $request = "INSERT INTO users (mail, nom, prenom, pwd, adresse, age, telephone) VALUES (:mail, :nom, :prenom, :pwd, :adresse, :age, :telephone)";
    $stmt = $db->prepare($request);
    $stmt->bindParam(':mail', $mail, PDO::PARAM_STR);
    $stmt->bindParam(':prenom', $prenom, PDO::PARAM_STR);
    $stmt->bindParam(':nom', $nom, PDO::PARAM_STR);
    $stmt->bindParam(':adresse', $adresse, PDO::PARAM_STR);
    $stmt->bindParam(':age', $age, PDO::PARAM_STR);
    $stmt->bindParam(':telephone', $telephone, PDO::PARAM_STR);
    $stmt->bindParam(':pwd', $pwd, PDO::PARAM_STR);
    $stmt->execute();
}

//fonction pour verifier si l'utilisateur existe et si le mot de passe est correct
function checkPassword($db, $mail, $pwd)
{
    $request = "SELECT mail, pwd FROM users WHERE mail = :mail";
    $stmt = $db->prepare($request);
    $stmt->bindParam(':mail', $mail, PDO::PARAM_STR);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if(empty($data)){
        return false;
    }else if (password_verify($pwd, $data[0]['pwd'])) {
        return true;
    } else {
        return false;
    }
}

function createApiToken($db,$mail){
    //si il y a deja un token on le supprime
    $request = "DELETE FROM `auth` WHERE `mail` = :mail";
    $stmt = $db->prepare($request);
    $stmt->bindParam(':mail', $mail, PDO::PARAM_STR);
    $stmt->execute();

    //on regenere un nouveau token
    $api_key = bin2hex(random_bytes(32));
    $auth_key = bin2hex(random_bytes(32));

    $expiry_time = time() + (1 * 60 * 60); //1h

    $request = "INSERT INTO `auth` (`api_key`, `token`, `expiry`, `mail`) VALUES (:api_key, :auth_key, :expiry, :mail)";
    $stmt = $db->prepare($request);
    $stmt->bindParam(':api_key', $api_key, PDO::PARAM_STR);
    $stmt->bindParam(':expiry', $expiry_time, PDO::PARAM_INT);
    $stmt->bindParam(':auth_key', $auth_key, PDO::PARAM_STR);
    $stmt->bindParam(':mail', $mail, PDO::PARAM_STR);
    $stmt->execute();

    return array('api_key' => $api_key, 'auth_key' => hash('sha256', $api_key . $auth_key),'expires'=>$expiry_time);
}

//fontion de verification de l'api key et de l'auth key grace a la bdd et au token, ainsi que la date d'expiration et sha256
function checkApiToken($db, $api_key, $auth_key){
    $request = 'SELECT * from auth WHERE api_key = :api_key';
    $stmt = $db->prepare($request);
    $stmt->bindParam(':api_key', $api_key, PDO::PARAM_STR);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($data) || $api_key == '' || $auth_key == '') {
        return false;
    } else if (($data[0]['expiry'] > time()) && (hash('sha256', $api_key . $data[0]['token']) == $auth_key)) {
        return $data[0]['mail'];
    } else {
        return false;
    }
}
