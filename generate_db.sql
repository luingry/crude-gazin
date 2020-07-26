CREATE DATABASE developers_api;
USE developers_api;
CREATE TABLE `developers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `sexo` char(1) NOT NULL,
  `idade` int(3) NOT NULL,
  `hobby` varchar(100) NOT NULL,
  `datanascimento` date NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `developers` (`nome`, `sexo`, `idade`, `hobby`, `datanascimento`) 
VALUES 
('Rogerio dos Santos', 'M', '25', 'Aquarismo', '1994-08-10'),
('Gabriel dos Anjos', 'M', '28', 'Aquarismo', '1991-08-10'),
('Bruno souza', 'M', '25', 'Escritor', '1994-08-10'),
('Priscila dos reis', 'F', '21', 'Pintar', '1991-08-10'),
('Julia Magalhaes', 'F', '29', 'Croche', '1988-08-10'),
('Luingry Silva Carvalho', 'M', '25', 'Produção musical', '1994-08-10'),
('Geraldo Costa', 'M', '22', 'Natação', '1998-08-10') ;