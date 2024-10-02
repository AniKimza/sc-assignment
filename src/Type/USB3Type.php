<?php

declare(strict_types=1);

namespace App\Type;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class USB3Type extends ObjectType
{

  public function __construct()
  {
    parent::__construct([
      "name" => "With USB 3 ports",
      "fields" => [
        "id" => Type::string(),
        "value" => Type::string(),
        "displayValue" => Type::string()
      ]
    ]);
  }
}
