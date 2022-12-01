import { createMessageDTO } from './dtos/create-message.dto';
export declare class MessagesController {
    listMessages(): void;
    createMessages(messages: createMessageDTO): void;
    getMessages(messageId: string): void;
}
