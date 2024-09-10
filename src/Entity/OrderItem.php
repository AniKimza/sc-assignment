<?php

declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\Table;

#[Entity]
#[Table("order_items")]
class OrderItem
{
  #[Id]
  #[Column(length: 255), GeneratedValue]
  public string $id;
  #[ManyToOne(inversedBy: "items", cascade: ["persist"])]
  public Order $order;
  #[ManyToOne()]
  public Product $product;
  #[Column]
  public int $quantity;
  #[ManyToOne()]
  public Color $color;
  #[ManyToOne()]
  public Capacity $capacity;
  #[ManyToOne()]
  public Size $size;
}
