import TelegramBot from 'node-telegram-bot-api';
import { ITelegramBot, IBotMessage } from '@bots/interfaces/bot.interface';
import { BotConfig } from '@bots/lib/BotConfig';

/**
 * Бот
 */
export class Bot implements ITelegramBot {
  private bot: TelegramBot;
  private isRunning = false;

  /**
   * Инициализирует бота
   * @param config - Конфигурация бота
   */
  constructor(private readonly config: BotConfig) {
    if (!config.token) throw new Error('Token is required');

    this.bot = new TelegramBot(config.token, { polling: true });
  }

  /**
   * Запустить бота
   */
  start(): void {
    if (this.isRunning) return;

    this.setupHandlers();
    this.isRunning = true;
  }

  /**
   * Остановить бота
   */
  async stop(): Promise<void> {
    if (!this.isRunning) return;

    await this.bot.stopPolling();

    this.isRunning = false;
  }

  /**
   * Получить ID бота
   */
  getBotId(): string {
    return this.config.token;
  }

  /**
   * Настроить обработчики сообщений
   */
  private setupHandlers(): void {
    this.bot.on('message', async (msg: IBotMessage) => {
      await this.handleIncomingMessage(msg);
    });

    this.bot.on('polling_error', (error: Error) => {
      console.error('Bot error:', error);
    });
  }

  /**
   * Обработать входящее сообщение
   * @param msg - Сообщение
   */
  private async handleIncomingMessage(msg: IBotMessage): Promise<void> {
    try {
      const chatId = msg.chat.id;
      const responseText = this.generateResponse();

      await this.bot.sendMessage(chatId, responseText);
    } catch (error) {
      console.error('Error handling message:', error);
    }
  }

  /**
   * Сгенерировать ответ
   */
  private generateResponse(): string {
    const responses = ['Привет! Я получил сообщение!', 'Обрабатываю вашу просьбу...'];

    return responses[Math.floor(Math.random() * responses.length)];
  }
}
