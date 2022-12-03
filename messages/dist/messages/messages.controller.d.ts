import { createMessageDTO } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';
export declare class MessagesController {
    messagesService: MessagesService;
    constructor(messagesService: MessagesService);
    listMessages(): Promise<any>;
    createMessages(body: createMessageDTO): Promise<void>;
    getMessages(id: string): Promise<any>;
}
