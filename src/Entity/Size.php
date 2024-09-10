<?php

declare(strict_types=1);

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Table;

#[Entity]
#[Table("size")]
class Size extends Attribute
{
  public function __construct()
  {
    $this->products = new ArrayCollection();
  }
}
