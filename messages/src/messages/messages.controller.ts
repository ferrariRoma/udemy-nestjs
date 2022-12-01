import { Controller, Get, Post, Body, Param } from '@nestjs/common';

interface IMessages {
  content: string;
}

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {}

  @Post()
  createMessages(@Body() messages: IMessages) {
    console.log(messages);
  }

  @Get('/:id')
  getMessages(@Param('id') messageId: string) {
    console.log(messageId);
  }
}
