#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: produit
#------------------------------------------------------------

CREATE TABLE produit(
        id       Int  Auto_increment  NOT NULL ,
        nom      Varchar (200) NOT NULL ,
        quantite Int ,
        prix     Float
	,CONSTRAINT produit_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: users
#------------------------------------------------------------

CREATE TABLE users(
        mail    Varchar (150) NOT NULL ,
        nom     Varchar (50) ,
        prenom  Varchar (50) ,
        pwd     Varchar (100) NOT NULL ,
        adresse Varchar (255)
	,CONSTRAINT users_PK PRIMARY KEY (mail)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: etat
#------------------------------------------------------------

CREATE TABLE etat(
        type Varchar (150) NOT NULL
	,CONSTRAINT etat_PK PRIMARY KEY (type)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: commande
#------------------------------------------------------------

CREATE TABLE commande(
        numero Int  Auto_increment  NOT NULL ,
        date   Date ,
        mail   Varchar (150) NOT NULL ,
        type   Varchar (150)
	,CONSTRAINT commande_PK PRIMARY KEY (numero)

	,CONSTRAINT commande_users_FK FOREIGN KEY (mail) REFERENCES users(mail)
	,CONSTRAINT commande_etat0_FK FOREIGN KEY (type) REFERENCES etat(type)
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

