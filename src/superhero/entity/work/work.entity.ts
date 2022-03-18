import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SuperheroEntity } from "../superhero/superhero.entity";

@Entity("superhero_work", { schema: "public" })
export class WorkEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { name: "occupation", nullable: true })
  occupation: string | null;

  @Column("text", { name: "base", nullable: true })
  base: string | null;

  @ManyToOne(() => SuperheroEntity, (superhero) => superhero.work, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "superhero_id", referencedColumnName: "id" }])
  superhero: SuperheroEntity;
}
