import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SuperheroeEntity } from "../superheroe/superheroe.entity";

@Index("superheroe_work_pkey", ["id"], { unique: true })
@Entity("superheroe_work", { schema: "public" })
export class Work {
  @PrimaryGeneratedColumn()
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("text", { name: "occupation", nullable: true })
  occupation: string | null;

  @Column("text", { name: "base", nullable: true })
  base: string | null;

  @ManyToOne(() => SuperheroeEntity, (superheroe) => superheroe.works)
  @JoinColumn([{ name: "superheroe_id", referencedColumnName: "id" }])
  superheroe: SuperheroeEntity;
}
