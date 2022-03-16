import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SuperheroeEntity } from "../superheroe/superheroe.entity";

@Entity("superheroe_work", { schema: "public" })
export class WorkEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { name: "occupation", nullable: true })
  occupation: string | null;

  @Column("text", { name: "base", nullable: true })
  base: string | null;

  @ManyToOne(() => SuperheroeEntity, (superheroe) => superheroe.work, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "superheroe_id", referencedColumnName: "id" }])
  superheroe: SuperheroeEntity;
}
