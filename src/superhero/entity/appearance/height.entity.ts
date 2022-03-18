import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AppearanceEntity } from "./appearance.entity";

@Entity("superhero_appearance_height", { schema: "public" })
export class HeightEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { name: "value", nullable: true })
  value: string | null;

  @ManyToOne(
    () => AppearanceEntity,
    (AppearanceEntity) => AppearanceEntity.height,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "superhero_appearance_id", referencedColumnName: "id" }])
  appearance: AppearanceEntity;
}
