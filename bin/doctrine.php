<?php

use App\Entity\Category;
use Doctrine\ORM\Tools\Console\ConsoleRunner;
use Doctrine\ORM\Tools\Console\EntityManagerProvider\SingleManagerProvider;
use Doctrine\DBAL\DriverManager;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMSetup;
use Dotenv\Dotenv;

require_once "vendor/autoload.php";

$dotenv = Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

$config = ORMSetup::createAttributeMetadataConfiguration(
  paths: [dirname(__DIR__) . "/src/Entity"],
  isDevMode: true,
);
// or if you prefer XML
// $config = ORMSetup::createXMLMetadataConfiguration(
//    paths: [__DIR__ . '/config/xml'],
//    isDevMode: true,
//);

// configuring the database connection
$connection = DriverManager::getConnection([
  'driver' => 'pdo_mysql',
  'host'     => $_ENV['DB_HOST'],
  'user'     => $_ENV['DB_USER'],
  'password' => $_ENV['DB_PASS'],
  'dbname'   => $_ENV['DB_DATABASE'],
], $config);

// obtaining the entity manager
$entityManager = new EntityManager($connection, $config);
ConsoleRunner::run(
  new SingleManagerProvider($entityManager),
);
