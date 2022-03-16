import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Biography } from "../biography/biography.entity";

@Index("superheroe_biography_aliases_pkey", ["id"], { unique: true })
@Entity("superheroe_biography_aliases", { schema: "public" })
export class Aliases {
  @PrimaryGeneratedColumn()
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("text", { name: "value", nullable: true })
  value: string | null;

  @ManyToOne(() => Biography, (Biography) => Biography.Aliases)
  @JoinColumn([{ name: "superheroe_biography_id", referencedColumnName: "id" }])
  Biography: Biography;
}
