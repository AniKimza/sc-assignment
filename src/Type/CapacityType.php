<?php

declare(strict_types=1);

namespace App\Type;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CapacityType extends ObjectType
{

  public function __construct()
  {
    parent::__construct([
      "name" => "Capacity",
      "fields" => [
        "id" => Type::string(),
        "value" => Type::string(),
        "displayValue" => Type::string()
      ]
    ]);
  }
}
