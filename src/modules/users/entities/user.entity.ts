import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Tuit } from 'src/modules/tuits/tuit.entity';
import { genSalt, hash } from 'bcryptjs';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, length: 30 })
  name: string;

  @Column({ nullable: false, unique: true, length: 60 })
  email: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  private tempPassword: string;

  @OneToMany((type) => Tuit, (tuit) => tuit.user)
  tuits: Tuit[];

  @Column({ nullable: false, default: 0 })
  followers: number;

  @Column({ nullable: false, default: 0 })
  following: number;

  @Column({ type: 'json', nullable: true })
  tokens: string[];

  @Column({ type: 'varchar', nullable: true })
  picture: string;

  @Column({ type: 'varchar', nullable: true })
  background: string;

  @Column({ type: 'varchar', nullable: true })
  location: string;

  @Column({ type: 'varchar', nullable: true })
  birthdate: Date;

  @Column({ type: 'varchar', nullable: true })
  bio: string;

  @Column({ type: 'varchar', nullable: true })
  website: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ type: 'timestamp', nullable: true })
  resetPasswordExpires: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  async hashPassword() {
    const salt = await genSalt(8);
    this.password = await hash(this.password, salt);
  }

  @BeforeUpdate()
  async hashPasswordOnUpdate() {
    if (this.tempPassword !== this.password) {
      const salt = await genSalt(8);
      this.password = await hash(this.password, salt);
    }
  }
}
