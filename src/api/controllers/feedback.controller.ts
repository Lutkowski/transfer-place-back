import { Body, Controller, Post } from '@nestjs/common';
import { FeedbackService } from '../../core/services/feedback.service';
import { CreateFeedbackDto } from '../../shared/dto/create-feedback.dto';

@Controller('contacts/feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  create(@Body() dto: CreateFeedbackDto) {
    return this.feedbackService.create(dto);
  }
}
