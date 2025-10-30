declare module 'node-telegram-bot-api' {
  /**
   * Сообщение
   */
  export interface Message {
    chat: {
      id: number;
    };
  }

  /**
   * Telegram бот
   */
  export default class TelegramBot {
    constructor(token: string, options: { polling?: boolean } = {});

    on(event: 'message', listener: (msg: Message) => void): void;
    on(event: 'polling_error', listener: (err: Error) => void): void;

    sendMessage(chatId: number | string, text: string): Promise<unknown>;
    stopPolling(): Promise<void>;
  }
}
