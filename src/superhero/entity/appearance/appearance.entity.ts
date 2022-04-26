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
import { SuperheroEntity } from "../superhero/superhero.entity";
import { HeightEntity } from "./height.entity";
import { WeightEntity } from "./weight.entity";

@Entity("superhero_appearance", { schema: "public" })
export class AppearanceEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { name: "gender", nullable: true })
  gender: string | null;

  @Column("text", { name: "race", nullable: true })
  race: string | null;

  @Column("text", { name: "eyeColor", nullable: true })
  eyeColor: string | null;

  @Column("text", { name: "hairColor", nullable: true })
  hairColor: string | null;

  @ManyToOne(() => SuperheroEntity, (superhero) => superhero.appearance, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "superhero_id", referencedColumnName: "id" }])
  superhero: SuperheroEntity;

  @OneToMany(() => HeightEntity, (HeightEntity) => HeightEntity.appearance, {
    cascade: true,
    onDelete: "CASCADE",
  })
  height: any;

  @OneToMany(() => WeightEntity, (WeightEntity) => WeightEntity.appearance, {
    cascade: true,
    onDelete: "CASCADE",
  })
  weight: any;
}
