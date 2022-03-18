import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SuperheroEntity } from "../superhero/superhero.entity";

@Entity("superhero_connections", { schema: "public" })
export class ConnectionsEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { name: "groupaffiliation", nullable: true })
  groupaffiliation: string | null;

  @Column("text", { name: "relatives", nullable: true })
  relatives: string | null;

  @ManyToOne(() => SuperheroEntity, (superhero) => superhero.connections, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "superhero_id", referencedColumnName: "id" }])
  superhero: SuperheroEntity;
}
