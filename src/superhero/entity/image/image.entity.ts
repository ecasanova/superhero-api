import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SuperheroEntity } from "../superhero/superhero.entity";

@Entity("superhero_image", { schema: "public" })
export class ImageEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { name: "xs", nullable: true })
  xs: string | null;

  @Column("text", { name: "sm", nullable: true })
  sm: string | null;

  @Column("text", { name: "md", nullable: true })
  md: string | null;

  @Column("text", { name: "lg", nullable: true })
  lg: string | null;

  @ManyToOne(() => SuperheroEntity, (superhero) => superhero.images, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "superhero_id", referencedColumnName: "id" }])
  superhero: SuperheroEntity;
}
