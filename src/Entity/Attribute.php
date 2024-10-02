<?php

declare(strict_types=1);

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\DiscriminatorColumn;
use Doctrine\ORM\Mapping\DiscriminatorMap;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\InheritanceType;
use Doctrine\ORM\Mapping\JoinTable;
use Doctrine\ORM\Mapping\ManyToMany;
use Doctrine\ORM\Mapping\Table;

#[Entity]
#[Table("attribute")]
#[InheritanceType('SINGLE_TABLE')]
#[DiscriminatorColumn(name: 'discr', type: 'string')]
#[DiscriminatorMap(['color' => Color::class, 'size' => Size::class, 'capacity' => Capacity::class, "USB3" => USB3::class, "TouchID" => TouchID::class])]
class Attribute
{
  #[Id]
  #[Column(length: 255)]
  public string $id;
  #[Column]
  public string $value;
  #[Column(name: "display_value")]
  public string $displayValue;
  #[ManyToMany(targetEntity: Product::class, inversedBy: "attributes")]
  #[JoinTable(name: "product_attributes")]
  public Collection $products;
  public function __construct()
  {
    $this->products = new ArrayCollection();
  }
}
