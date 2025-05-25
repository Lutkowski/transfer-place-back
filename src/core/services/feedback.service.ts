import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedbackEntity } from '../../infra/postgres/entities/feedback.entity';
import { CreateFeedbackDto } from '../../shared/dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(FeedbackEntity)
    private readonly feedbackRepository: Repository<FeedbackEntity>,
  ) {}

  async create(dto: CreateFeedbackDto) {
    const feedback = this.feedbackRepository.create(dto);
    return this.feedbackRepository.save(feedback);
  }

  async getAll() {
    return this.feedbackRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
