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

@Entity("superhero_biography_aliases", { schema: "public" })
export class AliasesEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { name: "value", nullable: true })
  value: string | null;

  @ManyToOne(
    () => BiographyEntity,
    (BiographyEntity) => BiographyEntity.aliases,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "superhero_biography_id", referencedColumnName: "id" }])
  biography: BiographyEntity;
}
