import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/entities';

@Entity()
export class Tuit {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  message: string;

  @ManyToOne((type) => User, (user) => user.tuits, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
