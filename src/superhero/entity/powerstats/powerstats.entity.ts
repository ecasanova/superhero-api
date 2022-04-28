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

  @Column("integer", { name: "intelligence", nullable: true })
  intelligence: number | null;

  @Column("integer", { name: "strength", nullable: true })
  strength: number | null;

  @Column("integer", { name: "speed", nullable: true })
  speed: number | null;

  @Column("integer", { name: "durability", nullable: true })
  durability: number | null;

  @Column("integer", { name: "power", nullable: true })
  power: number | null;

  @Column("integer", { name: "combat", nullable: true })
  combat: number | null;

  @ManyToOne(() => SuperheroEntity, (superhero) => superhero.powerstats, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "superhero_id", referencedColumnName: "id" }])
  superhero: SuperheroEntity;
}
