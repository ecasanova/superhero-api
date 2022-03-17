import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SuperheroeEntity } from "../superheroe/superheroe.entity";
import { AliasesEntity } from "../aliases/aliases.entity";

@Entity("superheroe_biography", { schema: "public" })
export class BiographyEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { name: "fullName", nullable: true })
  fullName: string | null;

  @Column("text", { name: "alterEgos", nullable: true })
  alterEgos: string | null;

  @Column("text", { name: "placeOfBirth", nullable: true })
  placeOfBirth: string | null;

  @Column("text", {
    name: "firstAppearance",
    nullable: true,
  })
  firstAppearance: string | null;

  @Column("text", { name: "publisher", nullable: true })
  publisher: string | null;

  @Column("text", { name: "alignment", nullable: true })
  alignment: string | null;

  @ManyToOne(() => SuperheroeEntity, (superheroe) => superheroe.biography, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "superheroe_id", referencedColumnName: "id" }])
  superheroe: SuperheroeEntity;

  @OneToMany(() => AliasesEntity, (AliasesEntity) => AliasesEntity.biography, {
    onDelete: "CASCADE",
    cascade: true,
  })
  aliases: AliasesEntity[];
}
