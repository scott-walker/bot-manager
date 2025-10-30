import { Controller, Post, Delete, Body, Param } from '@nestjs/common';
import { BotManagerService } from '@bots/services/bot-manager.service';
import { BotConfig } from '@bots/entities/BotConfig';

/**
 * Контроллер для управления ботами
 */
@Controller('bots')
export class BotsController {
  constructor(private readonly botManager: BotManagerService) {}

  /**
   * Добавить бота
   * @param config - Конфигурация бота
   */
  @Post()
  addBot(@Body() config: BotConfig) {
    this.botManager.addBot(config);

    return { message: 'Бот добавлен успешно' };
  }

  /**
   * Удалить бота
   * @param token - Токен бота
   */
  @Delete(':token')
  async removeBot(@Param('token') token: string) {
    await this.botManager.removeBot(token);

    return { message: 'Бот удален успешно' };
  }
}
