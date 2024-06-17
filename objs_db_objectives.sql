-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: objs_db
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `objectives`
--

DROP TABLE IF EXISTS `objectives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `objectives` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `project` varchar(255) DEFAULT NULL,
  `Deadline` datetime NOT NULL,
  `visible` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Id_UNIQUE` (`id`),
  UNIQUE KEY `Name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objectives`
--

LOCK TABLES `objectives` WRITE;
/*!40000 ALTER TABLE `objectives` DISABLE KEYS */;
INSERT INTO `objectives` VALUES (1,'Presentar actividad 1, Des. Software','Esp. Ingeniería de software','2024-06-17 21:59:59',_binary ''),(2,'Leer Vol. I Comp. apuntes Clase IV','Aprendizajes meteorología','2024-07-15 21:59:59',_binary ''),(3,'Presentar actividad 1, Platf. Software','Esp. Ingeniería de software','2024-06-17 22:59:59',_binary ''),(4,'Repasar contenidos clases en vivo','Esp. Ingeniería de software','2024-06-18 21:59:59',_binary ''),(5,'Culminar códigos QC var. presión atmosférica','Contrato 196/24','2024-06-20 20:59:59',_binary ''),(6,'Alistar salidas para cargue datos p. atm.','Contrato 196/24','2024-06-21 20:59:59',_binary ''),(7,'Redactar doc. estaciones críticas p. atm.','Contrato 196/24','2024-06-28 20:59:59',_binary ''),(8,'Descargar datos humedad relativa','Contrato 196/24','2024-06-24 20:59:59',_binary ''),(9,'Correr cód. diagn. .datos hum. relativa','Contrato 196/24','2024-06-26 20:59:59',_binary ''),(10,'Alistar soportes mes de junio','Contrato 196/24','2024-06-27 20:59:59',_binary ''),(11,'Llamadas/correos crédito','Financiación','2024-06-21 20:59:59',_binary ''),(12,'Asistir Clase 5 Des. Software','Esp. Ingeniería de software','2024-06-18 23:59:00',_binary '');
/*!40000 ALTER TABLE `objectives` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-17  7:20:03
