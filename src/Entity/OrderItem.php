<?php

declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\Table;

#[Entity]
#[Table("order_items")]
class OrderItem
{
  #[Id]
  #[Column(length: 255)]
  public string $id;
  #[ManyToOne(inversedBy: "items", cascade: ["persist"])]
  public Order $order;
  #[ManyToOne(targetEntity: Product::class)]
  public Product $product;
  #[Column]
  public int $quantity;
  #[ManyToOne(targetEntity: Color::class)]
  public Color $color;
  #[ManyToOne(targetEntity: Capacity::class)]
  public Capacity $capacity;
  #[ManyToOne(targetEntity: Size::class)]
  public Size $size;
  #[ManyToOne(targetEntity: USB3::class)]
  public USB3 $usb3;
  #[ManyToOne(targetEntity: TouchID::class)]
  public TouchID $touchID;
}
