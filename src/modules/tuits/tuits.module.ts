import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tuit } from './tuit.entity';
import { User } from '../users/entities';
import { TuitsService } from './tuits.service';
import { TuitsController } from './tuits.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tuit, User])],
  providers: [TuitsService],
  controllers: [TuitsController],
})
export class TuitsModule {}
