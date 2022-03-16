import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SuperheroeEntity } from "../superheroe/superheroe.entity";

@Index("superheroe_connections_pkey", ["id"], { unique: true })
@Entity("superheroe_connections", { schema: "public" })
export class Connections {
  @PrimaryGeneratedColumn()
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("text", { name: "groupaffiliation", nullable: true })
  groupaffiliation: string | null;

  @Column("text", { name: "relatives", nullable: true })
  relatives: string | null;

  @ManyToOne(() => SuperheroeEntity, (superheroe) => superheroe.connections)
  @JoinColumn([{ name: "superheroe_id", referencedColumnName: "id" }])
  superheroe: SuperheroeEntity;
}
