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
import { Aliases } from "../aliases/aliases.entity";
import { Exclude } from "class-transformer";

@Index("superheroe_biography_pkey", ["id"], { unique: true })
@Entity("superheroe_biography", { schema: "public" })
export class Biography {
  @PrimaryGeneratedColumn()
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("text", { name: "fullName", nullable: true })
  fullName: string | null;

  @Column("text", { name: "alterEgos", nullable: true })
  alterEgos: string | null;

  @Column("text", { name: "placeOffBirth", nullable: true })
  placeOffBirth: string | null;

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

  @OneToMany(() => Aliases, (Aliases) => Aliases.biography)
  aliases: Aliases[];
}
