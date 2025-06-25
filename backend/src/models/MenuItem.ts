import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum MenuItemType {
  PIZZA = "pizza",
  BEBIDA = "bebida",
  SOBREMESA = "sobremesa"
}

@Entity("menu_items")
export class MenuItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" }) // Corrigido para varchar para suportar SQLite
  type!: MenuItemType;
}
