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
