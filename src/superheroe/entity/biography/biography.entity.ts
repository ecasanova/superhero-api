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

@Index("superheroe_biography_pkey", ["id"], { unique: true })
@Entity("superheroe_biography", { schema: "public" })
export class Biography {
  @PrimaryGeneratedColumn()
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("text", { name: "fullname", nullable: true })
  fullname: string | null;

  @Column("text", { name: "alteregos", nullable: true })
  alteregos: string | null;

  @Column("text", { name: "placeoffbirth", nullable: true })
  placeoffbirth: string | null;

  @Column("timestamp without time zone", {
    name: "firstappearance",
    nullable: true,
  })
  firstappearance: Date | null;

  @Column("text", { name: "publisher", nullable: true })
  publisher: string | null;

  @Column("text", { name: "alignment", nullable: true })
  alignment: string | null;

  @Column("integer", { name: "superheroe_id", nullable: false })
  superheroe_id: number;

  @ManyToOne(() => SuperheroeEntity, (superheroe) => superheroe.biographies)
  @JoinColumn([{ name: "superheroe_id", referencedColumnName: "id" }])
  superheroe: SuperheroeEntity;

  @OneToMany(() => Aliases, (Aliases) => Aliases.Biography)
  Aliases: Aliases[];
}
