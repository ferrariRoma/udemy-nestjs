import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { createMessageDTO } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Post()
  createMessages(@Body() body: createMessageDTO) {
    return this.messagesService.create(body.content);
  }

  @Get('/:id')
  getMessages(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }
}
