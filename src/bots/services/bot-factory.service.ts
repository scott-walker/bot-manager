import { Injectable } from '@nestjs/common';
import { BotConfig } from '@/bots/lib/BotConfig';
import { Bot } from '@bots/lib/TelegramBot';

/**
 * Сервис для создания ботов
 */
@Injectable()
export class BotFactoryService {
  /**
   * Создать бота
   * @param config - Конфигурация бота
   */
  createBot(config: BotConfig): Bot {
    return new Bot(config);
  }
}
