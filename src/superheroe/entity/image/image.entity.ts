import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SuperheroeEntity } from "../superheroe/superheroe.entity";

@Entity("superheroe_image", { schema: "public" })
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

  @ManyToOne(() => SuperheroeEntity, (superheroe) => superheroe.images, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "superheroe_id", referencedColumnName: "id" }])
  superheroe: SuperheroeEntity;
}
