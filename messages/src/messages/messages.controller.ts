import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { createMessageDTO } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {}

  @Post()
  createMessages(@Body() messages: createMessageDTO) {
    console.log(messages);
  }

  @Get('/:id')
  getMessages(@Param('id') messageId: string) {
    console.log(messageId);
  }
}
