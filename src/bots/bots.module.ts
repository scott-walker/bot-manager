import { Module } from '@nestjs/common';
import { BotManagerService } from '@bots/services/bot-manager.service';
import { BotFactoryService } from '@bots/services/bot-factory.service';
import { BotRegistryService } from '@bots/services/bot-registry.service';
import { BotsController } from '@bots/bots.controller';

/**
 * Модуль для работы с ботами
 */
@Module({
  providers: [BotManagerService, BotFactoryService, BotRegistryService],
  controllers: [BotsController],
  exports: [BotManagerService]
})
export class BotsModule {}
