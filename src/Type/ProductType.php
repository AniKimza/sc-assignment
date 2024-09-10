<?php

declare(strict_types=1);

namespace App\Type;

use App\Type\PictureType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ProductType extends ObjectType
{

  public function __construct()
  {
    parent::__construct([
      "name" => "Product",
      "fields" => [
        "id" => Type::string(),
        "name" => Type::string(),
        "inStock" => Type::boolean(),
        "description" => Type::string(),
        "category" => Type::string(),
        "gallery" => Type::listOf(TypeRegistry::type(PictureType::class)),
        "brand" => Type::string(),
        "capacities" => Type::listOf(TypeRegistry::type(CapacityType::class)),
        "colors" => Type::listOf(TypeRegistry::type(ColorType::class)),
        "sizes" => Type::listOf(TypeRegistry::type(SizeType::class)),
        "price" => Type::float(),
        "currency" => Type::string()
      ]
    ]);
  }
}
