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
import { SuperheroeEntity } from "../superheroe/superheroe.entity";
import { Height } from "./height.entity";
import { Weight } from "./weight.entity";

@Index("superheroe_appearance_pkey", ["id"], { unique: true })
@Entity("superheroe_appearance", { schema: "public" })
export class Appearance {
  @PrimaryGeneratedColumn()
  @Column("integer", { primary: true, name: "id", select: false })
  id: number;

  @Column("text", { name: "gender", nullable: true })
  gender: string | null;

  @Column("text", { name: "race", nullable: true })
  race: string | null;

  @Column("text", { name: "eyeColor", nullable: true })
  eyeColor: string | null;

  @Column("text", { name: "hairColor", nullable: true })
  hairColor: string | null;

  @ManyToOne(() => SuperheroeEntity, (superheroe) => superheroe.appearance, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "superheroe_id", referencedColumnName: "id" }])
  superheroe: SuperheroeEntity;

  @OneToMany(() => Height, (Height) => Height.appearance)
  height: Height[];

  @OneToMany(() => Weight, (Weight) => Weight.appearance)
  weight: Weight[];
}
