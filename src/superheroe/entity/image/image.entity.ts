import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SuperheroeEntity } from "../superheroe/superheroe.entity";

@Index("superheroe_image_pkey", ["id"], { unique: true })
@Entity("superheroe_image", { schema: "public" })
export class Image {
  @PrimaryGeneratedColumn()
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("text", { name: "url", nullable: true })
  url: string | null;

  @ManyToOne(() => SuperheroeEntity, (superheroe) => superheroe.image)
  @JoinColumn([{ name: "superheroe_id", referencedColumnName: "id" }])
  superheroe: SuperheroeEntity;
}
