<?php

declare(strict_types=1);

namespace App\Type;

use App\Type\PictureType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderItemType extends ObjectType
{

  public function __construct()
  {
    parent::__construct([
      "name" => "OrderItem",
      "fields" => [
        "id" => Type::string(),
        "product" => TypeRegistry::type(ProductType::class),
        "color" => TypeRegistry::type(ColorType::class),
        "capacity" => TypeRegistry::type(CapacityType::class),
        "size" => TypeRegistry::type(SizeType::class),
        "quantity" => Type::int()
      ]
    ]);
  }
}
