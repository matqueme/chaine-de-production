<?php

//pour recuperer le fichier constant.php
require_once('constants.php');

//Fonction pour se connecter a la bdd
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

//fonction de requete sur le fichier
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
        return false;
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