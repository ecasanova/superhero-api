import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AppearanceEntity } from "./appearance.entity";

@Entity("superheroe_appearance_weight", { schema: "public" })
export class WeightEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { name: "value", nullable: true })
  value: string | null;

  @ManyToOne(
    () => AppearanceEntity,
    (AppearanceEntity) => AppearanceEntity.weight,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([
    { name: "superheroe_appearance_id", referencedColumnName: "id" },
  ])
  appearance: AppearanceEntity;
}
