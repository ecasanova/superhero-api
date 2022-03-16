import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AppearanceEntity } from "../appearance/appearance.entity";
import { BiographyEntity } from "../biography/biography.entity";
import { ConnectionsEntity } from "../connections/connections.entity";
import { ImageEntity } from "../image/image.entity";
import { PowerstatsEntity } from "../powerstats/powerstats.entity";
import { WorkEntity } from "../work/work.entity";

@Entity("superheroe", { schema: "public" })
export class SuperheroeEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { name: "name", nullable: true })
  name: string | null;

  @OneToOne(
    () => AppearanceEntity,
    (AppearanceEntity) => AppearanceEntity.superheroe,
    {
      cascade: true,
      onDelete: "CASCADE",
    }
  )
  appearance: AppearanceEntity;

  @OneToOne(
    () => BiographyEntity,
    (BiographyEntity) => BiographyEntity.superheroe,
    {
      cascade: true,
      onDelete: "CASCADE",
    }
  )
  biography: BiographyEntity;

  @OneToOne(
    () => ConnectionsEntity,
    (ConnectionsEntity) => ConnectionsEntity.superheroe,
    {
      cascade: true,
      onDelete: "CASCADE",
    }
  )
  connections: ConnectionsEntity;

  @OneToOne(() => ImageEntity, (ImageEntity) => ImageEntity.superheroe, {
    cascade: true,
    onDelete: "CASCADE",
  })
  images: ImageEntity;

  @OneToOne(
    () => PowerstatsEntity,
    (PowerstatsEntity) => PowerstatsEntity.superheroe,
    {
      cascade: true,
      onDelete: "CASCADE",
    }
  )
  powerstats: PowerstatsEntity;

  @OneToOne(() => WorkEntity, (WorkEntity) => WorkEntity.superheroe, {
    cascade: true,
    onDelete: "CASCADE",
  })
  work: WorkEntity;
}
