<?php

namespace App\Controller;

require_once(__DIR__ . "/../config/DoctrineManager.php");
require_once(__DIR__ . "/../../vendor/autoload.php");

use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use App\Config\DoctrineManager;
use App\Entity\Capacity;
use App\Entity\Color;
use App\Entity\Order;
use App\Entity\OrderItem;
use App\Entity\Product;
use App\Entity\Size;
use App\Type\OrderItemInputType;
use App\Type\OrderItemType;
use App\Type\OrderType;
use App\Type\ProductType;
use App\Type\TypeRegistry;
use RuntimeException;
use Throwable;


class GraphQL
{
  static public function handle()
  {
    try {
      $queryType = new ObjectType([
        'name' => 'Query',
        'fields' => [
          'products' => [
            "type" => Type::listOf(TypeRegistry::type(ProductType::class)),
            "args" => ["category" => Type::string()],
            "resolve" => static fn($calc, array $args) =>
            DoctrineManager::getEntityManager()
              ->createQueryBuilder()
              ->select("p")
              ->from(Product::class, "p")
              ->where("p.category LIKE :cat")
              ->setParameter("cat", $args["category"] ?? "%%")
              ->getQuery()
              ->getResult()
          ],
          "product" => [
            "type" => TypeRegistry::type(ProductType::class),
            "args" => ["id" => Type::string()],
            "resolve" => static fn($calc, array $args) =>
            DoctrineManager::getEntityManager()
              ->createQueryBuilder()
              ->select("p")
              ->from(Product::class, "p")
              ->where("p.id = :id")
              ->setParameter("id", $args["id"])
              ->getQuery()
              ->getResult()[0]
          ]
        ],
      ]);

      $mutationType = new ObjectType([
        'name' => 'Mutation',
        'fields' => [
          'createOrder' => [
            'type' => TypeRegistry::type(OrderType::class),
            'args' => [
              'items' =>  Type::listOf(TypeRegistry::type(OrderItemInputType::class)),
            ],
            'resolve' => static function ($calc, array $args) {
              $newOrder = new Order();
              foreach ($args["items"] as $oi) {
                $newOrderItem = new OrderItem();
                $newOrderItem->order = $newOrder;
                $newOrderItem->quantity = $oi["quantity"];
                $newOrderItem->product = DoctrineManager::getEntityManager()->find(Product::class, $oi["product"]);
                if (array_key_exists("capacity", $oi))
                  $newOrderItem->capacity = DoctrineManager::getEntityManager()->find(Capacity::class, $oi["capacity"]);
                if (array_key_exists("size", $oi))
                  $newOrderItem->size = DoctrineManager::getEntityManager()->find(Size::class, $oi["size"]);
                if (array_key_exists("color", $oi))
                  $newOrderItem->color = DoctrineManager::getEntityManager()->find(Color::class, $oi["color"]);
                $newOrder->items->add($newOrderItem);
                DoctrineManager::getEntityManager()->persist($newOrderItem);
                DoctrineManager::getEntityManager()->flush();
                DoctrineManager::getEntityManager()->clear();
              }
              DoctrineManager::getEntityManager()->persist($newOrder);
              DoctrineManager::getEntityManager()->clear();
            }
          ],
        ],
      ]);

      // See docs on schema options:
      // https://webonyx.github.io/graphql-php/schema-definition/#configuration-options
      $schema = new Schema(
        (new SchemaConfig())
          ->setQuery($queryType)
          ->setMutation($mutationType)
      );

      $rawInput = file_get_contents('php://input');
      if ($rawInput === false) {
        throw new RuntimeException('Failed to get php://input');
      }

      $input = json_decode($rawInput, true);
      $query = $input['query'];
      $variableValues = $input['variables'] ?? null;

      $rootValue = ['prefix' => 'You said: '];
      $result = GraphQLBase::executeQuery($schema, $query, $rootValue, null, $variableValues);
      $output = $result->toArray();
    } catch (Throwable $e) {
      $output = [
        'error' => [
          'message' => $e->getMessage(),
        ],
      ];
    }

    header('Content-Type: application/json; charset=UTF-8');
    return json_encode($output);
  }
}
