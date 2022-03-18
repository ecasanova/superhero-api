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

@Entity("superhero", { schema: "public" })
export class SuperheroEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { name: "name", nullable: true })
  name: string | null;

  @OneToOne(
    () => AppearanceEntity,
    (AppearanceEntity) => AppearanceEntity.superhero,
    {
      cascade: true,
      onDelete: "CASCADE",
    }
  )
  appearance: AppearanceEntity;

  @OneToOne(
    () => BiographyEntity,
    (BiographyEntity) => BiographyEntity.superhero,
    {
      cascade: true,
      onDelete: "CASCADE",
    }
  )
  biography: BiographyEntity;

  @OneToOne(
    () => ConnectionsEntity,
    (ConnectionsEntity) => ConnectionsEntity.superhero,
    {
      cascade: true,
      onDelete: "CASCADE",
    }
  )
  connections: ConnectionsEntity;

  @OneToOne(() => ImageEntity, (ImageEntity) => ImageEntity.superhero, {
    cascade: true,
    onDelete: "CASCADE",
  })
  images: ImageEntity;

  @OneToOne(
    () => PowerstatsEntity,
    (PowerstatsEntity) => PowerstatsEntity.superhero,
    {
      cascade: true,
      onDelete: "CASCADE",
    }
  )
  powerstats: PowerstatsEntity;

  @OneToOne(() => WorkEntity, (WorkEntity) => WorkEntity.superhero, {
    cascade: true,
    onDelete: "CASCADE",
  })
  work: WorkEntity;
}
