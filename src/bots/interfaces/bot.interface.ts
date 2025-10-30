import { Message } from 'node-telegram-bot-api';

/**
 * Интерфейс Telegram бота
 */
export interface ITelegramBot {
  start(): void;
  stop(): void;
  getBotId(): string;
}

/**
 * Интерфейс обработчика сообщений Telegram бота
 */
export interface IBotMessageHandler {
  handleMessage(msg: Message): Promise<void>;
}

/**
 * Интерфейс сообщения Telegram бота
 */
export interface IBotMessage {
  chat: {
    id: number;
  };
}
