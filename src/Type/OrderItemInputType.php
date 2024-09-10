<?php

declare(strict_types=1);

namespace App\Type;

use App\Type\PictureType;
use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderItemInputType extends InputObjectType
{

  public function __construct()
  {
    parent::__construct([
      "name" => "OrderItemInput",
      "fields" => [
        "product" => Type::string(),
        "color" => Type::string(),
        "capacity" => Type::getNullableType(Type::string()),
        "size" => Type::getNullableType(Type::string()),
        "quantity" => Type::int()
      ]
    ]);
  }
}
