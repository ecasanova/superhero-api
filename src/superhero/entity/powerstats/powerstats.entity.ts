import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SuperheroEntity } from "../superhero/superhero.entity";

@Entity("superhero_powerstats", { schema: "public" })
export class PowerstatsEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("number", { name: "intelligence", nullable: true })
  intelligence: number | null;

  @Column("number", { name: "strength", nullable: true })
  strength: number | null;

  @Column("number", { name: "speed", nullable: true })
  speed: number | null;

  @Column("number", { name: "durability", nullable: true })
  durability: number | null;

  @Column("number", { name: "power", nullable: true })
  power: number | null;

  @Column("number", { name: "combat", nullable: true })
  combat: number | null;

  @ManyToOne(() => SuperheroEntity, (superhero) => superhero.powerstats, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "superhero_id", referencedColumnName: "id" }])
  superhero: SuperheroEntity;
}
