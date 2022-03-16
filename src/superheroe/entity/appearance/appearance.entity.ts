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
import { Height } from "./height.entity";
import { Weight } from "./weight.entity";

@Index("superheroe_appearance_pkey", ["id"], { unique: true })
@Entity("superheroe_appearance", { schema: "public" })
export class Appearance {
  @PrimaryGeneratedColumn()
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("text", { name: "gender", nullable: true })
  gender: string | null;

  @Column("text", { name: "race", nullable: true })
  race: string | null;

  @Column("text", { name: "eyecolor", nullable: true })
  eyecolor: string | null;

  @Column("text", { name: "haircolor", nullable: true })
  haircolor: string | null;

  @ManyToOne(() => SuperheroeEntity, (superheroe) => superheroe.appearances)
  @JoinColumn([{ name: "superheroe_id", referencedColumnName: "id" }])
  superheroe: SuperheroeEntity;

  @OneToMany(() => Height, (Height) => Height.Appearance)
  Heights: Height[];

  @OneToMany(() => Weight, (Weight) => Weight.Appearance)
  Weights: Weight[];
}
