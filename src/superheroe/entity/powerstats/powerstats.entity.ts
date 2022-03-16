import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SuperheroeEntity } from "../superheroe/superheroe.entity";

@Index("superheroe_powerstats_pkey", ["id"], { unique: true })
@Entity("superheroe_powerstats", { schema: "public" })
export class Powerstats {
  @PrimaryGeneratedColumn()
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("text", { name: "intelligence", nullable: true })
  intelligence: string | null;

  @Column("text", { name: "strength", nullable: true })
  strength: string | null;

  @Column("text", { name: "speed", nullable: true })
  speed: string | null;

  @Column("text", { name: "durability", nullable: true })
  durability: string | null;

  @Column("text", { name: "power", nullable: true })
  power: string | null;

  @Column("text", { name: "combat", nullable: true })
  combat: string | null;

  @ManyToOne(() => SuperheroeEntity, (superheroe) => superheroe.powerstats, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "superheroe_id", referencedColumnName: "id" }])
  superheroe: SuperheroeEntity;
}
