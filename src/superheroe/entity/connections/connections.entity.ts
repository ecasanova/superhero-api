import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SuperheroeEntity } from "../superheroe/superheroe.entity";

@Entity("superheroe_connections", { schema: "public" })
export class ConnectionsEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { name: "groupaffiliation", nullable: true })
  groupaffiliation: string | null;

  @Column("text", { name: "relatives", nullable: true })
  relatives: string | null;

  @ManyToOne(() => SuperheroeEntity, (superheroe) => superheroe.connections, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "superheroe_id", referencedColumnName: "id" }])
  superheroe: SuperheroeEntity;
}
