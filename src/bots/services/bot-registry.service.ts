import { Injectable } from '@nestjs/common';
import { Bot } from '@bots/lib/TelegramBot';

/**
 * Сервис для регистрации и управления ботами
 */
@Injectable()
export class BotRegistryService {
  /**
   * Хранилище ботов
   */
  private readonly bots = new Map<string, Bot>();

  /**
   * Зарегистрировать бота
   * @param bot - Бот
   */
  registerBot(bot: Bot): void {
    this.bots.set(bot.getBotId(), bot);
  }

  /**
   * Удалить бота
   * @param botId - ID бота
   */
  unregisterBot(botId: string): boolean {
    return this.bots.delete(botId);
  }

  /**
   * Получить бота по ID
   * @param botId - ID бота
   */
  getBot(botId: string): Bot | undefined {
    return this.bots.get(botId);
  }

  /**
   * Получить все боты
   */
  getAllBots(): Bot[] {
    return Array.from(this.bots.values());
  }

  /**
   * Получить количество ботов
   */
  getBotCount(): number {
    return this.bots.size;
  }
}
