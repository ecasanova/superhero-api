import * as bcrypt from "bcrypt";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({
    unique: true,
  })
  readonly email: string;

  @Column({ select: false })
  @Column({ type: "varchar", length: 70, nullable: true })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compareSync(password, this.password);
  }

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
