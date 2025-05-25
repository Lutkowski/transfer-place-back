import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FeedbackService } from '../../core/services/feedback.service';
import { CreateFeedbackDto } from '../../shared/dto/create-feedback.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

@Controller('contacts/feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  create(@Body() dto: CreateFeedbackDto) {
    return this.feedbackService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.feedbackService.getAll();
  }
}
