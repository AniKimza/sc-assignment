<?php

declare(strict_types=1);

namespace App\Entity;

use App\Entity\OrderItem;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\OneToMany;
use Doctrine\ORM\Mapping\Table;

#[Entity]
#[Table("orders")]
class Order
{
  #[Id]
  #[Column(length: 255)]
  public string $id;
  #[OneToMany(targetEntity: OrderItem::class, mappedBy: "order", cascade: ["persist"])]
  public Collection $items;
  public function __construct()
  {
    $this->items = new ArrayCollection();
  }
}
