<?php

declare(strict_types=1);

namespace App\Type;

use App\Type\PictureType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderType extends ObjectType
{

  public function __construct()
  {
    parent::__construct([
      "name" => "Order",
      "fields" => [
        "id" => Type::string(),
        "items" => Type::listOf(TypeRegistry::type(OrderItemType::class)),
      ]
    ]);
  }
}
