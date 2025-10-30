import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BotConfig } from '@bots/entities/BotConfig';
import { Bot } from '@bots/lib/TelegramBot';
import { BotFactoryService } from '@bots/services/bot-factory.service';
import { BotRegistryService } from '@bots/services/bot-registry.service';

/**
 * Сервис для управления ботами
 */
@Injectable()
export class BotManagerService implements OnModuleInit, OnModuleDestroy {
  /**
   * Конфигурация ботов
   */
  private botConfigs: BotConfig[] = [];

  constructor(
    private readonly botFactory: BotFactoryService,
    private readonly botRegistry: BotRegistryService,
    private readonly config: ConfigService
  ) {}

  /**
   * Инициализирует ботов
   */
  onModuleInit(): void {
    this.loadConfig();
    this.initializeBots();
  }

  /**
   * Загружает конфигурации ботов
   */
  private loadConfig(): void {
    const configs: BotConfig[] = [
      { name: 'Bot1', token: this.config.get<string>('BOT_TOKEN_1')! }
      // { name: 'Bot2', token: this.config.get<string>('BOT_TOKEN_2')! }
    ];

    configs.forEach(config => this.botConfigs.push(config));
  }

  /**
   * Останавливает все боты
   */
  async onModuleDestroy(): Promise<void> {
    await this.stopAllBots();
  }

  /**
   * Инициализирует ботов
   */
  private initializeBots(): void {
    for (const config of this.botConfigs) {
      try {
        const bot: Bot = this.botFactory.createBot(config);

        this.botRegistry.registerBot(bot);
        bot.start();

        console.log(`Бот ${config.name} запущен успешно`);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);

        console.error(`Ошибка запуска бота ${config.name}: ${message}`);
      }
    }
  }

  /**
   * Останавливает все боты
   */
  private async stopAllBots() {
    const bots = this.botRegistry.getAllBots();

    for (const bot of bots) {
      await bot.stop();
    }
  }

  /**
   * Добавляет бота
   * @param config - Конфигурация бота
   */
  addBot(config: BotConfig): void {
    const bot = this.botFactory.createBot(config);

    this.botRegistry.registerBot(bot);
    bot.start();
  }

  /**
   * Удаляет бота
   * @param botId - ID бота
   */
  async removeBot(botId: string): Promise<void> {
    const bot = this.botRegistry.getBot(botId);

    if (bot) {
      await bot.stop();

      this.botRegistry.unregisterBot(botId);
    }
  }
}
