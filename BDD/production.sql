#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: produit
#------------------------------------------------------------

CREATE TABLE produits(
        id          Int  Auto_increment  NOT NULL ,
        nom         Varchar (200) NOT NULL ,
        quantite    Int ,
        prix        Float ,
        image       Varchar (255) ,
        fournisseur Varchar (100) ,
        marque      Varchar (100) ,
        poids       Int ,
        taille      Int
	,CONSTRAINT produit_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: users
#------------------------------------------------------------

CREATE TABLE users(
        mail      Varchar (150) NOT NULL ,
        nom       Varchar (50) ,
        prenom    Varchar (50) ,
        pwd       Varchar (100) NOT NULL ,
        adresse   Varchar (255) ,
        age       Int ,
        telephone Varchar (50) NOT NULL
	,CONSTRAINT users_PK PRIMARY KEY (mail)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: etat
#------------------------------------------------------------

CREATE TABLE etat(
        id_type Int  Auto_increment  NOT NULL ,
        type    Varchar (150)
	,CONSTRAINT etat_PK PRIMARY KEY (id_type)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: commande
#------------------------------------------------------------

CREATE TABLE commandes(
        numero  Int  Auto_increment  NOT NULL ,
        date    Datetime ,
        mail    Varchar (150) NOT NULL ,
        id_type Int
	,CONSTRAINT commande_PK PRIMARY KEY (numero)

	,CONSTRAINT commande_users_FK FOREIGN KEY (mail) REFERENCES users(mail)
	,CONSTRAINT commande_etat0_FK FOREIGN KEY (id_type) REFERENCES etat(id_type)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: auth
#------------------------------------------------------------

CREATE TABLE auth(
        api_key Varchar (255) NOT NULL ,
        token   Varchar (255) NOT NULL ,
        expiry  Int NOT NULL ,
        mail    Varchar (150) NOT NULL
	,CONSTRAINT auth_PK PRIMARY KEY (api_key,token)

	,CONSTRAINT auth_users_FK FOREIGN KEY (mail) REFERENCES users(mail)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: contient
#------------------------------------------------------------

CREATE TABLE contient(
        id           Int NOT NULL ,
        numero       Int NOT NULL ,
        quantite     Int NOT NULL ,
        distribution Int
	,CONSTRAINT contient_PK PRIMARY KEY (id,numero)

	,CONSTRAINT contient_produit_FK FOREIGN KEY (id) REFERENCES produit(id)
	,CONSTRAINT contient_commande0_FK FOREIGN KEY (numero) REFERENCES commande(numero)
)ENGINE=InnoDB;

