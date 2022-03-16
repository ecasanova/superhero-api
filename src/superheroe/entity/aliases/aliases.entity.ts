import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BiographyEntity } from "../biography/biography.entity";

@Entity("superheroe_biography_aliases", { schema: "public" })
export class AliasesEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { name: "value", nullable: true })
  value: string | null;

  @OneToMany(
    () => BiographyEntity,
    (BiographyEntity) => BiographyEntity.aliases,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "superheroe_biography_id", referencedColumnName: "id" }])
  biography: BiographyEntity;
}
