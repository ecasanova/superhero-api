import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Appearance } from "../appearance/appearance.entity";
import { Biography } from "../biography/biography.entity";
import { Connections } from "../connections/connections.entity";
import { Image } from "../image/image.entity";
import { Powerstats } from "../powerstats/powerstats.entity";
import { Work } from "../work/work.entity";

@Index("superheroe_pkey", ["id"], { unique: true })
@Entity("superheroe", { schema: "public" })
export class SuperheroeEntity {
  @PrimaryGeneratedColumn()
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("text", { name: "name", nullable: true })
  name: string | null;

  @OneToOne(() => Appearance, (Appearance) => Appearance.superheroe)
  appearance: Appearance;

  @OneToOne(() => Biography, (Biography) => Biography.superheroe)
  biography: Biography;

  @OneToOne(() => Connections, (Connections) => Connections.superheroe)
  connections: Connections;

  @OneToOne(() => Image, (Image) => Image.superheroe, { onDelete: "CASCADE" })
  image: Image;

  @OneToOne(() => Powerstats, (Powerstats) => Powerstats.superheroe)
  powerstats: Powerstats;

  @OneToOne(() => Work, (Work) => Work.superheroe, { onDelete: "CASCADE" })
  work: Work;
}
