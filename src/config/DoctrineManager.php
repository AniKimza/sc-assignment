<?php

namespace App\Config;


require __DIR__ . '/../../vendor/autoload.php';

use Doctrine\DBAL\DriverManager;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMSetup;


class DoctrineManager
{
  private static $conn;
  private static $isDevMode;
  private static $config;
  private static $entityManager;

  public static function getEntityManager(): EntityManager
  {

    if (self::$entityManager) return self::$entityManager;

    self::$conn = DriverManager::getConnection([
      'driver' => 'pdo_mysql',
      'host'     => $_ENV['DB_HOST'],
      'user'     => $_ENV['DB_USER'],
      'password' => $_ENV['DB_PASS'],
      'dbname'   => $_ENV['DB_DATABASE'],
    ], self::$config);

    self::$isDevMode = true;

    self::$config = ORMSetup::createAttributeMetadataConfiguration(
      paths: [__DIR__ . "/../Entity/"],
      isDevMode: self::$isDevMode,
    );

    /* var_dump(self::$config->getEntityNamespaces()); */

    self::$entityManager = new EntityManager(self::$conn, self::$config);

    return self::$entityManager;
  }
}
