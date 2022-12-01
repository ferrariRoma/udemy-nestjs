interface IMessages {
    content: string;
}
export declare class MessagesController {
    listMessages(): void;
    createMessages(messages: IMessages): void;
    getMessages(messageId: string): void;
}
export {};
