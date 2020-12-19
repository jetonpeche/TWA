create table nation
(
    idNation int not null AUTO_INCREMENT,
    libelNation   varchar(50),

    primary key(idNation)
);

create table commandant
(
    idCommandant int not null AUTO_INCREMENT,
    libelCommandant   varchar(50) not null,
    idNation int not null,

    primary key(idCommandant),

    constraint FK_commandant_nation foreign key (idNation) references nation(idNation)
);

create table joueur
(
    id      int not null AUTO_INCREMENT,
    speudo  varchar(50) not null,

    primary key(id)
);

create table unite
(
    idUnite int not null AUTO_INCREMENT,
    libelUnite varchar(100) not null,

    primary key(idUnite)
);

create table unite_nation
(
    idUnite int not null,
    idNation int not null,

    primary key(idUnite, idNation),

    constraint FK_uniteNation_unite foreign key (idUnite) references unite(idUnite),
    constraint FK_uniteNation_nation foreign key (idNation) references nation(idNation)
);


create table joueur_unite
(
    id  int not null,
    idUnite int not null,
    idCommandant int not null,

    niveauUnite varchar(2),
    unitePreferer char(3) default 'Non',

    primary key(id, idUnite, idCommandant),

    constraint FK_joueurUnite_joueur foreign key (id) references joueur(id),
    constraint FK_joueurUnite_unite foreign key (idUnite) references unite(idUnite),
    constraint FK_joueurUnite_cmdt foreign key (idCommandant) references commandant(idCommandant)
);


-- nation --
INSERT INTO nation (idNation, libelNation) values (1, 'Rôme'), (2, 'Barbare'), (3, 'Grec'), (4, 'Carthage'), (5, 'Chine');

-- UNITE --
INSERT INTO unite (idUnite, libelUnite) values (1, 'Bretteur lourd'), (2, 'Bretteur moyen'), (3, 'Bretteur'), (4, 'Falx'), (5, 'Glave'), (6, 'Piquier'), (7, 'Hoplite'), (8, 'Cavalerie'), (9, 'Arty lourd'), (10, 'Arty légère'), (11, 'Javelinier'), (12, 'Archer'), (13, 'Frondeur'), (14, 'Arbalète'), (15, 'Arbalete à répétition'), (16, 'Eléphant'), (17, 'Chien');

-- Unite par nation --
INSERT INTO unite_nation (idNation, idUnite) values (1, 1), (1, 2), (1, 8), (1, 9), (1, 10), (1, 11),
                                                    (2, 3), (2, 4), (2, 8), (2, 12), (2, 17),
                                                    (3, 6), (3, 7), (3, 8), (3, 12), (3, 13),
                                                    (4, 3), (4, 7), (4, 8), (4, 11), (4, 16),
                                                    (5, 3), (5, 5), (5, 6), (5, 8), (5, 14), (5, 15);

-- commandant --
INSERT INTO commandant (idCommandant, libelCommandant, idNation) values (1, 'Germanicus', 1), (2, 'Sulla', 1), (3, 'Céscar', 1), (4, 'Scipion', 1), (5, 'Arminus', 2), (6, 'Boudica', 2), (7, 'Vercingétorix', 2), (8, 'Ambiorix', 2), (9, 'Miltiades', 3), (10, 'Cynané', 3), (11, 'Léonidas', 3), (12, 'Alexandre le Grand', 3), (13, 'Hannibal', 4), (14, 'Hasdrubal', 4), (15, 'Cao Cao', 5), (16, 'Guan Yu', 5), (17, 'Lu Bu', 5), (18, 'Zhuge Liang', 5);