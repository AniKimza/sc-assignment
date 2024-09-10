<?php

declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\GeneratedValue;

#[Entity]
#[Table("picture")]
class Picture
{
  #[Id]
  #[Column, GeneratedValue]
  public int $id;
  #[Column]
  public string $link;
  #[ManyToOne(inversedBy: "gallery", cascade: ["persist"])]
  public Product $product;
}
