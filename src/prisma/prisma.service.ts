import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  logger = new Logger(PrismaService.name);

  async onModuleInit() {
    await this.$connect()
      .then(() => this.logger.log('Connected to the database'))
      .catch((error) => {
        console.log('🚀 ~ PrismaService ~ onModuleInit ~ error:', error);
        this.logger.error(`Error connecting to the database: ${error}`);
      });
  }
}
