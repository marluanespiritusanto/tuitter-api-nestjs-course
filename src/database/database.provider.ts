import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { join } from 'path';
import { writeFileSync } from 'fs';

import { Environment } from 'src/common/enum';

async function createOrmConfigFile(dbConfig: ConnectionOptions) {
  const path = join(__dirname, '../../');
  writeFileSync(path + 'ormconfig.json', JSON.stringify(dbConfig, null, 2));
}

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  async useFactory(config: ConfigService) {
    const isDevelopmentEnv = config.get('NODE_ENV') !== Environment.Production;

    const dbConfig = {
      type: 'postgres',
      host: config.get('DB_HOST'),
      port: +config.get('DB_PORT'),
      username: config.get('DB_USER'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_NAME'),
      autoLoadEntities: true,
      synchronize: isDevelopmentEnv,
      migrations: ['dist/database/migrations/*.js'],
      entities: ['dist/**/*.entity.js'],
      cli: {
        migrationsDir: 'src/database/migrations',
      },
      logging: 'all',
    } as ConnectionOptions;

    if (isDevelopmentEnv) {
      createOrmConfigFile(dbConfig);
    }

    return dbConfig;
  },
});
