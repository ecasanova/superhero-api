import {
  Column,
  Entity,
  Index,
  OneToMany,
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

  @OneToMany(() => Appearance, (Appearance) => Appearance.superheroe)
  appearances: Appearance[];

  @OneToMany(() => Biography, (Biography) => Biography.superheroe)
  biographies: Biography[];

  @OneToMany(() => Connections, (Connections) => Connections.superheroe)
  connections: Connections[];

  @OneToMany(() => Image, (Image) => Image.superheroe)
  images: Image[];

  @OneToMany(() => Powerstats, (Powerstats) => Powerstats.superheroe)
  powerstats: Powerstats[];

  @OneToMany(() => Work, (Work) => Work.superheroe)
  works: Work[];
}
