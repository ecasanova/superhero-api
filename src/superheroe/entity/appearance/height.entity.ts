import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Appearance } from "./appearance.entity";

@Index("superheroe_appearance_height_pkey", ["id"], { unique: true })
@Entity("superheroe_appearance_height", { schema: "public" })
export class Height {
  @PrimaryGeneratedColumn()
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("text", { name: "value", nullable: true })
  value: string | null;

  @ManyToOne(() => Appearance, (Appearance) => Appearance.Heights)
  @JoinColumn([
    { name: "superheroe_appearance_id", referencedColumnName: "id" },
  ])
  Appearance: Appearance;
}
